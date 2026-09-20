/**
 * ROCK AUTOMATIONS — AUTH CRYPTO & FLOW VERIFICATION SUITE
 * Tests bcryptjs hashing, verification, edge cases, existing user logins, and token lifecycles.
 */

const { DatabaseSync } = require('node:sqlite');
const { SignJWT } = require('jose');
const bcrypt = require('bcryptjs');

const BASE_URL = 'http://localhost:3000';
const db = new DatabaseSync('data/platform.db');

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'ai-marketplace-production-secret-key-2026-secure-32chars!'
);

const results = [];

function recordTest(name, passed, details) {
  results.push({ name, passed, details });
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${icon}: ${name} — ${details}`);
}

async function runAuthVerification() {
  console.log('\n=== RUNNING TARGETED AUTH CRYPTO & FLOW VERIFICATION ===\n');

  const testEmail = `authtest_${Date.now()}@rockautomations.test`;
  const testPassword = 'StrongPassword2026!';
  let testUserId = null;

  try {
    // 1. REGISTER NEW USER AND VERIFY BCRYPT HASH IN DATABASE
    const regRes = await fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
        role: 'CLIENT',
        fullName: 'Auth Test User',
      }),
    });
    const regData = await regRes.json();
    testUserId = regData.data?.user?.id;

    const userRow = db.prepare('SELECT password_hash FROM users WHERE email = ?').get(testEmail);
    const isBcryptFormat = userRow && userRow.password_hash.startsWith('$2b$10$') && userRow.password_hash.length === 60;
    recordTest(
      'Registration & Bcrypt Storage',
      regRes.status === 200 && isBcryptFormat,
      `Status: ${regRes.status}, Hash prefix: ${userRow?.password_hash?.substring(0, 7)}, Length: ${userRow?.password_hash?.length}`
    );

    // 2. LOGIN WITH CORRECT PASSWORD
    const loginCorrect = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '192.168.10.1' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });
    const loginCorrectData = await loginCorrect.json();
    const setCookie = loginCorrect.headers.get('set-cookie') || '';
    const hasAuthCookie = setCookie.includes('auth_token=') && setCookie.includes('Max-Age=86400');
    recordTest(
      'Correct Password Authentication',
      loginCorrect.status === 200 && loginCorrectData.success === true && hasAuthCookie,
      `Status: ${loginCorrect.status}, Success: ${loginCorrectData.success}, MaxAge: 86400 cookie present`
    );

    // 3. LOGIN WITH INCORRECT PASSWORD
    const loginIncorrect = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '192.168.10.2' },
      body: JSON.stringify({ email: testEmail, password: 'WrongPassword999!' }),
    });
    const loginIncorrectData = await loginIncorrect.json();
    recordTest(
      'Incorrect Password Rejection',
      loginIncorrect.status === 401 && loginIncorrectData.error?.code === 'AUTH_FAILED',
      `Status: ${loginIncorrect.status}, Code: ${loginIncorrectData.error?.code}`
    );

    // 4. LOGIN WITH EMPTY PASSWORD
    const loginEmpty = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '192.168.10.3' },
      body: JSON.stringify({ email: testEmail, password: '' }),
    });
    const loginEmptyData = await loginEmpty.json();
    recordTest(
      'Empty Password Rejection',
      loginEmpty.status === 400 && loginEmptyData.error?.code === 'INVALID_CREDENTIALS',
      `Status: ${loginEmpty.status}, Code: ${loginEmptyData.error?.code}`
    );

    // 5. LOGIN WITH MALFORMED PAYLOAD (null password, object, non-string)
    const loginMalformed = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '192.168.10.4' },
      body: JSON.stringify({ email: testEmail }),
    });
    const loginMalformedData = await loginMalformed.json();
    recordTest(
      'Malformed Password Payload Rejection',
      loginMalformed.status === 400 && loginMalformedData.error?.code === 'INVALID_CREDENTIALS',
      `Status: ${loginMalformed.status}, Code: ${loginMalformedData.error?.code}`
    );

    // 6. SUSPENDED USER LOGIN REJECTION
    db.prepare("UPDATE users SET status = 'SUSPENDED' WHERE id = ?").run(testUserId);
    const loginSuspended = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cf-connecting-ip': '192.168.10.5' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });
    const loginSuspendedData = await loginSuspended.json();
    recordTest(
      'Suspended User Login Rejection',
      loginSuspended.status === 403 && loginSuspendedData.error?.code === 'ACCOUNT_SUSPENDED',
      `Status: ${loginSuspended.status}, Code: ${loginSuspendedData.error?.code}`
    );

    // 7. LOGOUT SESSION INVALIDATION
    const logoutRes = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
    });
    const logoutCookie = logoutRes.headers.get('set-cookie') || '';
    const cookieRevoked = logoutCookie.includes('auth_token=') && (logoutCookie.includes('Max-Age=0') || logoutCookie.toLowerCase().includes('expires='));
    recordTest(
      'Logout Cookie Invalidation',
      logoutRes.status === 200 && cookieRevoked,
      `Status: ${logoutRes.status}, Header: ${logoutCookie}`
    );

    // 8. EXPIRED TOKEN REJECTION
    const expiredToken = await new SignJWT({
      userId: testUserId,
      email: testEmail,
      role: 'CLIENT',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(Math.floor(Date.now() / 1000) - 3600)
      .setExpirationTime(Math.floor(Date.now() / 1000) - 10) // expired 10s ago
      .sign(JWT_SECRET);

    const expiredRes = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${expiredToken}` },
    });
    recordTest(
      'Expired Token Rejection',
      expiredRes.status === 401,
      `Status: ${expiredRes.status}`
    );

    // 9. INVALID / CORRUPTED TOKEN REJECTION
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.corrupted_payload.fake_signature';
    const invalidRes = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${invalidToken}` },
    });
    recordTest(
      'Invalid Token Rejection',
      invalidRes.status === 401,
      `Status: ${invalidRes.status}`
    );

    // 10. EXISTING SEEDED USER AUTHENTICATION COMPATIBILITY
    // Test admin account (seeded with AdminSecure123!)
    const existingAdminLogin = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.100' },
      body: JSON.stringify({ email: 'admin@platform.com', password: 'AdminSecure123!' }),
    });
    const existingAdminData = await existingAdminLogin.json();
    recordTest(
      'Existing Seeded Admin Authentication',
      existingAdminLogin.status === 200 && existingAdminData.data?.user?.email === 'admin@platform.com',
      `Status: ${existingAdminLogin.status}, Role: ${existingAdminData.data?.user?.role}`
    );

    // 11. TIMING-SAFE BCRYPT VERIFY FUNCTION DIRECT TEST
    const rawMatch = await bcrypt.compare(testPassword, userRow.password_hash);
    const rawMismatch = await bcrypt.compare('DifferentPassword!', userRow.password_hash);
    recordTest(
      'Direct bcrypt.compare Validation',
      rawMatch === true && rawMismatch === false,
      `rawMatch=${rawMatch}, rawMismatch=${rawMismatch}`
    );

  } finally {
    // CLEANUP TEST USER
    if (testUserId) {
      db.prepare('DELETE FROM client_profiles WHERE user_id = ?').run(testUserId);
      db.prepare('DELETE FROM audit_logs WHERE actor_id = ?').run(testUserId);
      db.prepare('DELETE FROM users WHERE id = ?').run(testUserId);
      console.log(`\nCleaned up test user: ${testUserId}`);
    }
  }

  const allPassed = results.every(r => r.passed);
  console.log(`\n==================================================`);
  console.log(`AUTH TEST RESULTS: ${results.filter(r => r.passed).length} PASSED, ${results.filter(r => !r.passed).length} FAILED (TOTAL: ${results.length})`);
  console.log(`OVERALL AUTH INTEGRITY: ${allPassed ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`==================================================\n`);

  process.exit(allPassed ? 0 : 1);
}

runAuthVerification().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

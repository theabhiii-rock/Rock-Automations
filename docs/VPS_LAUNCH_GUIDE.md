# 🚀 ROCK AUTOMATIONS — MASTER PRODUCTION LAUNCH GUIDE (VPS + DOMAIN)

> **Zero-Downtime, Ultra-Fast, Scalable Deployment for `rockautomations.com`**

---

## 1. Domain Name Selection: Sachchai Aur Sahi Faisla

### ❌ `automations.com` Kyon Nahi?
- `automations.com` ek generic single-word dictionary domain hai jo 1990s se registered hai.
- Aise domains corporate brokers ke paas hote hain aur inki qeemat **$100,000 se $1,000,000 USD (₹80 Lakh se ₹8 Crore+)** hoti hai.

### ✅ Best & Official Domain: `rockautomations.com` (Ya `rockautomations.in`)
- **Brand Match**: Aapki company ka official naam **ROCK AUTOMATIONS** hai.
- **Cost**: Sirf **₹699 - ₹899 / saal** (Hostinger, Namecheap, ya GoDaddy par).
- **India Focus Option**: Agar sirf Indian clients (Salons, Gyms, Clinics, Restaurants) target karne hain to `rockautomations.in` sirf **₹399 / saal** me mil jata hai.

---

## 2. Server (VPS) Selection: Hostinger ya DigitalOcean

Aapki website me **Next.js 16 (Node.js 22) + SQLite (`data/platform.db`)** use hota hai. Is architecture ke liye VPS sabse best hai kyonki:
- Local database file kabhi delete ya reset nahi hogi.
- India (Mumbai) datacenter select karne se website 0.2 second me khulegi.
- Cost: Sirf **₹350 - ₹450 / month**.

### Recommended VPS:
- **Hostinger KVM 1 VPS** (₹439/mo) — 1 vCPU, 4GB RAM, 50GB NVMe SSD, OS: **Ubuntu 24.04 64-bit**.
- **DigitalOcean $4–$6 Droplet** (Bangalore Datacenter, Ubuntu 24.04).

---

## 3. Step-by-Step Launch Process (Total Time: ~15 Minutes)

```
[Buy Domain] ──> [Buy VPS] ──> [Point DNS A-Record] ──> [Run 1-Click deploy.sh] ──> [Live on HTTPS!]
```

### STEP 1: Domain ke DNS Records Set Karein
Domain registrar (Hostinger / GoDaddy / Namecheap) ke DNS Management me jayein aur 2 **A Records** add karein:

| Type | Name / Host | Value / Points To | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `Aapka_VPS_Public_IP` (e.g. `142.93.xxx.xxx`) | Automatic / 300 |
| **A** | `www` | `Aapka_VPS_Public_IP` (e.g. `142.93.xxx.xxx`) | Automatic / 300 |

*(DNS propagate hone me 5 se 15 minute lagte hain).*

---

### STEP 2: VPS Terminal Me Login Karein
Apne computer (PowerShell / Command Prompt / Terminal) se VPS me connect karein:
```bash
ssh root@Aapka_VPS_Public_IP
```

---

### STEP 3: Code Ko VPS Par Copy / Clone Karein
VPS ke andar application directory banayein:
```bash
sudo mkdir -p /var/www/rock-automations
cd /var/www/rock-automations
```

Aap code ko **Git (GitHub)** ke zariye ya direct `scp` / zip se upload kar sakte hain:
```bash
# Agar GitHub repository private hai:
git clone https://github.com/YourUsername/rock-automations.git .
```

---

### STEP 4: Production `.env.local` File Banayein
VPS me project directory me `.env.local` banayein:
```bash
nano .env.local
```
Ye 5 lines paste karein (Ctrl+O then Enter to Save, Ctrl+X to Exit):
```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://rockautomations.com
JWT_SECRET=ai-marketplace-production-secret-key-2026-secure-32chars!
RAZORPAY_KEY_ID=rzp_live_AapkaRazorpayKeyId
RAZORPAY_KEY_SECRET=AapkaRazorpayKeySecret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_AapkaRazorpayKeyId
```

---

### STEP 5: 1-Click Automated Deployment Run Karein
Hamari banayi hui automated script ko execute karein:
```bash
chmod +x deploy.sh
bash deploy.sh rockautomations.com
```

**Ye script automatic kya-kya karegi:**
1. Ubuntu packages update karegi.
2. Node.js 22 LTS install karegi.
3. PM2 Process Manager install karegi.
4. Next.js production build generate karegi (`npm run build`).
5. PM2 ke sath app ko background daemon me start karegi (crash hone par auto-restart).
6. Nginx Reverse Proxy configure karegi (Port 80/443 se 3000 par route).
7. UFW Firewall secure karegi (SSH, HTTP, HTTPS allow).
8. Daily SQLite database automatic backup cron job schedule karegi (`/var/backups/rock-automations`).

---

### STEP 6: Free SSL Certificate (HTTPS 🔒) Activate Karein
Script complete hone ke baad sirf ye 1 command chalayein:
```bash
sudo certbot --nginx -d rockautomations.com -d www.rockautomations.com
```
- Aapka email address maangega.
- `Y` (Agree terms) press karein.
- Certbot automatic Let's Encrypt SSL certificate install kar dega jo **har 90 din me auto-renew** hota rahega!

---

## 4. Live Verification Checklist

Jab deployment ho jaye, to ye check karein:
- [ ] Browser me `https://rockautomations.com` open karein (Green Lock / Secure HTTPS dikhna chahiye).
- [ ] `https://rockautomations.com/professional/dashboard` par login karke real inbox aur ₹0 balance check karein.
- [ ] `https://rockautomations.com/admin` par login karke Admin tabs test karein.
- [ ] Public enquiry form bhar kar WhatsApp redirect button check karein.

---

## 5. Daily Maintenance Commands (Cheatsheet)

| Kaam | Command |
| :--- | :--- |
| Server status dekhna | `pm2 status` |
| Live logs dekhna | `pm2 logs rock-automations` |
| Website restart karna | `pm2 restart rock-automations` |
| Nginx status check | `sudo systemctl status nginx` |
| Database backup dekhna | `ls -la /var/backups/rock-automations` |

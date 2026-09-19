import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const settings = query<{ key: string; value: string }>('SELECT key, value FROM system_settings');
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }

    return NextResponse.json({
      success: true,
      data: {
        membership: {
          inr: parseFloat(map['membership_price_inr'] || '7000'),
          usd: parseFloat(map['membership_price_usd'] || '70'),
          durationDays: parseInt(map['membership_duration_days'] || '365', 10),
          termsVersion: map['terms_version'] || '2026.1',
        },
        platformFeePercent: parseFloat(map['platform_fee_percent'] || '20'),
        contactEmail: map['contact_email'] || 'contact@abhishekkumar.ai',
        platformName: map['platform_name'] || 'ABHISHEK KUMAR • AI & Digital Talent Platform',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

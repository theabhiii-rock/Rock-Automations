import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase().trim() || '';
    const category = searchParams.get('category') || '';
    const skill = searchParams.get('skill') || '';
    const country = searchParams.get('country') || '';
    const verifiedOnly = searchParams.get('verified') === 'true';
    const minBudget = parseFloat(searchParams.get('min_budget') || '0');
    const maxBudget = parseFloat(searchParams.get('max_budget') || '999999');
    const sort = searchParams.get('sort') || 'recommended'; // 'recommended' | 'newest' | 'rating' | 'rate_low' | 'rate_high'
    const excludeFeatured = searchParams.get('exclude_featured') === 'true';

    let sql = `
      SELECT p.*, 
        json_group_array(DISTINCT json_object('id', s.id, 'name', s.name, 'slug', s.slug)) as skills_json
      FROM professional_profiles p
      LEFT JOIN professional_skills ps ON p.id = ps.professional_id
      LEFT JOIN skills s ON ps.skill_id = s.id
      LEFT JOIN categories c ON s.category_id = c.id
      WHERE p.verification_status IN ('VERIFIED', 'PENDING', 'UNDER_REVIEW')
    `;

    const params: any[] = [];

    if (excludeFeatured) {
      sql += ` AND p.is_featured = 0`;
    }

    if (verifiedOnly) {
      sql += ` AND p.verification_status = 'VERIFIED'`;
    }

    if (country) {
      sql += ` AND LOWER(p.country) = LOWER(?)`;
      params.push(country);
    }

    if (minBudget > 0) {
      sql += ` AND p.hourly_rate >= ?`;
      params.push(minBudget);
    }

    if (maxBudget < 999999) {
      sql += ` AND p.hourly_rate <= ?`;
      params.push(maxBudget);
    }

    if (category) {
      sql += ` AND (c.slug = ? OR c.id = ?)`;
      params.push(category, category);
    }

    if (skill) {
      sql += ` AND (s.slug = ? OR LOWER(s.name) = LOWER(?))`;
      params.push(skill, skill);
    }

    if (q) {
      sql += ` AND (
        LOWER(p.full_name) LIKE ? OR 
        LOWER(p.title) LIKE ? OR 
        LOWER(p.bio) LIKE ? OR
        LOWER(s.name) LIKE ?
      )`;
      const pattern = `%${q}%`;
      params.push(pattern, pattern, pattern, pattern);
    }

    sql += ` GROUP BY p.id`;

    // Sorting
    if (sort === 'newest') {
      sql += ` ORDER BY p.created_at DESC`;
    } else if (sort === 'rating') {
      sql += ` ORDER BY p.rating_avg DESC, p.review_count DESC`;
    } else if (sort === 'rate_low') {
      sql += ` ORDER BY p.hourly_rate ASC`;
    } else if (sort === 'rate_high') {
      sql += ` ORDER BY p.hourly_rate DESC`;
    } else {
      // Recommended: featured first, then verified, then highest rating
      sql += ` ORDER BY p.is_featured DESC, (p.verification_status = 'VERIFIED') DESC, p.rating_avg DESC`;
    }

    const rows = query(sql, params);

    const professionals = rows.map((r: any) => {
      let skills = [];
      try {
        const parsed = JSON.parse(r.skills_json);
        skills = parsed.filter((item: any) => item && item.id);
      } catch (e) {
        skills = [];
      }
      return {
        ...r,
        is_featured: Boolean(r.is_featured),
        skills,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        total: professionals.length,
        professionals,
      },
    });
  } catch (error: any) {
    console.error('List professionals error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

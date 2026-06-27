-- ==========================================
-- Pathloom Database Schema (PostgreSQL)
-- ==========================================

-- Enable the UUID extension if not already enabled (Supabase enables this by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Domains
CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Roles
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
  description TEXT,
  avg_experience_years INTEGER,
  remote_availability TEXT,
  growth_outlook TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Role Skills (Many-to-Many)
CREATE TABLE role_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  importance INTEGER CHECK (importance BETWEEN 1 AND 10),
  UNIQUE(role_id, skill_id)
);

-- 5. Countries
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE,
  region TEXT,
  currency TEXT,
  currency_symbol TEXT,
  official_language TEXT,
  work_visa_difficulty TEXT,
  pr_difficulty TEXT,
  pr_timeline_years INTEGER,
  citizenship_timeline_years INTEGER,
  work_rights_for_students TEXT,
  post_study_work_visa TEXT,
  tech_hub_score INTEGER,
  quality_of_life_score INTEGER,
  safety_score INTEGER,
  healthcare_score INTEGER,
  english_friendliness TEXT,
  immigration_score INTEGER,
  opportunity_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Salary Data
CREATE TABLE salary_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  entry_level_min INTEGER,
  entry_level_max INTEGER,
  mid_level_min INTEGER,
  mid_level_max INTEGER,
  senior_level_min INTEGER,
  senior_level_max INTEGER,
  currency TEXT,
  local_entry_min TEXT,
  local_entry_max TEXT,
  local_mid_min TEXT,
  local_mid_max TEXT,
  local_senior_min TEXT,
  local_senior_max TEXT,
  source TEXT,
  last_updated TIMESTAMPTZ DEFAULT now(),
  UNIQUE(role_id, country_id)
);

-- 7. Cost of Living
CREATE TABLE cost_of_living (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  monthly_rent_1br_center INTEGER,
  monthly_rent_1br_outside INTEGER,
  monthly_food INTEGER,
  monthly_transport INTEGER,
  monthly_utilities INTEGER,
  monthly_internet INTEGER,
  monthly_total_estimate INTEGER,
  annual_total_estimate INTEGER,
  local_currency TEXT,
  source TEXT,
  last_updated TIMESTAMPTZ DEFAULT now(),
  UNIQUE(city, country_id)
);

-- 8. Universities
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  city TEXT,
  qs_rank INTEGER,
  the_rank INTEGER,
  type TEXT,
  founded_year INTEGER,
  website TEXT,
  annual_tuition_local TEXT,
  annual_tuition_usd INTEGER,
  annual_living_cost_usd INTEGER,
  acceptance_rate NUMERIC,
  student_population INTEGER,
  international_student_pct NUMERIC,
  employment_rate NUMERIC,
  average_graduate_salary TEXT,
  work_rights TEXT,
  intakes TEXT[],
  scholarship_availability TEXT,
  research_output_score INTEGER,
  campus_life_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. Programs
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  duration_years NUMERIC,
  language TEXT DEFAULT 'English',
  tuition_override_usd INTEGER,
  career_outcomes TEXT[],
  min_gpa_4 NUMERIC,
  min_gpa_10 NUMERIC,
  min_ielts NUMERIC,
  min_toefl INTEGER,
  min_gre INTEGER,
  min_gmat INTEGER,
  min_sat INTEGER,
  min_act INTEGER,
  jlpt_required TEXT,
  work_experience_years INTEGER,
  research_required BOOLEAN DEFAULT false,
  publications_required INTEGER DEFAULT 0,
  faculty_match_required BOOLEAN DEFAULT false,
  application_deadline TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. Scholarships
CREATE TABLE scholarships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  university_id UUID REFERENCES universities(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  coverage TEXT,
  amount_description TEXT,
  amount_usd_annual INTEGER,
  degree_levels TEXT[],
  min_gpa_10 NUMERIC,
  min_gpa_4 NUMERIC,
  min_ielts NUMERIC,
  min_toefl INTEGER,
  eligible_nationalities TEXT[],
  application_url TEXT,
  deadline TEXT,
  renewable BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 11. Visa Routes
CREATE TABLE visa_routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  to_country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  visa_type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  requirements TEXT[],
  processing_time TEXT,
  duration TEXT,
  path_to_pr BOOLEAN DEFAULT false,
  pr_timeline TEXT,
  cost_estimate TEXT,
  renewal_possible BOOLEAN DEFAULT true,
  work_rights TEXT,
  step_order INTEGER,
  next_step_visa_id UUID REFERENCES visa_routes(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. Market Trends
CREATE TABLE market_trends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  demand_score INTEGER,
  job_openings_estimate INTEGER,
  salary_growth_pct NUMERIC,
  trend_direction TEXT,
  ai_impact TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. Career Paths
CREATE TABLE career_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  to_role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  typical_years INTEGER,
  difficulty TEXT,
  required_skills TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. User Profiles (Linked to Supabase Auth)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  country_of_origin TEXT,
  current_job_title TEXT,
  target_role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  skills UUID[],
  degree_level TEXT,
  gpa_score NUMERIC,
  gpa_scale TEXT,
  exam_scores JSONB,
  target_country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  plan_type TEXT DEFAULT 'free',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Set up Row Level Security (RLS) for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile." ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile." ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- For all other tables, allow public read access for now (since this is public intelligence data)
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for domains" ON domains FOR SELECT USING (true);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for roles" ON roles FOR SELECT USING (true);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for skills" ON skills FOR SELECT USING (true);

ALTER TABLE role_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for role_skills" ON role_skills FOR SELECT USING (true);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for countries" ON countries FOR SELECT USING (true);

ALTER TABLE salary_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for salary_data" ON salary_data FOR SELECT USING (true);

ALTER TABLE cost_of_living ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for cost_of_living" ON cost_of_living FOR SELECT USING (true);

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for universities" ON universities FOR SELECT USING (true);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for programs" ON programs FOR SELECT USING (true);

ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for scholarships" ON scholarships FOR SELECT USING (true);

ALTER TABLE visa_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for visa_routes" ON visa_routes FOR SELECT USING (true);

ALTER TABLE market_trends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for market_trends" ON market_trends FOR SELECT USING (true);

ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access for career_paths" ON career_paths FOR SELECT USING (true);

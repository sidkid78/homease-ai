-- Sample data for HOMEase AI platform
-- This creates test users, contractors, and sample assessments

-- Insert sample homeowners
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type) VALUES
('john.smith@email.com', '$2b$10$example_hash_1', 'John', 'Smith', '555-0101', 'homeowner'),
('mary.johnson@email.com', '$2b$10$example_hash_2', 'Mary', 'Johnson', '555-0102', 'homeowner'),
('robert.davis@email.com', '$2b$10$example_hash_3', 'Robert', 'Davis', '555-0103', 'homeowner');

-- Insert sample contractors
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type) VALUES
('mike.builder@email.com', '$2b$10$example_hash_4', 'Mike', 'Builder', '555-0201', 'contractor'),
('sarah.renovator@email.com', '$2b$10$example_hash_5', 'Sarah', 'Renovator', '555-0202', 'contractor'),
('tom.accessibility@email.com', '$2b$10$example_hash_6', 'Tom', 'Accessibility', '555-0203', 'contractor');

-- Insert admin user
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type) VALUES
('admin@homeease.ai', '$2b$10$example_hash_admin', 'Admin', 'User', '555-0001', 'admin');

-- Insert homeowner profiles
INSERT INTO homeowner_profiles (user_id, address_line1, city, state, zip_code, home_type, home_age, mobility_needs, urgency_level)
SELECT 
    u.id,
    CASE 
        WHEN u.email = 'john.smith@email.com' THEN '123 Oak Street'
        WHEN u.email = 'mary.johnson@email.com' THEN '456 Pine Avenue'
        WHEN u.email = 'robert.davis@email.com' THEN '789 Maple Drive'
    END,
    CASE 
        WHEN u.email = 'john.smith@email.com' THEN 'Austin'
        WHEN u.email = 'mary.johnson@email.com' THEN 'Houston'
        WHEN u.email = 'robert.davis@email.com' THEN 'Dallas'
    END,
    'TX',
    CASE 
        WHEN u.email = 'john.smith@email.com' THEN '78701'
        WHEN u.email = 'mary.johnson@email.com' THEN '77001'
        WHEN u.email = 'robert.davis@email.com' THEN '75201'
    END,
    'single-family',
    CASE 
        WHEN u.email = 'john.smith@email.com' THEN 25
        WHEN u.email = 'mary.johnson@email.com' THEN 40
        WHEN u.email = 'robert.davis@email.com' THEN 15
    END,
    CASE 
        WHEN u.email = 'john.smith@email.com' THEN ARRAY['mobility_aid', 'balance_issues']
        WHEN u.email = 'mary.johnson@email.com' THEN ARRAY['wheelchair_access']
        WHEN u.email = 'robert.davis@email.com' THEN ARRAY['vision_impairment']
    END,
    CASE 
        WHEN u.email = 'john.smith@email.com' THEN 'medium'
        WHEN u.email = 'mary.johnson@email.com' THEN 'high'
        WHEN u.email = 'robert.davis@email.com' THEN 'low'
    END
FROM users u 
WHERE u.user_type = 'homeowner';

-- Insert contractor profiles
INSERT INTO contractor_profiles (user_id, business_name, license_number, insurance_verified, service_areas, specializations, years_experience, rating, total_reviews, bio)
SELECT 
    u.id,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN 'Mike''s Accessibility Solutions'
        WHEN u.email = 'sarah.renovator@email.com' THEN 'SafeHome Renovations'
        WHEN u.email = 'tom.accessibility@email.com' THEN 'Universal Design Pro'
    END,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN 'TX-LIC-12345'
        WHEN u.email = 'sarah.renovator@email.com' THEN 'TX-LIC-67890'
        WHEN u.email = 'tom.accessibility@email.com' THEN 'TX-LIC-54321'
    END,
    true,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN ARRAY['Austin', 'Round Rock', 'Cedar Park']
        WHEN u.email = 'sarah.renovator@email.com' THEN ARRAY['Houston', 'Sugar Land', 'Katy']
        WHEN u.email = 'tom.accessibility@email.com' THEN ARRAY['Dallas', 'Plano', 'Richardson']
    END,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN ARRAY['grab_bars', 'ramps', 'bathroom_modifications']
        WHEN u.email = 'sarah.renovator@email.com' THEN ARRAY['wheelchair_access', 'doorway_widening', 'flooring']
        WHEN u.email = 'tom.accessibility@email.com' THEN ARRAY['stair_lifts', 'lighting', 'universal_design']
    END,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN 12
        WHEN u.email = 'sarah.renovator@email.com' THEN 8
        WHEN u.email = 'tom.accessibility@email.com' THEN 15
    END,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN 4.8
        WHEN u.email = 'sarah.renovator@email.com' THEN 4.9
        WHEN u.email = 'tom.accessibility@email.com' THEN 4.7
    END,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN 47
        WHEN u.email = 'sarah.renovator@email.com' THEN 63
        WHEN u.email = 'tom.accessibility@email.com' THEN 38
    END,
    CASE 
        WHEN u.email = 'mike.builder@email.com' THEN 'Specializing in bathroom safety modifications and grab bar installations for over 12 years.'
        WHEN u.email = 'sarah.renovator@email.com' THEN 'Expert in wheelchair accessibility solutions and home modifications for independent living.'
        WHEN u.email = 'tom.accessibility@email.com' THEN 'Certified in universal design principles with extensive experience in aging-in-place modifications.'
    END
FROM users u 
WHERE u.user_type = 'contractor';

-- Insert sample assessments
INSERT INTO assessments (homeowner_id, assessment_data, room_scanned, hazards_detected, recommendations, estimated_budget_min, estimated_budget_max, urgency_score, ar_images)
SELECT 
    h.user_id,
    '{"measurements": {"width": 36, "height": 84, "depth": 60}, "obstacles": ["step", "narrow_doorway"], "lighting": "poor"}'::jsonb,
    'bathroom',
    ARRAY['step_hazard', 'narrow_doorway', 'no_grab_bars', 'slippery_surface'],
    ARRAY['Install grab bars near toilet and shower', 'Add non-slip flooring', 'Widen doorway to 32 inches', 'Improve lighting'],
    800,
    2500,
    7,
    ARRAY['/placeholder.svg?height=400&width=600']
FROM homeowner_profiles h
WHERE h.address_line1 = '123 Oak Street';

-- Insert sample leads
INSERT INTO leads (assessment_id, homeowner_id, lead_type, description, estimated_budget_min, estimated_budget_max, urgency_level, lead_score)
SELECT 
    a.id,
    a.homeowner_id,
    'bathroom_modification',
    'Bathroom safety modification needed: install grab bars, improve lighting, and add non-slip surfaces. Customer has mobility concerns and needs urgent safety improvements.',
    800,
    2500,
    'high',
    85
FROM assessments a
LIMIT 1;

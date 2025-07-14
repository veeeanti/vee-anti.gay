-- Update the projects table to include demo_url and ensure proper status values
ALTER TABLE projects ADD COLUMN IF NOT EXISTS demo_url VARCHAR(500);

-- Update status column to use proper enum values
ALTER TABLE projects ALTER COLUMN status TYPE VARCHAR(20);

-- Add check constraint for status values
ALTER TABLE projects ADD CONSTRAINT check_status 
CHECK (status IN ('active', 'beta', 'stable', 'archived'));

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (id, name, description) VALUES
('android', 'Android', 'Mobile applications and Android system modifications'),
('software', 'Software', 'Desktop applications and system utilities'),
('web', 'Web', 'Web applications and browser extensions')
ON CONFLICT (id) DO NOTHING;

-- Add foreign key constraint for project categories
ALTER TABLE projects ADD CONSTRAINT fk_project_category 
FOREIGN KEY (category) REFERENCES categories(id);

-- Update the recent activity view to show more accurate timestamps
DROP VIEW IF EXISTS recent_activity;

CREATE OR REPLACE VIEW recent_activity AS
SELECT 
    'blog' as type,
    id,
    title,
    'BLOG_POST_CREATED' as action,
    created_at as timestamp
FROM blog_posts 
WHERE published = true

UNION ALL

SELECT 
    category as type,
    id,
    title,
    CASE 
        WHEN created_at = updated_at THEN 'PROJECT_CREATED'
        ELSE 'PROJECT_UPDATED'
    END as action,
    GREATEST(created_at, updated_at) as timestamp
FROM projects

ORDER BY timestamp DESC
LIMIT 10;

-- Create a view that combines recent activity from both blog posts and projects
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
    CASE 
        WHEN category = 'android' THEN 'android'
        ELSE 'software'
    END as type,
    id,
    title,
    CASE 
        WHEN created_at = updated_at THEN 'PROJECT_CREATED'
        ELSE 'PROJECT_UPDATED'
    END as action,
    updated_at as timestamp
FROM projects

ORDER BY timestamp DESC
LIMIT 10;

-- Create a function to get recent activity as JSON
CREATE OR REPLACE FUNCTION get_recent_activity()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(
        json_build_object(
            'id', id::text,
            'type', type,
            'title', title,
            'action', action,
            'timestamp', timestamp
        )
    )
    INTO result
    FROM recent_activity;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

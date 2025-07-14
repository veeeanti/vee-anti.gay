-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, tags, published) VALUES
(
    'Why I Can''t Stop Tinkering with Android ROMs',
    'android-rom-addiction',
    'Another late night, another custom ROM flash. Here''s why I keep doing this to myself and my poor phone...',
    'The full content would go here with all the rambling about ROM flashing adventures...',
    ARRAY['Android', 'ROMs', 'Rambling'],
    true
),
(
    'Building My First Proper Android App (And Why It Took Forever)',
    'first-android-app-journey',
    'Spoiler alert: I rewrote it 4 times because I''m apparently a perfectionist now. Here''s the journey...',
    'The complete story of building an Android app, including all the mistakes and lessons learned...',
    ARRAY['Android', 'Development', 'Learning'],
    true
),
(
    'The Software I Actually Use Daily (2024 Edition)',
    'daily-software-2024',
    'My current setup, the tools I can''t live without, and some random software recommendations nobody asked for...',
    'A comprehensive list of software tools and why they''re essential to my workflow...',
    ARRAY['Software', 'Tools', 'Recommendations'],
    true
);

-- Insert sample projects
INSERT INTO projects (title, slug, description, category, tags, download_url, github_url, status) VALUES
(
    'Custom ROM Manager',
    'custom-rom-manager',
    'A simple tool to manage and flash custom ROMs. Because I got tired of doing it manually every time.',
    'android',
    ARRAY['Android', 'ROM', 'Tool'],
    'https://example.com/download/rom-manager',
    'https://github.com/username/rom-manager',
    'active'
),
(
    'System Tweaker Pro',
    'system-tweaker-pro',
    'Advanced system tweaking utility for rooted Android devices. Probably voids your warranty.',
    'android',
    ARRAY['Android', 'Root', 'System'],
    'https://example.com/download/system-tweaker',
    'https://github.com/username/system-tweaker',
    'beta'
),
(
    'File Organizer Script',
    'file-organizer-script',
    'Python script that organizes my chaotic downloads folder. Saves me hours of manual sorting.',
    'software',
    ARRAY['Python', 'Automation', 'Utility'],
    'https://example.com/download/file-organizer',
    'https://github.com/username/file-organizer',
    'active'
),
(
    'Config Backup Tool',
    'config-backup-tool',
    'Backs up all my important config files across different systems. Because I learned the hard way.',
    'software',
    ARRAY['Backup', 'Config', 'Cross-platform'],
    'https://example.com/download/config-backup',
    'https://github.com/username/config-backup',
    'active'
);

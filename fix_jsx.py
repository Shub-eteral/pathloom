#!/usr/bin/env python3
import re

file_path = r'C:\Users\caref\OneDrive\Documents\Pathloom\frontend\src\App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Original length: {len(content)}")

# Fix closing tags missing > at the end of lines
content = re.sub(r'(</(div|span|p|button|label|section|main|td|tr|thead|table|option|select|input|h[1-6]))\s*$', r'\1>', content, flags=re.MULTILINE)

# Remove stray </> tags and their surrounding whitespace
content = re.sub(r'\s+</>\s+', '\n', content)
content = re.sub(r'</>\s*', '', content)

print(f"Fixed length: {len(content)}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed JSX closing tags successfully')

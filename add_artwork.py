import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
IMAGES_DIR = SCRIPT_DIR / 'images'
HTML_FILE = SCRIPT_DIR / 'index.html'
JS_FILE = SCRIPT_DIR / 'script.js'

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'}

def get_existing_images():
    """Get list of images already in gallery"""
    if not JS_FILE.exists():
        return set()

    with open(JS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    images = set(re.findall(r"image:\s*['\"]images/([^'\"]+)['\"]", content))
    return images

def get_new_images():
    """Get list of images not yet in gallery"""
    if not IMAGES_DIR.exists():
        print(f" Images directory not found at {IMAGES_DIR}")
        return []

    existing = get_existing_images()

    all_images = []
    for file in sorted(IMAGES_DIR.iterdir()):
        if file.suffix.lower() in IMAGE_EXTENSIONS:
            filename = file.name
            if filename not in existing:
                all_images.append(filename)

    return all_images

def get_artwork_info(image_name):
    """Prompt user for artwork title and description"""
    print(f"\n Processing: {image_name}")
    print("-" * 50)

    title = input("Enter artwork title: ").strip()
    if not title:
        print("  Skipped (no title provided)")
        return None

    description = input("Enter artwork description: ").strip()
    if not description:
        print("  Skipped (no description provided)")
        return None

    return {
        'image': f'images/{image_name}',
        'title': title,
        'description': description
    }

def update_js_file(artworks):
    """Update script.js with new gallery items"""
    with open(JS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r"(const galleryItems = \[[\s\S]*?\n\]);"
    match = re.search(pattern, content)

    if not match:
        print(" Could not find galleryItems array in script.js")
        return False

    original_array = match.group(1)
    array_without_closing = original_array.rsplit('\n]', 1)[0]

    new_items = ""
    for artwork in artworks:

        title = artwork['title'].replace("'", "\\'").replace('"', '\\"')
        desc = artwork['description'].replace("'", "\\'").replace('"', '\\"')

        new_items += f"""    {{
        image: '{artwork['image']}',
        title: '{title}',
        description: '{desc}'
    }},
"""

    new_array = array_without_closing + ",\n" + new_items + "]\n];"

    new_content = content.replace(original_array, new_array)

    with open(JS_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f" Updated script.js with {len(artworks)} new item(s)")
    return True

def update_html_file(artworks):
    """Update index.html with new gallery items"""
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    last_item_match = re.finditer(r'onclick="openModal\((\d+)\)"', content)
    current_count = max([int(m.group(1)) for m in last_item_match], default=-1)

    new_html = ""
    for i, artwork in enumerate(artworks):
        index = current_count + 1 + i

        new_html += f"""
                <div class="gallery-item" data-category="illustration">
                    <img src="{artwork['image']}" alt="{artwork['title']}" class="gallery-image">
                    <div class="gallery-overlay">
                        <h3>{artwork['title']}</h3>
                        <p>{artwork['description']}</p>
                        <button class="view-btn" onclick="openModal({index})">View More</button>
                    </div>
                </div>
"""

    pattern = r'(<div class="gallery-item"[^>]*>[\s\S]*?<\/div>\s*</div>)'
    matches = list(re.finditer(pattern, content))

    if matches:
        last_item = matches[-1]
        insert_pos = last_item.end()
        new_content = content[:insert_pos] + new_html + content[insert_pos:]
    else:
        print(" Could not find gallery items in index.html")
        return False

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f" Updated index.html with {len(artworks)} new item(s)")
    return True

def main():
    """Main function"""
    print("\n" + "=" * 50)
    print(" Portfolio Artwork Manager")
    print("=" * 50)

    if not JS_FILE.exists() or not HTML_FILE.exists():
        print(" Error: script.js or index.html not found")
        print(f"   Expected: {JS_FILE}")
        print(f"   Expected: {HTML_FILE}")
        return

    new_images = get_new_images()

    if not new_images:
        print("\n No new images found!")
        print(f"   Checked: {IMAGES_DIR}")
        return

    print(f"\n Found {len(new_images)} new image(s):")
    for img in new_images:
        print(f"   - {img}")

    artworks = []
    for image_name in new_images:
        info = get_artwork_info(image_name)
        if info:
            artworks.append(info)

    if not artworks:
        print("\n  No artwork information provided")
        return

    print(f"\n Adding {len(artworks)} artwork(s)...")

    update_js_file(artworks)
    update_html_file(artworks)

    print("\n" + "=" * 50)
    print(" Portfolio updated successfully!")
    print("=" * 50)
    print("\n Next steps:")
    print("   1. Refresh your browser to see the new artwork")
    print("   2. Commit changes: git add .")
    print("   3. Push to GitHub: git push")
    print("=" * 50 + "\n")

if __name__ == '__main__':
    main()

import json
import os
import glob

# Read the data
with open('/home/ubuntu/tenyo-wishlist/client/public/data.json', 'r') as f:
    tricks = json.load(f)

# Get all available images
images_dir = '/home/ubuntu/tenyo-wishlist/client/public/images/'
available_images = os.listdir(images_dir)

# Create a mapping from product code to image filename
image_map = {}
for img in available_images:
    if img.startswith('T-'):
        # Extract product code from filename like "T-102_Lucifer's_Lock.jpg"
        code = img.split('_')[0]
        if code not in image_map:
            image_map[code] = img

print("Available images:", image_map)

# Update each trick with the correct image filename
for trick in tricks:
    code = trick['product_code']
    if code in image_map:
        trick['image_filename'] = image_map[code]
        print(f"Updated {code} -> {image_map[code]}")
    else:
        print(f"No image found for {code}")

# Save the updated data
with open('/home/ubuntu/tenyo-wishlist/client/public/data.json', 'w') as f:
    json.dump(tricks, f, indent=2)

print("Done!")

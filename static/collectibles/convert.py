import os
from PIL import Image

def convert_and_scale_png_to_webp(input_path, output_path):
    try:
        # Open the image file
        with Image.open(input_path) as img:
            # Calculate the new dimensions
            width, height = img.size
            new_width = width // 10
            new_height = height // 10
            
            # Resize the image using LANCZOS filter
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save the resized image as webp
            resized_img.save(output_path, 'WEBP')
            print(f"Converted and scaled: {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.png'):
                input_path = os.path.join(root, file)
                output_path = os.path.join(root, os.path.splitext(file)[0] + '_small.webp')
                convert_and_scale_png_to_webp(input_path, output_path)

if __name__ == "__main__":
    # Process the current directory and its child directories
    process_directory('.')
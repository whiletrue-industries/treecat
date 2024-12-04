from PIL import Image, ImageFilter
import sys
import os

def crop_image_to_contents(png_path):
    # Load the image
    with Image.open(png_path) as img:
        # Ensure it's in RGBA format (with alpha channel)
        img = img.convert("RGBA")
        
        # Extract the alpha channel
        alpha = img.getchannel("A")

        # Get the bounding box of non-transparent regions
        bbox = alpha.getbbox()

        # If there is no non-transparent area, return
        if bbox is None:
            print("No non-transparent content found in the image.")
            return

        # Crop the image to the bounding box
        cropped_img = img.crop(bbox)

        # Resize the image to ensure the height is 512 pixels, maintaining aspect ratio
        new_height = 256
        aspect_ratio = cropped_img.width / cropped_img.height
        new_width = int(aspect_ratio * new_height)
        resized_img = cropped_img.resize((new_width, new_height), Image.LANCZOS)

        # Apply a sharpening filter to enhance line drawing
        sharpened_img = resized_img.filter(ImageFilter.SHARPEN)

        # Save the sharpened image back to the same file
        new_path = f"{os.path.splitext(png_path)[0]}-{new_height}.png"
        sharpened_img.save(new_path, quality=80, optimize=True)
        print(f"Cropped, resized, and sharpened image saved to: {new_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python crop_image.py <path_to_png>")
    else:
        png_path = sys.argv[1]
        crop_image_to_contents(png_path)

import cv2
import sys

img = cv2.imread('DavidDavid_edited.png')
if img is None:
    print("Could not load image.")
    sys.exit(1)

# Rotate 180 degrees
rotated = cv2.rotate(img, cv2.ROTATE_180)
cv2.imwrite('DavidDavid_edited.png', rotated)
print("Successfully rotated DavidDavid_edited.png by 180 degrees.")

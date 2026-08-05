import cv2
import numpy as np
import sys

img = cv2.imread('OcampoGarages.png')
if img is None:
    print("Could not load image.")
    sys.exit(1)

h, w = img.shape[:2]

offset = int(w * 0.035)

pts1 = np.float32([
    [0, 0], 
    [w, 0], 
    [offset, h], 
    [w - offset, h]
])

pts2 = np.float32([
    [0, 0], 
    [w, 0], 
    [0, h], 
    [w, h]
])

M = cv2.getPerspectiveTransform(pts1, pts2)
warped = cv2.warpPerspective(img, M, (w, h))

cv2.imwrite('OcampoGarages_Squared.png', warped)
print("Successfully generated OcampoGarages_Squared.png")

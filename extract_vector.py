import cv2
import numpy as np
import sys
import os

def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
        
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))
    return warped

def contours_to_svg(contours, width, height, output_filename):
    with open(output_filename, 'w') as f:
        f.write(f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">\n')
        f.write('  <g fill="white" stroke="black" stroke-width="1" fill-rule="evenodd">\n')
        
        for contour in contours:
            if len(contour) < 3:
                continue
            path_data = []
            for i, point in enumerate(contour):
                x, y = point[0]
                command = "M" if i == 0 else "L"
                path_data.append(f"{command} {x} {y}")
            path_data.append("Z")
            f.write(f'    <path d="{" ".join(path_data)}" />\n')
            
        f.write('  </g>\n')
        f.write('</svg>\n')

def main():
    if len(sys.argv) < 2:
        print("Usage: python extract_vector.py <path_to_image>")
        return

    image_path = sys.argv[1]
    if not os.path.exists(image_path):
        print(f"Error: Could not find image at {image_path}")
        return

    image = cv2.imread(image_path)
    if image is None:
        print("Error: Could not load image.")
        return

    print("Image loaded successfully.")
    
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lower_blue = np.array([90, 50, 50])
    upper_blue = np.array([140, 255, 255])
    
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    warped = image
    if contours:
        largest_contour = max(contours, key=cv2.contourArea)
        epsilon = 0.05 * cv2.arcLength(largest_contour, True)
        approx = cv2.approxPolyDP(largest_contour, epsilon, True)
        
        if len(approx) == 4:
            print("Found 4 corners. Straightening image...")
            pts = approx.reshape(4, 2)
            warped = four_point_transform(image, pts)
        else:
            print(f"Could not find exactly 4 corners (found {len(approx)}). Using original image...")
    else:
        print("Could not find blue sign. Using original image...")

    cv2.imwrite("stomatol_flattened.jpg", warped)
    
    gray = cv2.cvtColor(warped, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
    
    letter_contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    filtered_contours = []
    h, w = thresh.shape
    min_area = (h * w) * 0.001
    max_area = (h * w) * 0.5
    
    for cnt in letter_contours:
        area = cv2.contourArea(cnt)
        if min_area < area < max_area:
            epsilon = 0.001 * cv2.arcLength(cnt, True)
            smooth_cnt = cv2.approxPolyDP(cnt, epsilon, True)
            filtered_contours.append(smooth_cnt)
            
    print(f"Found {len(filtered_contours)} letter contours.")
    
    output_svg = "stomatol_letters.svg"
    contours_to_svg(filtered_contours, w, h, output_svg)
    print(f"Successfully saved vector graphic to {output_svg}")

if __name__ == "__main__":
    main()

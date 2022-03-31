import cv2 as cv2
import numpy as np
import imutils
from imutils.video import VideoStream

font = cv2.FONT_HERSHEY_SIMPLEX
topLeftCornerOfText = (10,30)
fontScale = 1
fontColor = (0,0,0)
lineType = 2

cap = cv2.VideoCapture(1)  # 0 or 1, 0은 노트북 카메라 연결, 1이 usb로 붙인 카메라가 연결됨

# Object detection from Stable camera
object_detector = cv2.createBackgroundSubtractorMOG2(history=100, varThreshold=40)


while True:
	ret, frame = cap.read()
	height, width, _ = frame.shape

	# Extract Region of interest
	roi = frame[340: 720, 500: 800]

	# 1. Object Detection
	mask = object_detector.apply(roi)

	# 2. Draw the box around the object
	_, mask = cv2.threshold(mask, 254, 255, cv2.THRESH_BINARY)
	x, y, w, h = cv2.boundingRect(cnt)
	cv2.rectangle(roi, (x, y), (x + w, y + h), (0, 255, 0), 3)
	contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

	for cnt in contours:
		# Calculate area and remove small elements
		area = cv2.contourArea(cnt)
		if area > 100:
			cv2.drawContours(roi, [cnt], -1, (0, 255, 0), 2)

			cv2.imshow("Preview", mask)

	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break

cap.release()
cv2.destroyAllWindows()

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
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 600)
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))

while True:
	# Capture frame-by-frame
	ret, frame = cap.read()
	dst = frame.copy()

	gray = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
	canny = cv2.Canny(gray, 100, 200, apertureSize=3, L2gradient=True)

	circles = cv2.HoughCircles(canny, cv2.HOUGH_GRADIENT, 1, 100, param1=100, param2=35)
	for i in circles[0]:
		cv2.circle(gray, (i[0], i[1]), int(i[2]), (255,255,255), 5)


	#ret, binary = cv2.threshold(gray, 230, 255, cv2.THRESH_BINARY)
	#morp = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel, iterations=2)
	#image = cv2.bitwise_not(morp)

	# blurred = cv2.GaussianBlur(frame, (11, 11), 0)
	# hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
	# Our operations on the frame come here

	# gray = cv2.medianBlur(gray, 3)  # to remove salt and paper noise
	# to binary
	# ret, thresh = cv2.threshold(gray, 200, 255, 0)  # to detect white objects
	# to get outer boundery only
	# to strength week pixels
	# thresh = cv2.dilate(thresh, kernel, iterations=5)

	# contours, hierarchy = cv2.findContours(image, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
	# cv2.drawContours(dst, contours, -1, (255,255,255), 2)
	# for i in range(len(contours)):
	# 	cv2.putText(dst, str(i), tuple(contours[i][0][0]), font, fontScale, fontColor, lineType)
	# 	# print(i, hierarchy[0][i])

	cv2.imshow("Vision Frame", dst)
	key = cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break

cap.release()
cv2.destroyAllWindows()

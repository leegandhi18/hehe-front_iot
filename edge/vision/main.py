import cv2
from tracker import *
import numpy as np
from socket import *
from select import *
import sys
from time import sleep
import paho.mqtt.client as mqtt
import json

# HOST = '192.168.0.120'
# PORT = 2004
# BUFSIZE = 1024
# ADDR = (HOST,PORT)

def setLabel (img, pts, label):
    (x, y, w, h) = cv2.boundingRect(pts)
    pt1 = (x, y)
    pt2 = (x + w, y + h)
    cv2.rectangle(img, pt1, pt2, (0, 255, 0), 2)
    cv2.putText(img, label, (pt1[0], pt1[1] - 3), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255))

# Create tracker object
tracker = EuclideanDistTracker()

cap = cv2.VideoCapture(1)  # 0 or 1, 0은 노트북 카메라 연결, 1은 usb로 붙인 카메라가 연결됨
readings = [-1, -1]
display = [0, 0]

Circle_Inertia = 0.6
Gaussian_ksize = (7, 7)
canny_threshold_min = 100
canny_threshold_max = 250

params = cv2.SimpleBlobDetector_Params()
params.filterByInertia = True
params.minInertiaRatio = Circle_Inertia

detector = cv2.SimpleBlobDetector_create(params)

# Object detection from Stable camera - varThreshold 값은 물체의 크기
object_detector = cv2.createBackgroundSubtractorMOG2(history=100, varThreshold=40)

while True:
    # 영상 불러오기, 크기는 원래 카메라의 크기 그대로
    ret, frame = cap.read()
    # height, width, _ = frame.shape # (480, 640, 3)

    # Extract Region of interest - 컨베이어벨트 중앙 부분만 자름
    roi = frame[100: 400, 150: 550]

    frame_blurred = cv2.GaussianBlur(roi, Gaussian_ksize, 1)
    frame_gray = cv2.cvtColor(frame_blurred, cv2.COLOR_BGR2GRAY)
    frame_canny = cv2.Canny(frame_gray, canny_threshold_min, canny_threshold_max, apertureSize=3, L2gradient=True)
    keypoints = detector.detect(frame_canny)
    num = len(keypoints)
    readings.append(num)


    # 1. Object Detection
    mask = object_detector.apply(roi)
    _, mask = cv2.threshold(mask, 254, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    detections = []
    for cnt in contours:
        # Calculate area and remove small elements
        area = cv2.contourArea(cnt)
        if area > 1000:
            x, y, w, h = cv2.boundingRect(cnt)
            detections.append([x, y, w, h])
            cv2.putText(roi, str('Container_element'), ((x, y)[0], (x, y)[1] - 3), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255))
            # setLabel(frame, cnt, 'Container_element')

    # 사각형 검출을 통해 주사위 검출
    # for cont in contours2:
    #     area = cv2.contourArea(cont)
    #     if area > 500:
    #         approx = cv2.approxPolyDP(cont, cv2.arcLength(cont, True) * 0.02, True)
    #         vtc = len(approx)
    #         if vtc == 4:
    #             setLabel(frame, cont, 'Dice_element')

    # 2. Object Tracking
    boxes_ids = tracker.update(detections)
    for box_id in boxes_ids:
        x, y, w, h, id = box_id
        cv2.putText(roi, str(id), (x, y - 15), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
        cv2.rectangle(roi, (x, y), (x + w, y + h), (0, 255, 0), 3)

    cv2.imshow("Frame", frame)  # 전체 카메라 화면 - tracking 보여줌
    # cv2.imshow("roi", roi)  # 제품 지나가는 ROI 부분 crop
    cv2.imshow("Mask", mask)

    key = cv2.waitKey(30)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()

import cv2
from tracker import *
import numpy as np


# Create tracker object
tracker = EuclideanDistTracker()

cap = cv2.VideoCapture(1)

# Object detection from Stable camera
object_detector = cv2.createBackgroundSubtractorMOG2(history=100, varThreshold=40)

while True:
    ret, frame = cap.read()

    # Extract Region of interest
    roi = frame[100: 400, 150: 450]

    # 1. Object Detection
    mask = object_detector.apply(roi)
    _, mask = cv2.threshold(mask, 254, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    detections = []
    for cnt in contours:
        # Calculate area and remove small elements
        area = cv2.contourArea(cnt)
        if area > 15000:
            x, y, w, h = cv2.boundingRect(cnt)
            detections.append([x, y, w, h])
            cv2.putText(roi, str('Container'), ((x, y)[0], (x, y)[1] - 3), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
            cv2.imwrite("dice.jpg", frame)

        else:
            pass

    # 2. Object Tracking
    boxes_ids = tracker.update(detections)
    for box_id in boxes_ids:
        x, y, w, h, id = box_id
        cv2.putText(frame, str(id), (10,30), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)
        cv2.rectangle(roi, (x, y), (x + w, y + h), (0, 255, 0), 3)

    # dice detection
    #_, cap_dice = cap.get(cv2.CAP_PROP_POS_FRAMES)
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    # _, im = cv2.threshold(gray, 254, 255, cv2.THRESH_BINARY)
    # circles = cv2.HoughCircles(im, cv2.HOUGH_GRADIENT, 1.3, 100)
    #     if circles is not None:
    #         circles = np.round(circles[0, :]).astype("int")
    #         if ((len(circles) > 0) and (len(circles) <= 6)):
    #         # cir_num = str(len(circles))
    #             cv2.putText(frame, str(len(circles)), (10, 50), cv2.FONT_HERSHEY_PLAIN, 2, (255, 0, 0), 2)

    cv2.imshow("roi", roi)
    cv2.imshow("Frame", frame)
    cv2.imshow("Mask", mask)
    cv2.imshow("please", gray)

    key = cv2.waitKey(20)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()

import cv2
import numpy as np
from time import sleep
import paho.mqtt.client as mqtt

topic = 'UVC-EDU-outside'
client_id = 'python-mqtt'
mqtt = mqtt.Client(client_id) #create new instance
mqtt.connect("220.90.129.47", 1883) #connect to broker
if (mqtt.connect):
    print('connect is success')

cap = cv2.VideoCapture(1) # 0 or 1, 0은 노트북 카메라 연결, 1이 usb로 붙인 카메라가 연결됨

readings = [-1, -1]
display = [0, 0]

Circle_Inertia = 0.6
Gaussian_ksize = (7, 7)
canny_threshold_min = 100
canny_threshold_max = 250

###

params = cv2.SimpleBlobDetector_Params()
params.filterByInertia = True
params.minInertiaRatio = Circle_Inertia

detector = cv2.SimpleBlobDetector_create(params)

###

while True:
    ret, frame = cap.read()
    
    frame_blurred = cv2.GaussianBlur(frame, Gaussian_ksize, 1)
    frame_gray = cv2.cvtColor(frame_blurred, cv2.COLOR_BGR2GRAY)
    frame_canny = cv2.Canny(frame_gray, canny_threshold_min, canny_threshold_max, apertureSize=3, L2gradient=True)
    
    ####
    keypoints = detector.detect(frame_canny)

    num = len(keypoints)
    readings.append(num)
    

    if readings[-1] == readings[-2] == readings[-3] == readings[-4] == readings[-5] == readings[-6]:

        im_with_keypoints = cv2.drawKeypoints(frame, keypoints, np.array([]), (0, 0, 255), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
        cv2.putText(im_with_keypoints, str(num), (500, 250), cv2.FONT_HERSHEY_SCRIPT_SIMPLEX, 5, (0, 255, 0))

        if num != 0:
            print("num = ", num)

            mqtt_num = '{"tagId":"37", "value":"%d"}' % num
            # print("mqtt_num = ", mqtt_num)

            try:
                mqtt.publish(topic, mqtt_num)
                if (mqtt.publish):
                    print("Dice_value Published")
                    sleep(9)
            except Exception as e:
                print(e)

            cv2.imwrite("After.png", im_with_keypoints)
            # cv2.imshow("Dice Reader", im_with_keypoints) #break선언시 실행 불가
            # break
        sleep(0.3)
cv2.destroyAllWindows()
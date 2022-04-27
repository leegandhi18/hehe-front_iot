import cv2
import numpy as np
from time import sleep
import paho.mqtt.client as mqtt

def on_log(client, userdata, level, buf):
    print("log: ",buf)


topic = "UVC-EDU-outside"
client_id = 'python-mqtt'
new_connection_message = '{"tagId":"37", "value":"0"}'
mqtt = mqtt.Client(client_id)  # create new instance
mqtt.connect("220.90.129.47", 1883, 600)  # connect to broker, keepalive 10 min
if mqtt.connect:
    print('Mqtt connection success')

mqtt.loop_start()  # connection fail 방지
mqtt.on_log=on_log # set client logging

cap = cv2.VideoCapture(0) # 0 or 1, 0은 노트북 카메라 연결, 1이 usb로 붙인 카메라가 연결됨
if cap:
    print("camera connection success")
    sleep(3)
    mqtt.publish(topic, new_connection_message)
    if mqtt.publish:
        print("Set default value")
else:
    print("camera error")

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

    keypoints = detector.detect(frame_canny)
    num = len(keypoints)
    readings.append(num)

    if readings[-1] == readings[-2] == readings[-3] == readings[-4] == readings[-5] == readings[-6]:
        im_with_keypoints = cv2.drawKeypoints(frame, keypoints, np.array([]), (0, 0, 255), cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
        cv2.putText(im_with_keypoints, str(num), (500, 250), cv2.FONT_HERSHEY_SCRIPT_SIMPLEX, 5, (0, 255, 0))

        if num != 0:
            mqtt_message = '{"tagId":"37", "value":"%d"}' % num
            print("mqtt_message = ", mqtt_message)

            mqtt.publish(topic, mqtt_message)
            # if (mqtt.publish):
            #     print("Dice_value Published!")
            # else:
            #     print("Something Wrong~~~")

            cv2.imwrite("After.png", im_with_keypoints)
            sleep(9)


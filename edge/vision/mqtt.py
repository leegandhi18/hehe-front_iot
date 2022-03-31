import cv2
import numpy as np
from socket import *
from select import *
import sys
from time import sleep
import paho.mqtt.client as mqtt
import json

class MQTT:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("connected OK")
        else:
            print("Bad connection Returned code=", rc)

    def on_disconnect(client, userdata, flags, rc=0):
        print(str(rc))

    def on_publish(client, userdata, mid):
        print("In on_pub callback mid= ", mid)


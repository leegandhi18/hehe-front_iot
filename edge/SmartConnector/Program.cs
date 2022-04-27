
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace SmartConnector.Edukit
{
    class Program
    {
        private static void Main()
        {
            var instance = new Service();
            instance.Start();
        }

        public class Service
        {
            private static Ecng.Net.SocketIO.Client.Socket ServerSocket;
            public static MqttClient mqttClient;
            static EdgeConfig edgeConfigResult = null;

            internal async void Start()
            {
                SetConfig();
                await Connect();
                AppDomain.CurrentDomain.UnhandledException += CurrentDomain_UnhandledException;
            }

            private static void CurrentDomain_UnhandledException(object sender, UnhandledExceptionEventArgs te)
            {
                Console.WriteLine("Pass : Cannot handle this message");
                Console.WriteLine(te.ToString());
            }

            private static void SetConfig()
            {
                string fullpathFile = AppDomain.CurrentDomain.BaseDirectory;
                string EdgeConfigFile = fullpathFile + "//EdgeConfigFile.json";
                string edgeConfig = File.ReadAllText(EdgeConfigFile);

                edgeConfigResult = JsonConvert.DeserializeObject<EdgeConfig>(edgeConfig);
            }

            public Task<Boolean> Connect()
            {
                try
                {
                    //192.168.0.120 : 2004
                    var ip = edgeConfigResult.EdukitIP;
                    var port = Int32.Parse(edgeConfigResult.EdukitPort);
                    int DelayTime = Int32.Parse(edgeConfigResult.DelayTime);

                    int mqttport = Int32.Parse(edgeConfigResult.MqttBrokerPort);
                    mqttClient = new MqttClient(edgeConfigResult.MqttBrokerIP, mqttport, false, null, null, MqttSslProtocols.TLSv1_2)
                    {
                        ProtocolVersion = MqttProtocolVersion.Version_3_1_1
                    };
                    byte code = mqttClient.Connect(Guid.NewGuid().ToString());

                    string websocket = edgeConfigResult.WebSocketServerUrl;
                    var query = new Dictionary<string, string>()
                        {
                            { "type", "EDGE" },
                            { "id", edgeConfigResult.EdukitId }
                        };
                    var options = new Ecng.Net.SocketIO.Client.IO.Options
                    {
                        Query = query
                    };
                    ServerSocket = Ecng.Net.SocketIO.Client.IO.Socket(websocket, options);

                    ServerSocket.Unhandled += ServerSocket_Unhandled;
                    Console.WriteLine("##########################");
                    Console.WriteLine("Edukit Connection State : True");
                    Console.WriteLine("Edukit IP : " + ip);
                    Console.WriteLine("Edukit PORT : " + port);
                    Console.WriteLine("##########################");
                    // Console.WriteLine(edgeConfigResult.ToString()); // to string 여부와 상관없이 program + EdgeConfig 라고 찍힘..!

                    Console.WriteLine("mqtt : " + edgeConfigResult.MqttBrokerIP);
                    Console.WriteLine("mqttport : " + edgeConfigResult.MqttBrokerPort);
                    Console.WriteLine("websocket : " + websocket);
                    Console.WriteLine("delayTime : " + edgeConfigResult.DelayTime);

                    XGTClass xGTClass = new XGTClass(ip, port);

                    mqttClient.Subscribe(new string[] { edgeConfigResult.FromOutside }, new byte[] { 0 }); 
                    // register a callback-function (we have to implement, see below) which is called by the library when a message was received
                    mqttClient.MqttMsgPublishReceived += client_MqttMsgPublishReceived;

                    ConnectionStart(DelayTime, xGTClass, ip, port);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message + "\n" + ex.StackTrace);
                }
                return Task.FromResult(true);
            }

            private void ServerSocket_Unhandled(string arg1, object[] arg2)
            {
                ServerSocket.Emit("joinRoom", edgeConfigResult.EdukitId);
            }

            private void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
            {
                string ReceivedMessage = Encoding.UTF8.GetString(e.Message);
                Console.WriteLine( "ReceivedMessage = " + ReceivedMessage); // ex, {"tagId":"37", "value":"1"}-~~

                string[] MessageSplit = ReceivedMessage.Split("-");  // 메세지 나눠주기
                foreach(string order in MessageSplit)
                {
                    try 
	                {	        
		                XGTClass xGTClass = new XGTClass(edgeConfigResult.EdukitIP, 2004);
                        XGTWrite(xGTClass, order);
	                }
	                catch (Exception) // message 관련 exeption
	                {
                        Console.WriteLine("메세지 처리에 실패하였습니다.");
	                }
                    finally
                    {
                        Thread.Sleep(100);
                    }
                }

                //try 
	            //{	        
		        //    XGTClass xGTClass = new XGTClass(edgeConfigResult.EdukitIP, 2004);
                //    XGTWrite(xGTClass, ReceivedMessage);
	            //}
	            //catch (Exception me) // message 관련 exeption
	            //{
                //    Console.WriteLine (me.Message + "\n" + me.StackTrace);
                //    Console.WriteLine($"XGTWrite 오류 : {ReceivedMessage} 이 메세지는 처리할 수 없습니다.");
                //   // throw;
	            //}
            }

            private void XGTWrite(XGTClass xGTClass, string order)
            {
                xGTClass.Connect(edgeConfigResult.EdukitIP, 2004);
                
                // 읽어올 데이터를 XGTAddressData로 생성
                XGTAddressData pAddress2 = new XGTAddressData();

                dynamic test = JsonConvert.DeserializeObject(order);  // 여기서 json 형식으로 바꾸는거야~~~~~~~
                Console.Write("Incoming Message = "+ test.ToString());

                if (test.tagId == "1") //start
                {
                    if (test.value == "0")
                    {
                        pAddress2.Address = "0";
                        pAddress2.Data = "0";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.value == "1")
                    {
                        pAddress2.Address = "0";
                        pAddress2.Data = "1";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                }
                else if (test.tagId == "50") //stop, 1 입력했다가 바로 0으로 변경
                {
                    pAddress2.Address = "22";
                    pAddress2.Data = "1";
                    xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);

                    pAddress2.Address = "22";
                    pAddress2.Data = "0";
                    xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                }
                else if (test.tagId == "8") //reset, 1 입력했다가 바로 0으로 변경
                {
                    pAddress2.Address = "1100";
                    pAddress2.Data = "0";
                    xGTClass.Write(XGT_DataType.Word, pAddress2, XGT_MemoryType.DataRegister_D, 0);
                    
                    pAddress2.Address = "F";
                    pAddress2.Data = "1";
                    xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);

                    pAddress2.Address = "F";
                    pAddress2.Data = "0";
                    xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                }
                else if (test.tagId == "9") // 1호기 ON/OFF
                {
                    if (test.value == "0")
                    {
                        pAddress2.Address = "8F";
                        pAddress2.Data = "0";
                        
                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.value == "1")
                    {
                        pAddress2.Address = "8F";
                        pAddress2.Data = "1";
                        
                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                }
                else if (test.tagId == "10") // 2호기 ON/OFF
                {
                    if (test.value == "0")
                    { 
                        pAddress2.Address = "9F";
                        pAddress2.Data = "0";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.value == "1")
                    {
                        pAddress2.Address = "9F";
                        pAddress2.Data = "1";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                }
                else if (test.tagId == "11") // 3호기 ON/OFF
                {
                    if (test.value == "0")
                    {
                        pAddress2.Address = "10E";
                        pAddress2.Data = "0";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.value == "1")
                    {
                        pAddress2.Address = "10E";
                        pAddress2.Data = "1";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                }
                else if (test.tagId == "12") // sensor1 ON/OFF
                {
                    if (test.value == "0")
                    {
                        pAddress2.Address = "6F";
                        pAddress2.Data = "0";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.value == "1")
                    {
                        pAddress2.Address = "6F";
                        pAddress2.Data = "1";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                }
                else if (test.tagId == "31") // 공정조건 - True: 모두, False: 색선별
                {
                    if (test.value == "0")  // 색 선별
                    {
                        pAddress2.Address = "18";
                        pAddress2.Data = "0";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.value == "1")  // 모두
                    {
                        pAddress2.Address = "18";
                        pAddress2.Data = "1";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                }
                else if (test.tagId == "13") // sensor2 ON/OFF
                {
                    if (test.value == "0")
                    {
                        pAddress2.Address = "7F";
                        pAddress2.Data = "0";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                    else if (test.value == "1")
                    {
                        pAddress2.Address = "7F";
                        pAddress2.Data = "1";

                        xGTClass.Write(XGT_DataType.Bit, pAddress2, XGT_MemoryType.SubRelay_M, 0);
                    }
                }
                else if (test.tagId == "36") // OutputLimit
                {
                    pAddress2.Address = "10000";
                    pAddress2.Data = test.value;
                        
                    xGTClass.Write(XGT_DataType.Word, pAddress2, XGT_MemoryType.DataRegister_D, 0);
                }
                else if (test.tagId == "38") // DiceComparisonValue
                {
                    pAddress2.Address = "150";
                    pAddress2.Data = test.value;
                        
                    xGTClass.Write(XGT_DataType.Word, pAddress2, XGT_MemoryType.DataRegister_D, 0);
                }
                else if (test.tagId == "37") // DiceValue
                {
                    if (test.value == "0")
                    {
                        pAddress2.Address = "1100";
                        pAddress2.Data = "0";

                        xGTClass.Write(XGT_DataType.Word, pAddress2, XGT_MemoryType.DataRegister_D, 0);
                    }
                    else
                    {
                        pAddress2.Address = "1100";
                        pAddress2.Data = test.value;
                        
                        xGTClass.Write(XGT_DataType.Word, pAddress2, XGT_MemoryType.DataRegister_D, 0);
                    }
                }
            }

            private void ConnectionStart(int DelayTime, XGTClass xGTClass, string ip, int port)
            {
                xGTClass.Connect(ip, port);

                // BitAddressData와 WordAddressData를 분리함
                // 메모리주소의 알파벳이 M,P이면 Bit, D,C,K이면 Word
                Dictionary<XGTAddressData, string> BitAddressList = new Dictionary<XGTAddressData, string>();
                Dictionary<XGTAddressData, string> WordAddressList = new Dictionary<XGTAddressData, string>();

                // 읽어올 데이터를 XGTAddressData로 생성
                XGTAddressData Start = new XGTAddressData();                //시작 M0000 bit
                XGTAddressData Stop = new XGTAddressData();                 //일시정지 M0022 bit
                XGTAddressData No1PartsError = new XGTAddressData();        //no1 칩없음 M0011 bit 1이 정상 0이 칩없음
                XGTAddressData No1_Action = new XGTAddressData();           //no1 move M92 bit								
                XGTAddressData No2_Action = new XGTAddressData();           //no2 move M00104 bit
                XGTAddressData No3Ready = new XGTAddressData();             //no3 칩도착 P0000E bit
                XGTAddressData Sensor1 = new XGTAddressData();              //colorsensor on M105 bit
                XGTAddressData Reset = new XGTAddressData();                //Reset M0F BIT
                XGTAddressData no1_on_off = new XGTAddressData();           //1호기 on/off M0008F bit
                XGTAddressData no2_on_off = new XGTAddressData();           //2호기 on/off M0009F bit
                XGTAddressData no3_on_off = new XGTAddressData();           //3호기 on/off M0010E bit
                XGTAddressData sensor1_on_off = new XGTAddressData();       //sensor1 on/off M0006F bit
                XGTAddressData sensor2_on_off = new XGTAddressData();       //sensor2 on/off M0007F bit
                XGTAddressData lamp_green = new XGTAddressData();           //sensor2 on/off M0007F bit
                XGTAddressData lamp_yellow = new XGTAddressData();          //sensor2 on/off M0007F bit
                XGTAddressData lamp_red = new XGTAddressData();             //sensor2 on/off M0007F bit
                XGTAddressData No1Delay = new XGTAddressData();             //1호기 delay 시간  D01101 WORD
                XGTAddressData No1Count = new XGTAddressData();             //1호기 수량 C0001 WORD
                XGTAddressData No2Count = new XGTAddressData();             //2호기 수량 C0002 WORD
                XGTAddressData No3Count = new XGTAddressData();             //3호기 수량 C0003 WORD
                XGTAddressData Sensor2 = new XGTAddressData();              //visionSensor on C05 WORD
                XGTAddressData no3_motor1 = new XGTAddressData();           //3호기 축1 value K424 WORD
                XGTAddressData no3_motor2 = new XGTAddressData();           //3호기 축2 value K444 WORD
                XGTAddressData No1ChipFull = new XGTAddressData();          // 1호기 칩 유무 P00009 bit
                XGTAddressData No2Chip = new XGTAddressData();              // 2호기 칩 도착 P0000A bit
                XGTAddressData No2CubeFull = new XGTAddressData();          // 2호기 주사위 유무 P0000B bit
                XGTAddressData No2InPoint = new XGTAddressData();           // 2호기 in point P0000C bit
                XGTAddressData No2OutPoint = new XGTAddressData();          // 2호기 out point P0000D bit
                XGTAddressData No2Sol = new XGTAddressData();               // 2호기 솔레노이드 P0002A bit
                XGTAddressData No2SolAction = new XGTAddressData();         // 2호기 솔작동 M00106 WORD
                XGTAddressData No2BackToSquare = new XGTAddressData();      // 2호기 원점으로 M00107 WORD
                XGTAddressData No2Mode = new XGTAddressData();              // 2호기 운전방법 M00018 WORD
                XGTAddressData No3Chip = new XGTAddressData();              // 3호기 칩 도착 P0000E bit
                XGTAddressData VisionCmdMemory = new XGTAddressData();      // 비젼지령기억 M0001C bit
                XGTAddressData No3DiceReading = new XGTAddressData();       // 주사위판독 C0004 WORD
                XGTAddressData Emergency = new XGTAddressData();            // 비상정지 P0000F bit
                XGTAddressData OutputLimit = new XGTAddressData();          // 생산량 리미트 D10000 WORD
                XGTAddressData DiceValue = new XGTAddressData();            // 주사위값 D01100 WORD
                XGTAddressData DiceComparisonValue = new XGTAddressData();  // 주사위 비교 숫자 D00150 WORD
                XGTAddressData ColorSensorSensing = new XGTAddressData();   // 컬러센서센싱 P00004 bit
                XGTAddressData No3Gripper = new XGTAddressData();           // 3호기 그리퍼 P0002B bit
                XGTAddressData Motor1Busy = new XGTAddressData();           // 1축 운전중 K04200 WORD
                XGTAddressData Motor2Busy = new XGTAddressData();           // 2축 운전중 K04400 WORD

                // 생성한 XGTAddressData에 주소, 이름, TagId 입력
                // Name과 TagId는 사용자가 원하는 Name과 TagId로 설정할 수 있음
                Start.Address = "0";
                Start.Name = "Start";
                Start.TagId = "1";

                Stop.Address = "22";
                Stop.Name = "Stop";
                Stop.TagId = "50";

                No1PartsError.Address = "11";
                No1PartsError.Name = "No1PartsError";
                No1PartsError.TagId = "2";

                No1_Action.Address = "92";
                No1_Action.Name = "No1_Action";
                No1_Action.TagId = "3";

                No2_Action.Address = "104";
                No2_Action.Name = "No2_Action";
                No2_Action.TagId = "4";

                No3Ready.Address = "0E";
                No3Ready.Name = "No3Ready";
                No3Ready.TagId = "5";

                Sensor1.Address = "105";
                Sensor1.Name = "ColorSensor";
                Sensor1.TagId = "6";

                Sensor2.Address = "5";
                Sensor2.Name = "VisionSensor";
                Sensor2.TagId = "7";

                Reset.Address = "0F";
                Reset.Name = "Reset";
                Reset.TagId = "8";

                no1_on_off.Address = "8F";
                no1_on_off.Name = "no1_on_off";
                no1_on_off.TagId = "9";

                no2_on_off.Address = "9F";
                no2_on_off.Name = "no2_on_off";
                no2_on_off.TagId = "10";

                no3_on_off.Address = "10E";
                no3_on_off.Name = "no3_on_off";
                no3_on_off.TagId = "11";

                sensor1_on_off.Address = "6F";
                sensor1_on_off.Name = "sensor1_on_off";
                sensor1_on_off.TagId = "12";

                sensor2_on_off.Address = "7F";
                sensor2_on_off.Name = "sensor2_on_off";
                sensor2_on_off.TagId = "13";

                No1Delay.Address = "1101";
                No1Delay.Name = "No1Delay";
                No1Delay.TagId = "14";

                No1Count.Address = "1";
                No1Count.Name = "No1Count";
                No1Count.TagId = "15";

                No2Count.Address = "2";
                No2Count.Name = "No2Count";
                No2Count.TagId = "16";

                No3Count.Address = "7";
                No3Count.Name = "No3Count";
                No3Count.TagId = "17";

                lamp_green.Address = "2C";
                lamp_green.Name = "lamp_green";
                lamp_green.TagId = "18";

                lamp_yellow.Address = "2D";
                lamp_yellow.Name = "lamp_yellow";
                lamp_yellow.TagId = "19";

                lamp_red.Address = "2E";
                lamp_red.Name = "lamp_red";
                lamp_red.TagId = "20";

                no3_motor1.Address = "424";
                no3_motor1.Name = "No3Motor1";
                no3_motor1.TagId = "21";

                no3_motor2.Address = "444";
                no3_motor2.Name = "No3Motor2";
                no3_motor2.TagId = "22";

                No1ChipFull.Address = "9";
                No1ChipFull.Name = "No1ChipFull";
                No1ChipFull.TagId = "23";

                No2Chip.Address = "A";
                No2Chip.Name = "No2Chip";
                No2Chip.TagId = "24";

                No2CubeFull.Address = "B";
                No2CubeFull.Name = "No2CubeFull";
                No2CubeFull.TagId = "25";

                No2InPoint.Address = "C";
                No2InPoint.Name = "No2InPoint";
                No2InPoint.TagId = "26";

                No2OutPoint.Address = "D";
                No2OutPoint.Name = "No2OutPoint";
                No2OutPoint.TagId = "27";

                No2Sol.Address = "2A";
                No2Sol.Name = "No2Sol";
                No2Sol.TagId = "28";

                No2SolAction.Address = "106";
                No2SolAction.Name = "No2SolAction";
                No2SolAction.TagId = "29";

                No2BackToSquare.Address = "107";
                No2BackToSquare.Name = "No2BackToSquare";
                No2BackToSquare.TagId = "30";

                No2Mode.Address = "18";
                No2Mode.Name = "No2Mode";
                No2Mode.TagId = "31";

                No3Chip.Address = "E";
                No3Chip.Name = "No3Chip";
                No3Chip.TagId = "32";

                VisionCmdMemory.Address = "1C";
                VisionCmdMemory.Name = "VisionCmdMemory";
                VisionCmdMemory.TagId = "33";

                No3DiceReading.Address = "4";
                No3DiceReading.Name = "No3DiceReading";
                No3DiceReading.TagId = "34";

                Emergency.Address = "F";
                Emergency.Name = "Emergency";
                Emergency.TagId = "35";

                OutputLimit.Address = "10000";
                OutputLimit.Name = "OutputLimit";
                OutputLimit.TagId = "36";

                DiceValue.Address = "1100";
                DiceValue.Name = "DiceValue";
                DiceValue.TagId = "37";

                DiceComparisonValue.Address = "150";
                DiceComparisonValue.Name = "DiceComparisonValue";
                DiceComparisonValue.TagId = "38";

                ColorSensorSensing.Address = "4";
                ColorSensorSensing.Name = "ColorSensorSensing";
                ColorSensorSensing.TagId = "39";

                No3Gripper.Address = "2B";
                No3Gripper.Name = "No3Gripper";
                No3Gripper.TagId = "40";

                Motor1Busy.Address = "42";
                Motor1Busy.Name = "Motor1Busy";
                Motor1Busy.TagId = "41";

                Motor2Busy.Address = "44";
                Motor2Busy.Name = "Motor2Busy";
                Motor2Busy.TagId = "42";

                // 처음에 생성한 AddressList에 XGTAddressData와 메모리주소의 알파벳 부분을 추가함
                // 알파벳에 따라 BitAddressList와 WordAddressData 중 알맞은 리스트에 넣어주어야 함
                BitAddressList.Add(Start, "M");
                BitAddressList.Add(Stop, "M");
                BitAddressList.Add(No1PartsError, "M");
                BitAddressList.Add(No1_Action, "M");
                BitAddressList.Add(No2_Action, "M");
                BitAddressList.Add(No3Ready, "P");
                BitAddressList.Add(Sensor1, "M");
                WordAddressList.Add(Sensor2, "C");
                BitAddressList.Add(Reset, "M");
                BitAddressList.Add(no1_on_off, "M");
                BitAddressList.Add(no2_on_off, "M");
                BitAddressList.Add(no3_on_off, "M");
                BitAddressList.Add(sensor1_on_off, "M");
                BitAddressList.Add(sensor2_on_off, "M");
                WordAddressList.Add(No1Delay, "D");
                WordAddressList.Add(No1Count, "C");
                WordAddressList.Add(No2Count, "C");
                WordAddressList.Add(No3Count, "C");
                WordAddressList.Add(no3_motor1, "K");
                WordAddressList.Add(no3_motor2, "K");
                BitAddressList.Add(lamp_green, "P");
                BitAddressList.Add(lamp_yellow, "P");
                BitAddressList.Add(lamp_red, "P");
                BitAddressList.Add(No1ChipFull, "P");
                BitAddressList.Add(No2Chip, "P");
                BitAddressList.Add(No2CubeFull, "P");
                BitAddressList.Add(No2InPoint, "P");
                BitAddressList.Add(No2OutPoint, "P");
                BitAddressList.Add(No2Sol, "P");
                BitAddressList.Add(No2SolAction, "M");
                BitAddressList.Add(No2BackToSquare, "M");
                BitAddressList.Add(No2Mode, "M");
                BitAddressList.Add(No3Chip, "P");
                BitAddressList.Add(VisionCmdMemory, "M");
                WordAddressList.Add(No3DiceReading, "C");
                BitAddressList.Add(Emergency, "P");
                WordAddressList.Add(OutputLimit, "D");
                WordAddressList.Add(DiceValue, "D");
                WordAddressList.Add(DiceComparisonValue, "D");
                BitAddressList.Add(ColorSensorSensing, "P");
                BitAddressList.Add(No3Gripper, "P");
                BitAddressList.Add(Motor1Busy, "K");
                BitAddressList.Add(Motor2Busy, "K");

                // 데이터 수집 로직
                while (true)
                {
                    try
                    {
                        // 위에서 추가한 태그 데이터를 담아놓을 리스트를 생성함
                        List<EdukitNewdata> edukitData = new List<EdukitNewdata>();
                        List<EdukitNewdata> edukitMqttData = new List<EdukitNewdata>();

                        // BitAddressList를 읽어로는 로직 (M,P번지)
                        foreach (var address in BitAddressList)
                        {
                            XGTData val = null;
                            if (address.Value == "M")
                            {
                                val = xGTClass.Read(XGT_DataType.Bit, address.Key, XGT_MemoryType.SubRelay_M, 0);

                                if (val.DataList != null)
                                {
                                    if (val.DataList[0].IntData == 0)
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata
                                        {
                                            name = address.Key.Name,
                                            tagId = address.Key.TagId,
                                            value = false
                                        };
                                        edukitData.Add(newdata);
                                    }
                                    else
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata
                                        {
                                            name = address.Key.Name,
                                            tagId = address.Key.TagId,
                                            value = true
                                        };
                                        edukitData.Add(newdata);
                                    }
                                }
                                Thread.Sleep(DelayTime / 100);
                            }
                            else if (address.Value == "P")
                            {
                                val = xGTClass.Read(XGT_DataType.Bit, address.Key, XGT_MemoryType.IO_P, 0);

                                if (val.DataList != null)
                                {
                                    if (val.DataList[0].IntData == 0)
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata
                                        {
                                            name = address.Key.Name,
                                            tagId = address.Key.TagId,
                                            value = false
                                        };
                                        edukitData.Add(newdata);
                                    }
                                    else
                                    {
                                        EdukitNewdata newdata = new EdukitNewdata
                                        {
                                            name = address.Key.Name,
                                            tagId = address.Key.TagId,
                                            value = true
                                        };
                                        edukitData.Add(newdata);
                                    }
                                }
                                Thread.Sleep(DelayTime / 100);
                            }
                        }

                        // WordAddressList를 읽어로는 로직 (D,C,K번지)
                        foreach (var address in WordAddressList)
                        {
                            XGTData val = null;

                            if (address.Value == "D")
                            {
                                val = xGTClass.Read(XGT_DataType.Word, address.Key, XGT_MemoryType.DataRegister_D, 0);

                                if (val.DataList != null)
                                {

                                    EdukitNewdata newdata = new EdukitNewdata();

                                    double data = (double)val.DataList[0].IntData;
                                    if (address.Key.Name == "No1Delay") data = (double)val.DataList[0].IntData / 10;

                                    newdata.name = address.Key.Name;
                                    newdata.tagId = address.Key.TagId;
                                    newdata.value = data.ToString();
                                    edukitData.Add(newdata);
                                }
                                Thread.Sleep(DelayTime / 100);
                            }
                            else if (address.Value == "C")
                            {
                                val = xGTClass.Read(XGT_DataType.Word, address.Key, XGT_MemoryType.Counter_C, 0);

                                if (val.DataList != null)
                                {

                                    EdukitNewdata newdata = new EdukitNewdata
                                    {
                                        name = address.Key.Name,
                                        tagId = address.Key.TagId,
                                        value = val.DataList[0].IntData.ToString()
                                    };
                                    edukitData.Add(newdata);
                                }
                                Thread.Sleep(DelayTime / 100);
                            }
                            else if (address.Value == "K")
                            {
                                XGTData val1 = xGTClass.Read(XGT_DataType.Word, address.Key, XGT_MemoryType.KeepRelay_K, 0);
                                int test = Int32.Parse(address.Key.Address);
                                XGTAddressData q = new XGTAddressData
                                {
                                    Address = (test + 1).ToString()
                                };
                                XGTData val2 = xGTClass.Read(XGT_DataType.Word, q, XGT_MemoryType.KeepRelay_K, 0);
                                int val22 = val2.DataList[0].IntData;
                                long dWordVal = (val22 * 65536) + val1.DataList[0].IntData;

                                EdukitNewdata newdata = new EdukitNewdata
                                {
                                    name = address.Key.Name,
                                    tagId = address.Key.TagId,
                                    value = dWordVal.ToString()
                                };
                                edukitData.Add(newdata);
                                edukitMqttData.Add(newdata);

                                Thread.Sleep(DelayTime / 100);
                            }
                        }

                        // 0번째 태그에는 현재 시간을 추가함
                        EdukitNewdata newdata2 = new EdukitNewdata
                        {
                            name = "DataTime",
                            tagId = "0",
                            value = DateTime.Now.ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'")
                        };
                        edukitData.Add(newdata2);

                        // Digital Twin에서 사용할 데이터로 Wrapper로 한번 감싸줌
                        MqttData mqttData = new MqttData
                        {
                            Wrapper = edukitData
                        };

                        // Socket으로 데이터 송신하는 함수
                        SocketIoData(edukitData);
                        // Mqtt로 데이터 송신하는 함수
                        MqttData(mqttData);

                        // Debug mode에서는 콘솔에 퍼블리쉬하는 중인 것 보이도록 
                        if (edgeConfigResult.DebugType == "Debug")
                        {
                            Console.WriteLine("Publish!");
                            //Console.Clear();

                            // List<EdukitNewdata> SortedList = edukitData.OrderBy(x => Int32.Parse(x.tagId)).ToList();

                            // foreach (var data in SortedList)
                            // {
                            //     Console.WriteLine($"[{data.tagId}]{data.name} : {data.value}");
                            // }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                    // EdgeConfigFile.json에서 설정한 시간만큼 Delay
                    Thread.Sleep(DelayTime);
                }
            }

            static Task<string> SocketIoData(List<EdukitNewdata> EduKitData)
            {
                string data = JsonConvert.SerializeObject(EduKitData, Formatting.Indented);

                string EdukitID = edgeConfigResult.EdukitId;
                try
                {
                    ServerSocket.Emit("create", EdukitID, data);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message + "\n" + ex.StackTrace);
                }
                return null;
            }

            static void MqttData(MqttData EduKitData)
            {
                string json = JsonConvert.SerializeObject(EduKitData, Formatting.Indented);

                string data = json;

                string topic = edgeConfigResult.EdukitId;
                try
                {
                    mqttClient.Publish(topic, Encoding.Default.GetBytes(data),
                        MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message + "\n" + ex.StackTrace);
                }
            }
        }

        public class EdukitNewdata
        {
            public string tagId { get; set; }
            public string name { get; set; }
            public object value { get; set; }
        }

        public class EdgeConfig
        {
            public string EdukitId { get; set; }
            public string EdukitIP { get; set; }
            public string FromOutside { get; set; }
            public string EdukitPort { get; set; }
            public string MqttBrokerIP { get; set; }
            public string MqttBrokerPort { get; set; }
            public string WebSocketServerUrl { get; set; }
            public string DelayTime { get; set; }
            public string DebugType { get; set; }
        }

        public class Test
        {
            public string tagId { get; set; }
            public string value { get; set; }
        }

        public class MqttData
        {
            public List<EdukitNewdata> Wrapper { get; set; }
        }
    }
}



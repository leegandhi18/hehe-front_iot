using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartConnector.Edukit
{
    public class XGTAddressData
    {
        public string Address { get; set; }
        public string Data { get; set; }
        public string TagId { get; set; }
        public int IntData { get; set; }
        public string Name { get; set; }
        public byte[] DataByteArray { get; set; }
        public string AddressString { get; set; }

        public byte[] AddressByteArray
        {
            get
            {
                byte[] value = Encoding.ASCII.GetBytes(AddressString);
                return value;
            }
        }

        public byte[] LengthByteArray
        {
            get
            {
                byte[] value = BitConverter.GetBytes((short)AddressByteArray.Length);
                return value;
            }
        }
    }
}

using System;
namespace HTTP_Server
{
	public class Config
	{
        public string Address { get; set; }
        public int Port { get; set; }
        public string StaticDirectoryPath { get; set; }
        public int SmtpPort { get; set; }
        public string SMTP { get; set; }
        public string Mail { get; set; }
        public string MailPassword { get; set; }
        public string FromName { get; set; }
    }

    class Mail
    {
        public Mail(string address, string password)
        {
            Address = address;
            Password = password;
        }
        public string Address;
        public string Password;
    }
}


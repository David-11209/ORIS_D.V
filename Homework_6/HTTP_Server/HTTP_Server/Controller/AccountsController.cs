using System;
using System.Net;
using System.Text;
using HTTP_Server.Attributes;
using HTTP_Server.services;
using HTTP_Server.Model;
using HTTP_Server;
using System.Text.Json;


namespace HTTP_Server
{
    [HttpController("accounts")]
    public class AccountsController
    {
        private EmailSenderService emailSender;
        private readonly Config config = Settings.config;

        public AccountsController()
        {
            emailSender = new EmailSenderService();
        }

        [HttpPost("sendemail")]
        public void SendEmail(string login, string password)
        {
            emailSender.SendEmail(login, config.Mail, config.FromName, "login: " + login +
                                 "\npassword: " + password);
        }

        [HttpGet("GetEmailList")]
        public string GetEmailList(object anyObject)
        {
            if(anyObject is String)
            {
                return ((string)anyObject).ToString();
            }
            else
            {
                var json = JsonSerializer.Serialize(anyObject);
                return json;
            }
        }

        [HttpGet("GetAccountList")]
        public Account[] GetAccountList()
        {
            var accounts = new[]
            {
                new Account() {Email = "david@gmail.com", password = "123"},
                new Account() {Email = "vasilev@gmail.com", password = "456"}
            };

            return accounts;
        }

        public void Delete()
        {

        }

        public void Update()
        {

        }

        public void Select()
        {

        }

        public void SelectByEmail()
        {

        }

    }
}

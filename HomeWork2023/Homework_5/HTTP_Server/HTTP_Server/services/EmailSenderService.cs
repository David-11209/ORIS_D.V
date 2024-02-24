using System;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace HTTP_Server.services
{
    public class EmailSenderService : IEmailSenderService
    {
        private readonly Config config = Settings.config;

        public void SendEmail(string toEmail, string fromEmail, string subject, string body)
        {
                MailMessage message = new MailMessage(fromEmail, toEmail, subject, body);
                SmtpClient smtp = new SmtpClient(config.SMTP, config.SmtpPort);
                message.Attachments.Add(new Attachment("Homework_4.zip"));
                smtp.EnableSsl = true;
                smtp.Credentials = new NetworkCredential(fromEmail, config.MailPassword);
                smtp.Send(message);
        }
    }
}


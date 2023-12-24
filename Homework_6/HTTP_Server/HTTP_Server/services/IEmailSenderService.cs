using System;
namespace HTTP_Server.services
{
	public interface IEmailSenderService
	{
		void SendEmail(string toEmail, string fromEmail,
			string subject, string message);
	}
}


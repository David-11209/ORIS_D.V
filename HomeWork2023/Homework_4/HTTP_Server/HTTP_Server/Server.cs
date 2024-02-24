using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using HTTP_Server;

public class Server
{
    private HttpListener listener;
    private string staticDir;
    private static Mail mail;

    public async Task<HttpListenerContext> GetContextAsync()
    {
        return await listener.GetContextAsync();
    }

    public Server(string staticDir, string baseUrl)
    {
        Config config = Settings.config;
        listener = new HttpListener();
        listener.Prefixes.Add(baseUrl);
        mail = new Mail(config.Mail, config.MailPassword);
        this.staticDir = staticDir;

        if (!Directory.Exists(this.staticDir))
        {
            Directory.CreateDirectory(this.staticDir);
        }
    }
    public void Start()
    {
        listener.Start();
        Console.WriteLine("Сервер успешно запущен");

        while (true)
        {
            HttpListenerContext context = listener.GetContext();
            HttpListenerRequest request = context.Request;
            HttpListenerResponse response = context.Response;
            var c = Settings.config;
            string filePath;
            if (request.Url.LocalPath.Equals("/"))
            {
                filePath = Path.Combine(staticDir, "index.html");
                if (!File.Exists(filePath))
                {
                    Console.WriteLine("файл по этому пути отсутствует" + filePath);
                }

            }
            else if (request.Url.LocalPath.Contains(".html"))
            {

                filePath = request.Url.LocalPath;
                filePath = filePath.Substring(1);
                if (!File.Exists(filePath))
                {
                    Console.WriteLine("файл по этому пути отсутствует" + filePath);
                }
            }
            else if (request.Url.LocalPath == "/sendEmail")
            {
                using (StreamReader reader = new StreamReader(request.InputStream))
                {
                    
                    string data = reader.ReadToEnd();

                    string[] formData = data.Split('&');

                    var message = $"Ха-ха-ха ты попался!!";
                    SendEmail(message , formData);
                }
                filePath = Path.Combine(staticDir,"index.html");
            }
            else if (!request.Url.LocalPath.Contains('.'))
            {
                filePath = Path.Combine(staticDir, request.Url.LocalPath.TrimStart('/'), "index.html");
            }
            else
            {
                var a = request.Url.LocalPath.TrimStart('/');
                var b = a.Split('/');
                filePath = b[b.Length - 4] + "/" + b[b.Length - 3] + "/" + b[b.Length - 2] + "/" + b[b.Length - 1];
            }
            
            if (File.Exists(filePath))
            {
                var pageContents = File.ReadAllBytes(filePath);
                response.ContentLength64 = pageContents.Length;
                response.ContentType = GetContentType(filePath);
                response.OutputStream.Write(pageContents, 0, pageContents.Length);
                response.Close();
            }
            else
            {
                string ex ="404 Error";
                byte[] Buffer = Encoding.ASCII.GetBytes(ex);
                response.ContentLength64 = Buffer.Length;
                response.OutputStream.Write(Buffer, 0, Buffer.Length);
                response.Close();
            }
          
        }
    }
    private string GetContentType(string filePath)
    {
        string extension = Path.GetExtension(filePath).ToLower();

        Dictionary<string, string> contentTypes = new Dictionary<string, string>()
    {
        { ".htm", "text/html" },
        { ".html", "text/html" },
        { ".css", "text/css" },
        { ".js", "text/javascript" },
        { ".jpg", "image/jpeg" },
        { ".jpeg", "image/jpeg" },
        { ".png", "image/png" },
        { ".gif", "image/gif" },
        { ".svg", "image/svg+xml" }
    };
        if (contentTypes.ContainsKey(extension))
        {
            return contentTypes[extension];
        }
        else
        {
            if (extension.Length > 1)
                return "application/" + extension.Substring(1);
            else
                return "application/unknown";
        }
    }
    static void SendEmail(string message, string[] formData)
    {
        var address = HttpUtility.UrlDecode(formData[0].Split('=')[1]);

        using (SmtpClient client = new SmtpClient("smtp.yandex.ru"))
        {
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;
            client.Port = 25;

            client.Credentials = new NetworkCredential(mail.Address, mail.Password);


            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(mail.Address);
            mailMessage.To.Add("dumbulgul@yandex.ru");
            mailMessage.Subject = "Ты попался!";
            mailMessage.Body = message;

            try
            {
                client.Send(mailMessage);
                Console.WriteLine("Mail Sent Successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send mail: " + ex.Message);
            }
        }
    }
    public void Stop()
    {
        listener.Stop();
        listener.Close();
    }
}
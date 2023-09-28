using System;
using System.IO;
using System.Net;
using System.Text;

public class Server
{
    private HttpListener listener;
    private string staticDir;

    public Server(string staticDir, string baseUrl)
    {
        listener = new HttpListener();
        listener.Prefixes.Add(baseUrl);
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

            Console.WriteLine($"Запрос: {request.Url}");

            string filePath;
            if (request.Url.LocalPath.Equals("/"))
            {
                filePath = filePath = Path.Combine(staticDir, "BattleNet", "index.html");
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

    public void Stop()
    {
        listener.Stop();
        listener.Close();
    }
}

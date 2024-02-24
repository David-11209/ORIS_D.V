using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using HTTP_Server;
using HTTP_Server.Handlers;

public class Server
{
    private HttpListener listener;
    private static Config config;
    private Handler staticFilesHandler;
    private Handler controllersHandler;

    public async Task<HttpListenerContext> GetContextAsync()
    {
        return await listener.GetContextAsync();
    }

    public Server()
    {
        config = Settings.config;
        string baseUrl = $"http://{config.Address}:{config.Port}/";
        listener = new HttpListener();
        listener.Prefixes.Add(baseUrl);
        staticFilesHandler = new StaticFilesHandler();
        controllersHandler = new ControllersHandler();


    }
    public void Start()
    {
        if (!Directory.Exists(config.StaticDirectoryPath))
        {
            Directory.CreateDirectory(config.StaticDirectoryPath);
        }

        listener.Start();
        Console.WriteLine("Сервер успешно запущен");

        while (true)
        {
            var context = listener.GetContextAsync();
            Query(context.Result);
        }

        void Query(HttpListenerContext context)
        {

            staticFilesHandler.Successor = controllersHandler;
            staticFilesHandler.HandleRequest(context);
        }
    }
    public void Stop()
    {
        listener.Stop();
        listener.Close();
    }
}
   
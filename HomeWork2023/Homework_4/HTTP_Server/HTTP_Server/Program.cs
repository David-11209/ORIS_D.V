using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using HTTP_Server;

var config = Settings.config;
string baseUrl = $"http://{config.Address}:{config.Port}/";
string staticDir = config.StaticDirectoryPath;
Server server = new Server(staticDir, baseUrl);
try
{
    server.Start();
}
catch (Exception ex)
{
    Console.WriteLine("В процессе работы возникла не предвиденная ошибка");
}
finally
{
    server.Stop();
    Console.WriteLine("Cервер завершил работу");
}

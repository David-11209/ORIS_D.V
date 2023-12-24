using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using HTTP_Server;

Server server = new Server();

try
{
    server.Start();
}
catch (Exception ex)
{
    Console.WriteLine(ex);
    Console.WriteLine("В процессе работы возникла не предвиденная ошибка");
}
finally
{
    server.Stop();
    Console.WriteLine("Cервер завершил работу");
}

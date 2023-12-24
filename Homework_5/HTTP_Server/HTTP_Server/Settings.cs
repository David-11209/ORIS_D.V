using System;
namespace HTTP_Server
{
    public static class Settings
    {
        public static Config config { get; set; }
        static Settings()
        {
            try
            {
                using (var file = File.OpenRead(@"appsettings.json"))
                {
                    config = System.Text.Json.JsonSerializer.Deserialize<Config>(file);
                }
            }
            catch (FileNotFoundException ex)
            {
                Console.WriteLine("Config File not found");
                throw;
            }
        }
    }
}
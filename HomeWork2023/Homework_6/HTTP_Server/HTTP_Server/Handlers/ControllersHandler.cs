using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Web;
using HTTP_Server.Attributes;

namespace HTTP_Server.Handlers
{
    public class ControllersHandler : Handler
    {
        public override void HandleRequest(HttpListenerContext contex)
        {
            var uri = contex.Request.Url.Segments;
            string[] options = uri
                .Skip(1)
                .Select(s => s.Replace("/", ""))
                .ToArray();
            Console.WriteLine(contex.Request.Url);
            var controllerName = options[^2];
            var methodName = options[^1];
            var login = "";
            var password = "";

            using (var reader = new StreamReader(contex.Request.InputStream, contex.Request.ContentEncoding))
            {
                var data = reader.ReadToEnd();
                var formData = HttpUtility.ParseQueryString(data);

                login = formData["login"];  //почта 
                password = formData["password"];
            }

            var assembly = Assembly.GetExecutingAssembly();
            var controller = assembly
                .GetTypes()
                .Where(t => Attribute.IsDefined(t, typeof(HttpController)))
                .FirstOrDefault(c =>
                    ((HttpController)Attribute.GetCustomAttribute(c, typeof(HttpController))!).name.Equals(controllerName));

            var list = controller
                .GetMethods()
                .Select(x => new
                {
                    methodName = x.Name,
                    Attributes = x.GetCustomAttributes()
                });

            var method = controller
                .GetMethods()
                .FirstOrDefault(x => x.GetCustomAttributes(true)
                .Any(attr => attr.GetType().Name.Equals($"Http{contex.Request.HttpMethod}Attribute",
                StringComparison.OrdinalIgnoreCase) && ((HttpMethodAttribute)attr).actionName.Equals(methodName, StringComparison.OrdinalIgnoreCase)));

            string[] strParams1 = new string[] { login, password };

            object[] queryParams = method  
                .GetParameters()
                .Select((p, i) => Convert.ChangeType(strParams1[i], p.ParameterType))
                .ToArray();

            var result = method.Invoke(Activator.CreateInstance(controller), queryParams);

            contex.Response.ContentType = "text/html";
            
            byte[] buffer = Encoding.UTF8.GetBytes((String)result);

            contex.Response.ContentLength64 = buffer.Length;
            using Stream output = contex.Response.OutputStream;

            output.Write(buffer, 0, buffer.Length);
            output.Flush();
        }
    }
}


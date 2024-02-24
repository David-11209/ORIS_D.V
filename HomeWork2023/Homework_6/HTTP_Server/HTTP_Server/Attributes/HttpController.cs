using System;
using HTTP_Server.Attributes;

namespace HTTP_Server.Attributes
{
	public class HttpController : Attribute
	{
		public string name { get; }

        public HttpController(string name)
        {
            this.name = name;
        }
    }
}


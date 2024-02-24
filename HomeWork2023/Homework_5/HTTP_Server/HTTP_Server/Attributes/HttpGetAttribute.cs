using System;
using HTTP_Server.Attributes;

namespace HTTP_Server.Attributes
{
	public class HttpGetAttribute: HttpMethodAttribute
    {
        public string actionName;

        public HttpGetAttribute(string actionName) : base(actionName)
		{
            this.actionName = actionName;
        }
    }
}


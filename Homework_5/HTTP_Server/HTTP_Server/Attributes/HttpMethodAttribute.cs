using System;
namespace HTTP_Server.Attributes
{
	public class HttpMethodAttribute: Attribute
	{
        public string actionName;

        public HttpMethodAttribute(string actionName)
		{
            this.actionName = actionName;

        }
    }
}


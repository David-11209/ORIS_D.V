using System;
using HTTP_Server.Attributes;

namespace HTTP_Server.Attributes
{
	public class HttpPostAttribute: HttpMethodAttribute
    {
		public string actionName;

		public HttpPostAttribute(string actionName) : base(actionName)
		{
			this.actionName = actionName;
		}
	}
}


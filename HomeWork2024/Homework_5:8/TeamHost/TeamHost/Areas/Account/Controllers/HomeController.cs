using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TeamHost.Web.Areas.Account.Controllers;

/// <summary>
/// Контроллер профиля пользователя
/// </summary>
[Area("Account")]
[Authorize]
public class HomeController : Controller
{
    
    public HomeController()
    {
        
    }
    
    public IActionResult Index()
    {
        return View();
    }
}
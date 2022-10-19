using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    // Using this as a base for other controllers

    [ApiController]

    /*  
        This is how you decide how your url call is going to look like
        The call will look like  /api/Activities    
    */ 

    [Route("api/[controller]")] 
    public class BaseApiController : ControllerBase
    {
            
    }
}
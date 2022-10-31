using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        /* Gets a list of activities */

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {

            return await Mediator.Send(new List.Query());

        }

        /*  
            Gives the user a id parameter
            Called a root parameter
        */

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {

            return await Mediator.Send(new Details.Query { Id = id });

        }
    }
}
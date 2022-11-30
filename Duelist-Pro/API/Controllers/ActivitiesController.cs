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
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken cancellationToken)
        {

            return await Mediator.Send(new List.Query(), cancellationToken);

        }

        /*  
            Gives the user a id parameter
            Called a root parameter
        */

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {

            // var activity = await Mediator.Send(new Details.Query { Id = id });

            // if (activity == null) return NotFound();

            // return activity;

            var result = await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);

        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;

            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }

    }
}
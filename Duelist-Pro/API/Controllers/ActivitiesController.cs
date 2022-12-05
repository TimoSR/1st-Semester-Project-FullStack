using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        /* Gets a list of activities */
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetActivities(CancellationToken cancellationToken)
        {

            var result = await Mediator.Send(new List.Query(), cancellationToken);

            return HandleResult(result);

        }

        /*  
            Gives the user a id parameter
            Called a root parameter
        */

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {

            var result = await Mediator.Send(new Details.Query { Id = id });

            return HandleResult(result);

        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var result = await Mediator.Send(new Create.Command { Activity = activity });

            return HandleResult(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;

            var result = await Mediator.Send(new Edit.Command { Activity = activity });

            return HandleResult(result);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var result = await Mediator.Send(new Delete.Command { Id = id });

            return HandleResult(result);
        }

    }
}
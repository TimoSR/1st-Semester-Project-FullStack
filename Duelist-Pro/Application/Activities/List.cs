using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class List
    {

        /*
            Returns list of activities
        */

        public class Query : IRequest<Result<List<Activity>>> { }

        /*
            Of Type Query and returns a list of activities
        */

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context, ILogger<List> logger)
            {

                this._logger = logger;

                this._context = context;

            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {

                /*
                    The CancellationToken is usefull for stopping requests, as without the server will still try to process the request
                    The query is not complex enough that we will need to utilize a cancellationToken
                    There we write a test scenario.
                */

                // try
                // {

                //     for (int i = 0; i < 10; i++)
                //     {
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000, cancellationToken);
                //         _logger.LogInformation($"Task {i} has completed");
                //     }

                // }
                // catch (Exception ex) when (ex is TaskCanceledException)
                // {
                //     _logger.LogInformation("Task was cancelled");
                // }

                /*
                    We send a request with the entity framework to the database
                */

                var activities = await _context.Activities.ToListAsync(cancellationToken);

                return Result<List<Activity>>.Success(activities);

            }
        }
    }
}
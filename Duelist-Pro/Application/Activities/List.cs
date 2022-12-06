using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
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

        public class Query : IRequest<Result<List<ActivityDto>>> { }

        /*
            Of Type Query and returns a list of activities
        */

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private IMapper _mapper { get; set; }

            public Handler(DataContext context, ILogger<List> logger, IMapper mapper)
            {
                this._mapper = mapper;

                this._logger = logger;

                this._context = context;

            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
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

                var activities = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .ToListAsync(cancellationToken);

                var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);

                return Result<List<ActivityDto>>.Success(activitiesToReturn);

            }
        }
    }
}
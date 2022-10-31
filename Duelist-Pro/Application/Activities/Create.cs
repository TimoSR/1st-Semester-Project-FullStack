using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {

            public Activity Activity { get; set; }

        }

        public class Handler : IRequestHandler<Command>
        {

            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            /*
            
                The Unit returned retunrs nothing. 
                It is there to signal the API controller that the command was finnished.

            */

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                /*
                    Signals the API controller that Task was finnished
                */

                return Unit.Value;
            }

        }

    }

}
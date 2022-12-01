using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {

            public Activity Activity { get; set; }

        }

        /* 
          The command validator can be seen as middleware between the Command and handler  
        */
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        /*
            We expect the command to return a result of the unit
        */
        public class Handler : IRequestHandler<Command, Result<Unit>>
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
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                /*
                    Signals the API controller that Task was finnished
                */
                return Result<Unit>.Success(Unit.Value);
            }

        }

    }

}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityDto>>
        {

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;

                _context = context;

            }

            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                /* This will send back null if it doesn't get an correct id = 204 No Content */
                // var activity = await _context.Activities.FindAsync(request.Id);

                var activity = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);


                // return Result<Activity>.Success(activity);

                return Result<ActivityDto>.Success(activity);

            }
        }
    }
}
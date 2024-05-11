using MediatR;
using TeamHost.Application.Features.Games.DTOs;

namespace TeamHost.Application.Features.Games.Queries
{
    public record GetAllGamesQuery : IRequest<List<GetAllGamesResponse>>;
}

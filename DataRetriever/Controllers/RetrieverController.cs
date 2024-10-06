using DataRetriever.Models;
using Microsoft.AspNetCore.Mvc;
using Recommendit.Models;
using Recommendit.Result;

namespace DataRetriever.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RetrieverController : ControllerBase
    {
        private readonly IShowsRetriever _showsRetriever;

        public RetrieverController(IShowsRetriever showsRetriever)
        {
            _showsRetriever = showsRetriever;
        }

        [HttpGet("insert")]
        public async Task<IResult> InsertRecords()
        {
            var responseResult = await _showsRetriever.AddShows();

            if (!responseResult.IsSuccess)
            {
                return Results.BadRequest(responseResult.Error);
            }

            return Results.NoContent();


        }

        [HttpGet("login")]
        public async Task<IResult> Login()
        {
            var result = await _showsRetriever.PostLogin();
            return Results.Ok(result);
        }
        
        
        



    }
}


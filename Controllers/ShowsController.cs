using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShowPulse.Models;
using System.Text.Json;
using System.Text;
using ShowPulse.Engine;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using ShowPulse.Services;

namespace ShowPulse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : ControllerBase
    {
        private readonly ShowContext _context;

        public ShowsController(ShowContext context)
        {
            _context = context;
        }

        // GET: api/Shows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Show>> GetShow(int id)
        {
            Show show = ShowService.GetShowById(_context,id);

            if (show == null)
            {
                return NotFound();
            }

            return show;
        }

        //GET: api/records
        [HttpGet("search/{input}")]
        //Returns an exact match of records found by name, otherwise returns any .Contains match.
        public ActionResult<IEnumerable<Show>> GetRecordsByInput(string input)
        {
            try
            {
                var exactmatchedRecords = _context.Shows.Where(s => s.Name == input)
                   .Select(s => new Show
                   {
                       Id = s.Id,
                       Name = s.Name,
                       Description = s.Description,
                       ImageUrl = s.ImageUrl,
                       ReleaseYear = s.ReleaseYear,
                       FinalEpisodeAired = s.FinalEpisodeAired,
                       Score = s.Score,
                       OriginalCountry = s.OriginalCountry,
                       OriginalLanguage = s.OriginalLanguage
                   }).ToList(); ;//exact match?

                List<Show> matchedRecords = _context.Shows.Where(s => s.Name.Contains(input))
                    .Take(10).Select(s => new Show
                    {
                        Id = s.Id,
                        Name = s.Name,
                        Description = s.Description,
                        ReleaseYear = s.ReleaseYear,
                        ImageUrl = s.ImageUrl
                    }).ToList();

                if (exactmatchedRecords.Count == 0)
                {
                    return Ok(matchedRecords);
                }
                return Ok(exactmatchedRecords);
            }
            catch (Exception ex)
            {
                 return StatusCode(500, "An error occurred while processing your request.");
            }
        }


        [HttpGet("suggest/{id1}/{id2}/{id3}")]
        // Uses cosine similarity to recommend shows based on user's preference.
        public async Task<IActionResult> GetRecommendedShows(int id1, int id2, int id3)
        {
            List<int> userShowIds = new List<int> { id1, id2, id3 };
            List<double[]> userShowsVectors = new List<double[]>();
            for (int i = 0; i < userShowIds.Count; i++)
            {
                double[] showVector = ShowService.GetVectorById(_context,userShowIds[i]);
                if (showVector != null)
                {
                    userShowsVectors.Add(showVector);
                }
            }

            List<ShowInfo> allShows = ShowService.GetShowInfos(_context);
           

            if(allShows != null){
                double[] averageVector = VectorEngine.CalculateAverageVector(userShowsVectors);
                List<int> recommendedShowIds = await VectorEngine.GetSimilarities(allShows,averageVector,8);
               return Ok(recommendedShowIds);
            }
            else
            {
                return NotFound("Not shows found for the specified IDs.");
            }
        }

    
    }
}

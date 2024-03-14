﻿using System;
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
            var show = await _context.Shows.FindAsync(id);

            if (show == null)
            {
                return NotFound();
            }

            return show;
        }

        //GET: api/records
        [HttpGet("search/{input}")]
        //Return records that match the spefic input (NAME)
        public async Task<ActionResult<IEnumerable<Show>>> GetRecordsByInput(string input)
        {
            var exactmatchedRecords =  _context.Shows.Where(s => s.Name == input).Select(s => new Show { Id = s.Id, Name = s.Name, Description = s.Description, ImageUrl = s.ImageUrl, ReleaseYear = s.ReleaseYear, FinalEpisodeAired = s.FinalEpisodeAired, Score = s.Score, OriginalCountry = s.OriginalCountry, OriginalLanguage = s.OriginalLanguage }).ToList(); ;//exact match?

            List<Show> matchedRecords = _context.Shows.Where(s => s.Name.Contains(input)).OrderByDescending(s => s.Name.StartsWith(input)).ThenByDescending(s => s.Name.IndexOf(input)).Take(10).Select(s => new Show { Id = s.Id, Name = s.Name, Description = s.Description, ImageUrl = s.ImageUrl, ReleaseYear = s.ReleaseYear, FinalEpisodeAired = s.FinalEpisodeAired, Score = s.Score, OriginalCountry = s.OriginalCountry, OriginalLanguage = s.OriginalLanguage }).ToList();
            
            if(exactmatchedRecords.Count == 0)
            {
                return matchedRecords;
            }
            return exactmatchedRecords;
        }


        [HttpGet("suggest/{id1}/{id2}/{id3}")]
        public async Task<List<int>> GetRecomendedShows(int id1, int id2, int id3)
        {
            List<int> showIds = new List<int>() { id1, id2, id3 };

            var vectorDoublesQuery =  _context.Shows
                .Where(s => showIds.Contains(s.Id))
                .Select(s => s.VectorDouble);

            List<double[]> vectorDoubles = await vectorDoublesQuery.ToListAsync();
            if (vectorDoubles != null )
            {
                double[] averageVector = VectorEngine.CalculateAverageVector(vectorDoubles);
                var allShowsQuery = _context.Shows
                    .Select(s => new ShowInfo { Id = s.Id, VectorDouble = s.VectorDouble });

                List<ShowInfo> allShows = await allShowsQuery.ToListAsync();
                List<int> recomendedShowIds = VectorEngine.GetSimilarities(allShows, averageVector, 8);
                return recomendedShowIds;
            }
            else
            {
                return [id1,id2,id3];
            }
        }

        private bool ShowExists(int id)
        {
            return _context.Shows.Any(e => e.Id == id);
        }
    }
}

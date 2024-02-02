using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ShowPulse.Models;

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

        // GET: api/Shows
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Show>>> GetShows()
        {
            return await _context.Shows.ToListAsync();
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

        // PUT: api/Shows/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShow(int id, Show show)
        {
            if (id != show.Id)
            {
                return BadRequest();
            }

            _context.Entry(show).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShowExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpGet("vector/{id}")]
        public async Task<IActionResult> GetShowVector(int id)
        {
            var show = await GetShow(id);
            if (show == null)
            {
                return NotFound();
            }

            var vector = await GetVectorFromFlaskApi(show.Value.Description);

            if(vector!= null)
            {
                return Ok(vector);
            }
            else
            {
                return StatusCode(500, "Error getting the vector from the api");
            }
        }


        private async Task <string?>GetVectorFromFlaskApi(string Description)
        {
            string flaskApiUrl = "http://localhost:5000/get_vector";
            var payload = new { description = Description};
            using (HttpClient client = new HttpClient())
            {
                var json = JsonConvert.SerializeObject(payload);
                var jsonContent = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsJsonAsync(flaskApiUrl, jsonContent);
                string responseMessage = await response.Content.ReadAsStringAsync();
                //var vector = JsonConvert.DeserializeObject<double[]>(responseMessage);
                return responseMessage;
            }
        }

        // POST: api/Shows
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Show>> PostShow(Show show)
        {
            _context.Shows.Add(show);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShow", new { id = show.Id }, show);
        }

        // DELETE: api/Shows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShow(int id)
        {
            var show = await _context.Shows.FindAsync(id);
            if (show == null)
            {
                return NotFound();
            }

            _context.Shows.Remove(show);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShowExists(int id)
        {
            return _context.Shows.Any(e => e.Id == id);
        }
    }
}

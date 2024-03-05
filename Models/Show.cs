using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ShowPulse.Models
    {
    public class Show
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime? FinalEpisodeAired { get; set; }
        public int? Score { get; set; }
        public string? Status { get; set; }
        public string? OriginalCountry { get; set; }
        public string? OriginalLanguage { get; set; }
        public double[]? VectorDouble { get; set; }
        public int? ReleaseYear { get; set; }
       
     

    }
}

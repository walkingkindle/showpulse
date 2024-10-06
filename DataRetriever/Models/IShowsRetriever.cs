using Recommendit.Result;
using ShowPulse.Models;

namespace DataRetriever.Models;

public interface IShowsRetriever
{
    
    Task<Result> AddShows();
    
    Task<string?> PostLogin();


}
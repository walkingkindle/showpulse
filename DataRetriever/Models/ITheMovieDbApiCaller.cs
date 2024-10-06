using Recommendit.Result;

namespace DataRetriever.Models;

public interface ITheMovieDbApiCaller
{
    Task<Result<List<ShowDataDto>>> GetApiResponse(string bearerToken, string pageNumber);
    
    Task<string?> PostLogin(string apiKey, string apiUrl);

}
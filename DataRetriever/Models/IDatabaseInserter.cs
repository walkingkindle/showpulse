using Recommendit.Result;
using ShowPulse.Models;

namespace DataRetriever.Models;

public interface IDatabaseInserter
{

    Task<Result> BulkAddShowsToDatabase(List<Show> shows);


}
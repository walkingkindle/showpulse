using DataRetriever.Models;
using ShowPulse.Models;
using EFCore.BulkExtensions;
using Recommendit.Result;

namespace DataRetriever.Services;

public class DatabaseInserter:IDatabaseInserter
{
    private readonly ShowContext _context;
    private readonly ILogger<DatabaseInserter> _logger;
    public DatabaseInserter(ShowContext context,ILogger<DatabaseInserter> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public async Task<Result> BulkAddShowsToDatabase(List<Show> shows)
    {
        try
        {
            await _context.BulkInsertAsync(shows);

            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);

            return Result.Failure(DatabaseErrors.DatabaseInsertError);

        }

        return Result.Success();
    }
}

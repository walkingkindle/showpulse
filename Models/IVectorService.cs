using ShowPulse.Models;

namespace Recommendit.Models;

public interface IVectorService
{
    public double[] CalculateAverageVector(List<double[]?> vectors);
    

    public Task<List<int>> GetSimilarities(IEnumerable<ShowInfo> allShows, double[] userAverageVector, int topN);
}
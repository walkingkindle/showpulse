using ShowPulse.Models;
using Microsoft.EntityFrameworkCore;

namespace ShowPulse.Services;

public class ShowService
{


    public static readonly Func<ShowContext, int, Show?> GetShowById =
        EF.CompileQuery(
            (ShowContext context, int id) => context.Set<Show>().FirstOrDefault(c => c.Id == id));

    public static readonly Func<ShowContext, int, double[]?> GetVectorById =
        EF.CompileQuery(
            (ShowContext context, int id) =>
                context.Set<Show>()
                    .Where(c => c.Id == id)
                    .Select(c => c.VectorDouble)
                    .FirstOrDefault());

    public static readonly Func<ShowContext, IEnumerable<ShowInfo>> GetAllShows =
        EF.CompileQuery(
            (ShowContext context) =>
                context.Shows.Select(s => new ShowInfo
                {
                    Id = s.Id,
                    VectorDouble = s.VectorDouble
                }));

    public static List<ShowInfo> GetShowInfos(ShowContext context)
    {
        var showInfos = GetAllShows(context).ToList();
        return showInfos;
    }
}
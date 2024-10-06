namespace ShowPulse.Models
{
    public class ShowInfo
        //ShowInfo object used for retrieving Show objects that are compared by cosine similarity
    {
        public int Id { get; set; }
        public double[]? VectorDouble { get; set; }
        
        public int ShowId { get; set; }
        
        public Show Show { get; set; }
    }
}

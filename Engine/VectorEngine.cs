using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ShowPulse.Models;
using System.Collections.Generic;

namespace ShowPulse.Engine
{
    public class VectorEngine
    {

        public class VectorObject
        {
            [JsonProperty("vector")]
            public List<double> Vector { get; set; }
        }
        public static List<double> ParseOutputToDoubles(string output)
        {
            string[] jsonStrings = output.Trim().Split('\n');
            List<double> doublesList = new List<double>();
            foreach (string jsonString in jsonStrings)
            {
                VectorObject? vectorObject = JsonConvert.DeserializeObject<VectorObject>(jsonString);
                doublesList.AddRange(vectorObject.Vector);
            }
            return doublesList;
        }

        public static double[] CalculateAverageVector(List<double[]> vectors)
        {
            if (vectors == null || vectors.Count == 0 || vectors.Any(v => v == null || v.Length == 0))
            {
                throw new ArgumentException("Invalid input vectors.");
            }

            int vectorLength = vectors[0].Length;
            double[] averageVector = new double[vectorLength];
            int count = 0;

            foreach (var vector in vectors)
            {
                if (vector.Length != vectorLength)
                {
                    throw new ArgumentException("All vectors must have the same length");
                }

                for (int i = 0; i < vectorLength; i++)
                {
                    averageVector[i] += vector[i];
                }
                count++;
            }

            for (int i = 0; i < vectorLength; i++)
            {
                averageVector[i] /= count;
            }

            return averageVector;
        }
        public static double CalculateCosineSimilarity(double[] vectorA, double[] vectorB)
        {
            // Calculate dot product
            double dotProduct = 0;
            for (int i = 0; i < vectorA.Length; i++)
            {
                dotProduct += vectorA[i] * vectorB[i];
            }

            // Calculate magnitudes
            double magnitudeA = Math.Sqrt(vectorA.Sum(x => x * x));
            double magnitudeB = Math.Sqrt(vectorB.Sum(x => x * x));

            // Calculate cosine similarity
            if (magnitudeA > 0 && magnitudeB > 0)
            {
                return dotProduct / (magnitudeA * magnitudeB);
            }
            else
            {
                return 0; // Default similarity when one of the vectors is a zero vector
            }
        }
        public static List<int>  GetSimilarities(List<Show> allShows, double[] userAverageVector, int topN)
        {
            Dictionary<int, double> similarities = new Dictionary<int, double>();
            foreach(var show in allShows)
            {
                if (show.VectorDouble != null)
                {
                    double similarity = CalculateCosineSimilarity(userAverageVector, show.VectorDouble);
                    similarities.Add(show.Id, similarity);
                        
                }
            }
            var sortedSimilarities = similarities.OrderByDescending(kv => kv.Value);
            var topShows = sortedSimilarities.Take(topN);
            return topShows.Select(kv => kv.Key).ToList();
        }

    }
}

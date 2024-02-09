using Newtonsoft.Json;
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
            // Split the output by newline character to get individual JSON strings
            string[] jsonStrings = output.Trim().Split('\n');
            // Initialize an empty list to store the doubles
            List<double> doublesList = new List<double>();
            // Iterate over each JSON string
            foreach (string jsonString in jsonStrings)
            {
                // Deserialize the JSON string to extract the "vector" field
                VectorObject vectorObject = JsonConvert.DeserializeObject<VectorObject>(jsonString);
                // Add the vector values to the doubles list
                doublesList.AddRange(vectorObject.Vector);
            }
            return doublesList;
        }

        public static double[] CalculateAverageVector(List<List<double>> vectors)
        {
            if(vectors == null || vectors.Count == 0 || vectors.Any(v => v == null || v.Count == 0))
            {
                throw new ArgumentException("Invalid input vectors.");
            }
            int vectorLength = vectors.First().Count;

            double[] averageVector = new double[vectorLength];
            int count = 0;

            foreach(var vector in vectors)
            {
                if(vector.Count != vectorLength)
                {
                    throw new ArgumentException("All vectors must have the same length");
                }
                for (int i = 0; i< vectorLength; i++)
                {
                    averageVector[i] += vector[i];

                }
                count++;
            }
            for (int i = 0; i< vectorLength; i++)
            {
                averageVector[i] /= count;
            }
            return averageVector;
        }
        }
    }

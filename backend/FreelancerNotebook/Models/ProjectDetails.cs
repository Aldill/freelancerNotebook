using MongoDB.Bson.Serialization.Attributes;

namespace FreelancerNotebook.Models
{
    public class ProjectDetails
    {
   
        [BsonElement("Title")]
        public string Title { get; set; } = null!;
        [BsonElement("TotalMinutes")]
        public int TotalMinutes { get; set; }
        [BsonElement("TotalEarned")]
        public double TotalEarned { get; set; }
    }
}

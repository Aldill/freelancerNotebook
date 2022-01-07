using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FreelancerNotebook.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id {get;set;}
        [BsonElement("Title")]
        public string Title { get; set; } = null!;
        [BsonElement("Description")]
        public string Description { get; set; } = null!;
        [BsonElement("Date")]
        public DateTime Date { get; set; }
        [BsonElement("Deadline")]
        public DateTime Deadline { get; set; }
        [BsonElement("ClientId")]
        public string ClientId {get;set;} = null!;
        [BsonElement("UserId")]
        public string UserId { get; set; } = null!;


    }

    public class ProjectDTO
    {
       
        [BsonElement("Title")]
        public string Title { get; set; } = null!;
        [BsonElement("Description")]
        public string Description { get; set; } = null!;
        [BsonElement("Date")]
        public DateTime Date { get; set; }
        [BsonElement("Deadline")]
        public DateTime Deadline { get; set; }
        [BsonElement("ClientId")]
        public string ClientId { get; set; } = null!;
        
    }


}
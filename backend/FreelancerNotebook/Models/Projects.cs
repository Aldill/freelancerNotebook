using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FreelancerNotebook.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get;set;} = null!;
        [BsonElement("Title")]
        public string Title { get; set; } = null!;
        [BsonElement("Description")]
        public string Description { get; set; } = null!;
        [BsonElement("Date")]
        public DateTime Date { get; set; }
        [BsonElement("Deadline")]
        public DateTime Deadline { get; set; }
        [BsonElement("DefaultRate")]
        public double DefaultRate {get;set;}
        [BsonElement("CilentId")]
        public int CilentId {get;set;}
        [BsonElement("UserId")]
        public int UserId {get;set;}
       
    }    
    
    
}
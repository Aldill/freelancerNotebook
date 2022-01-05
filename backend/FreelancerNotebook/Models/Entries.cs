using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FreelancerNotebook.Models
{
    public class Entry
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get;set;} = null!;
        [BsonElement("ProjectId")]
        public int ProjectId {get;set;} 
        [BsonElement("StartDate")]
        public DateTime StartDate { get; set; } 
        [BsonElement("Fee")]
        public double Fee {get;set;}
        [BsonElement("IsFlatFee")]
        public bool IsFlatFee { get; set; }
        [BsonElement("EndDate")]
        public DateTime EndDate { get; set; } 
        [BsonElement("Description")]
        public string Description { get; set; } = null!;
    }    
    
    
}
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoProj.Models
{
    public class Entry
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id {get;set;}
        public int projectId {get;set;}
        public BsonDateTime startDate { get; set; } 
        public double fee {get;set;}
        public bool isFlatFee { get; set; }   
        public BsonDateTime endDate { get; set; } 
        [BsonElement("Description")]
        public string description { get; set; } 
    }    
    
    
}
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoProj.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id {get;set;}
        [BsonElement("Title")]
        public string title { get; set; }
        [BsonElement("Description")]
        public string description { get; set; }        
        public BsonDateTime date { get; set; }   
        public BsonDateTime deadline { get; set; }   
       
        public double defaultRate {get;set;}
        public int cilentId {get;set;}
        public int user {get;set;}
       
    }    
    
    
}
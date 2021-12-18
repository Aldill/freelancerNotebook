using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoProj.Models
{
    public class Client
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id {get;set;}
        [BsonElement("Name")]
        public string name{get;set;}
     
        public string mail { get; set; }        
       
    }    
    
    
}
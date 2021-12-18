using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FreelancerNotebook.Models
{
    public class User
    {    
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id {get;set;}
        public string mail { get; set; }
        public bool isAdmin { get; set; }   
       
        [BsonElement("Username")]
        public string username{get;set;}
        [BsonElement("Password")]
        public string password { get; set; }
    }    
    
    
}
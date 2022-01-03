using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FreelancerNotebook.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get;set;}
        [BsonElement("Mail")]
        public string Mail { get; set; } = null!;
        [BsonElement("IsAdmin")]
        public bool IsAdmin { get; set; }   
       
        [BsonElement("Username")]
        public string Username{get;set;} = null!;
        [BsonElement("Password")]
        public string Password { get; set; } = null!;
    }    
    
    public class AuthenticateUser
    {
        [BsonElement("Username")]
        public string Username { get; set; } = null!;
        [BsonElement("Password")]
        public string Password { get; set; } = null!;
    }
    
}
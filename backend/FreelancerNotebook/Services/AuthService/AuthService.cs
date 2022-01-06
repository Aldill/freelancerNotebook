using FreelancerNotebook.Models;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FreelancerNotebook.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<User> _users;
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetSection("DatabaseSettings:ConnectionString").Value);
            var database = client.GetDatabase(configuration.GetSection("DatabaseSettings:DatabaseName").Value);
            _users = database.GetCollection<User>(configuration.GetSection("DatabaseSettings:UsersCollectionName").Value);
            _configuration = configuration;

        }
        public string CreateToken(User user)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier , user.Id)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("JWT").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddSeconds(15),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }

        public string? Authenticate(string username, string password)
        {
            var user = _users.Find(user => user.Username == username && user.Password == password).FirstOrDefault();
            if (user == null)
            {
                return null;
            }

            string token = CreateToken(user);

            return token;

        }
    }
}

using FreelancerNotebook.Models;

namespace FreelancerNotebook.Services.AuthService
{
    public interface IAuthService
    {
         string CreateToken(User user);
         string? Authenticate(string username, string password);

    }
}

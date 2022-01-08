using FreelancerNotebook.Models;

namespace FreelancerNotebook.Services.UserService
{
    public interface IUserService
    {
        List<User> Get();
        User Get(string id);

        User GetbyUsername(string username);

        User GetbyMail(string mail);

        User Create(User user);

        void Update(string id, User user);

        void Remove(string id);

        string getUserId();
    }
}

using FreelancerNotebook.Models;

namespace FreelancerNotebook.Services.ProjectService
{
    public interface IProjectService
    {
        List<Project> GetbyUser(string uId);
        Project Get(string id);

        Project Create(Project project);

        void Update(string id, Project project);

        void Remove(string id);
    }
}

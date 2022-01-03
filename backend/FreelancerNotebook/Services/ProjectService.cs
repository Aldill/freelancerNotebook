using FreelancerNotebook.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace FreelancerNotebook.Services
{
    public class ProjectService
    {
        private readonly IMongoCollection<Project> _projects;

        public ProjectService(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _projects = database.GetCollection<Project>(settings.Value.ProjectsCollectionName);
        }

        public List<Project> Get() =>
            _projects.Find(project => true).ToList();

        public Project Get(string id) =>
            _projects.Find<Project>(project => project.id == id).FirstOrDefault();

        public Project Create(Project project)
        {
            _projects.InsertOne(project);
            return project;
        }

        public void Update(string id, Project projectIn) =>
            _projects.ReplaceOne(project => project.id == id, projectIn);

        public void Remove(Project projectIn) =>
            _projects.DeleteOne(project => project.id == projectIn.id);

        public void Remove(string id) => 
            _projects.DeleteOne(project => project.id == id);
    }
}
using FreelancerNotebook.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace FreelancerNotebook.Services.ProjectService
{
    public class ProjectService: IProjectService
    {
        private readonly IMongoCollection<Project> _projects;
        private readonly IConfiguration _configuration;

        public ProjectService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetSection("DatabaseSettings:ConnectionString").Value);
            var database = client.GetDatabase(configuration.GetSection("DatabaseSettings:DatabaseName").Value);

            _projects = database.GetCollection<Project>(configuration.GetSection("DatabaseSettings:ProjectsCollectionName").Value);
            _configuration = configuration;
        }

        public List<Project> Get() =>
            _projects.Find(project => true).ToList();

        public Project Get(string id) =>
            _projects.Find<Project>(project => project.Id == id).FirstOrDefault();

        public Project Create(Project project)
        {
            _projects.InsertOne(project);
            return project;
        }

        public void Update(string id, Project projectIn) =>
            _projects.ReplaceOne(project => project.Id == id, projectIn);

        public void Remove(Project projectIn) =>
            _projects.DeleteOne(project => project.Id == projectIn.Id);

        public void Remove(string id) => 
            _projects.DeleteOne(project => project.Id == id);
    }
}
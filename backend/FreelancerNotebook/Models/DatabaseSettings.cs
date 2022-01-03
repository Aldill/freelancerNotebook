namespace FreelancerNotebook.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string? UsersCollectionName { get; set; }
        public string? ProjectsCollectionName { get; set; }
        public string? EntriesCollectionName { get; set; }
        public string? ClientCollectionName { get; set; }
        public string? ConnectionString { get; set; }
        public string? DatabaseName { get; set; }
    }

    public interface IDatabaseSettings
    {
        string UsersCollectionName { get; set; }
        string ProjectsCollectionName { get; set; }
        string EntriesCollectionName { get; set; }
        string ClientCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
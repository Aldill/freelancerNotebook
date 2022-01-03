namespace FreelancerNotebook.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string UsersCollectionName { get; set; } = null!;
        public string ProjectsCollectionName { get; set; } = null!;
        public string EntriesCollectionName { get; set; } = null!;
        public string ClientCollectionName { get; set; } = null!;
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
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
using FreelancerNotebook.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FreelancerNotebook.Services.EntryService
{
    public class EntryService : IEntryService
    {
        private readonly IMongoCollection<Entry> _entries;
        private readonly IConfiguration _configuration;

        public EntryService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetSection("DatabaseSettings:ConnectionString").Value);
            var database = client.GetDatabase(configuration.GetSection("DatabaseSettings:DatabaseName").Value);

            _entries = database.GetCollection<Entry>(configuration.GetSection("DatabaseSettings:EntriesCollectionName").Value);
            _configuration = configuration;
        }

        public List<Entry> GetbyProject(string pId) =>
            _entries.Find(entry => entry.ProjectId == pId).ToList();

        public Entry Get(string id) =>
            _entries.Find<Entry>(entry => entry.Id == id).FirstOrDefault();

        public Entry Create(Entry entry)
        {
            _entries.InsertOne(entry);
            return entry;
        }

        public void Update(string id, Entry entryIn) =>
            _entries.ReplaceOne(entry => entry.Id == id, entryIn);

        public void Remove(Entry entryIn) =>
            _entries.DeleteOne(entry => entry.Id == entryIn.Id);

        public void Remove(string id) => 
            _entries.DeleteOne(entry => entry.Id == id);
    }
}
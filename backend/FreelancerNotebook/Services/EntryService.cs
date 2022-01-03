using FreelancerNotebook.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace FreelancerNotebook.Services
{
    public class EntryService
    {
        private readonly IMongoCollection<Entry> _entries;

        public EntryService(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _entries = database.GetCollection<Entry>(settings.Value.EntriesCollectionName);
        }

        public List<Entry> Get() =>
            _entries.Find(entry => true).ToList();

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
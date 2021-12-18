using FreelancerNotebook.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace FreelancerNotebook.Services
{
    public class EntryService
    {
        private readonly IMongoCollection<Entry> _entries;

        public EntryService(IMongoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _entries = database.GetCollection<Entry>(settings.EntriesCollectionName);
        }

        public List<Entry> Get() =>
            _entries.Find(entry => true).ToList();

        public Entry Get(string id) =>
            _entries.Find<Entry>(entry => entry.id == id).FirstOrDefault();

        public Entry Create(Entry entry)
        {
            _entries.InsertOne(entry);
            return entry;
        }

        public void Update(string id, Entry entryIn) =>
            _entries.ReplaceOne(entry => entry.id == id, entryIn);

        public void Remove(Entry entryIn) =>
            _entries.DeleteOne(entry => entry.id == entryIn.id);

        public void Remove(string id) => 
            _entries.DeleteOne(entry => entry.id == id);
    }
}
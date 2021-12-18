using FreelancerNotebook.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace FreelancerNotebook.Services
{
    public class ClientService
    {
        private readonly IMongoCollection<Client> _client;

        public ClientService(IMongoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _client = database.GetCollection<Client>(settings.ClientCollectionName);
        }

        public List<Client> Get() =>
            _client.Find(client => true).ToList();

        public Client Get(string id) =>
            _client.Find<Client>(client => client.id == id).FirstOrDefault();

        public Client Create(Client client)
        {
            _client.InsertOne(client);
            return client;
        }

        public void Update(string id, Client clientIn) =>
            _client.ReplaceOne(client => client.id == id, clientIn);

        public void Remove(Client clientIn) =>
            _client.DeleteOne(client => client.id == clientIn.id);

        public void Remove(string id) => 
            _client.DeleteOne(client => client.id == id);
    }
}
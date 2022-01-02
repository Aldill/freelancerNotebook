using FreelancerNotebook.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FreelancerNotebook.Services
{
    public class ClientService : IClientService
    {
        private readonly IMongoCollection<Client> _client;

       
        public ClientService(IOptions<DatabaseSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);

            _client = database.GetCollection<Client>(settings.Value.ClientCollectionName);
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

    public interface IClientService
    {
        List<Client> Get();
        Client Get(string id);

        Client Create(Client client);

        void Update(string id, Client client);

        void Remove(string id);

    }
}
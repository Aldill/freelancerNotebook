using FreelancerNotebook.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace FreelancerNotebook.Services.ClientService
{
    public class ClientService : IClientService
    {
        private readonly IMongoCollection<Client> _client;

       
        public ClientService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration.GetSection("DatabaseSettings:ConnectionString").Value);
            var database = client.GetDatabase(configuration.GetSection("DatabaseSettings:DatabaseName").Value);
            _client = database.GetCollection<Client>(configuration.GetSection("DatabaseSettings:ClientCollectionName").Value);
        }

        public List<Client> Get() =>
            _client.Find(client => true).ToList();

        public Client Get(string id) =>
            _client.Find<Client>(client => client.Id == id).FirstOrDefault();

        public Client Create(Client client)
        {
            _client.InsertOne(client);
            return client;
        }

        public void Update(string id, Client clientIn) =>
            _client.ReplaceOne(client => client.Id == id, clientIn);

        public void Remove(Client clientIn) =>
            _client.DeleteOne(client => client.Id == clientIn.Id);

        public void Remove(string id) => 
            _client.DeleteOne(client => client.Id == id);
    }
}
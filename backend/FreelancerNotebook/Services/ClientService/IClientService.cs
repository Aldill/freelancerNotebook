using FreelancerNotebook.Models;

namespace FreelancerNotebook.Services.ClientService
{
    public interface IClientService
    {
        List<Client> Get();
        Client Get(string id);

        Client Create(Client client);

        void Update(string id, Client client);

        void Remove(string id);

    }
}

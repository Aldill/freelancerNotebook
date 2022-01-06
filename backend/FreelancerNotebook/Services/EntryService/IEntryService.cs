using FreelancerNotebook.Models;

namespace FreelancerNotebook.Services.EntryService
{
    public interface IEntryService
    {
        List<Entry> Get();
        Entry Get(string id);

        Entry Create(Entry client);

        void Update(string id, Entry entry);

        void Remove(string id);
    }
}

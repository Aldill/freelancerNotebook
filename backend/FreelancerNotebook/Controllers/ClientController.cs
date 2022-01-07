using FreelancerNotebook.Models;
using FreelancerNotebook.Services.ClientService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FreelancerNotebook.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public ActionResult<List<Client>> Get()
        {
            var clients = _clientService.Get();

            return Ok( new Response<Client>(clients, "success"));
        }
            

        [HttpGet("{id:length(24)}", Name = "GetClient")]
        public ActionResult<Client> Get(string id)
        {
            var client = _clientService.Get(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(new Response<Client>(new List<Client> { client }, "success"));
        }

        [HttpPost]
        public ActionResult<Client> Create(Client client)
        {
            var data = _clientService.Create(client);

            return CreatedAtRoute("GetClient", new { id = client.Id.ToString() }, new Response<Client>(new List<Client> { data }, "success"));
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Client clientIn)
        {
            var client = _clientService.Get(id);

            if (client == null)
            {
                return NotFound();
            }

            _clientService.Update(id, clientIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var client = _clientService.Get(id);

            if (client == null)
            {
                return NotFound();
            }

            _clientService.Remove(client.Id);

            return NoContent();
        }
    }
}
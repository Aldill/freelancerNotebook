using FreelancerNotebook.Models;
using FreelancerNotebook.Services;
using FreelancerNotebook.Services.EntryService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FreelancerNotebook.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class EntriesController : ControllerBase
    {
        private readonly IEntryService _entryService;

        public EntriesController(IEntryService entryService)
        {
            _entryService = entryService;
        }

        [HttpGet]
        public ActionResult<List<Entry>> Get() =>
            _entryService.Get();

        [HttpGet("{id:length(24)}", Name = "GetEntry")]
        public ActionResult<Entry> Get(string id)
        {
            var entry = _entryService.Get(id);

            if (entry == null)
            {
                return NotFound();
            }

            return entry;
        }

        [HttpPost]
        public ActionResult<Entry> Create(Entry entry)
        {
            _entryService.Create(entry);

            return CreatedAtRoute("GetEntry", new { id = entry.Id.ToString() }, entry);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Entry entryIn)
        {
            var entry = _entryService.Get(id);

            if (entry == null)
            {
                return NotFound();
            }

            _entryService.Update(id, entryIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var entry = _entryService.Get(id);

            if (entry == null)
            {
                return NotFound();
            }

            _entryService.Remove(entry.Id);

            return NoContent();
        }
    }
}
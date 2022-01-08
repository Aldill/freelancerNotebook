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

        [HttpGet("project/{id:length(24)}")]
        public ActionResult<List<Entry>> GetbyProject(string id)
        {
            var entries = _entryService.GetbyProject(id);

            return Ok(new Response<List<Entry>>(entries, "success"));

        }
            

        [HttpGet("{id:length(24)}", Name = "GetEntry")]
        public ActionResult<Entry> Get(string id)
        {
            var entry = _entryService.Get(id);

            if (entry == null)
            {
                return NotFound();
            }

            return Ok(new Response<Entry>( entry, "success"));
        }

        [HttpPost]
        public ActionResult<Entry> Create(Entry entry)
        {
            var data = _entryService.Create(entry);

            return CreatedAtRoute("GetEntry", new { id = entry.Id.ToString() }, new Response<Entry>(data , "success"));
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

        [HttpDelete("project/{id:length(24)}")]
        public IActionResult DeletebyProject(string pId)
        {
            var entries = _entryService.GetbyProject(pId);

            if (entries == null)
            {
                return NotFound();
            }
            foreach(Entry x in entries)
            {
                _entryService.Remove(x.Id);
            }
            
            return NoContent();
        }
    }
}
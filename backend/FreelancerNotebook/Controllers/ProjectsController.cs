using FreelancerNotebook.Models;
using FreelancerNotebook.Services;
using FreelancerNotebook.Services.ProjectService;
using FreelancerNotebook.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace FreelancerNotebook.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly IUserService userService;

        public ProjectsController(IProjectService projectService, IUserService userService)
        {
            _projectService = projectService;
            this.userService = userService;
        }

        [HttpGet]
        public ActionResult<List<Project>> GetbyUser()
        {
            var userId = userService.getUserId();
            var projects = _projectService.GetbyUser(userId);

            return Ok(new Response<Project>(projects, "success"));
        }
            

        [HttpGet("{id:length(24)}/details", Name = "GetProject")]
        public ActionResult<Project> Get(string id)
        {
            var project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(new Response<Project>(new List<Project> { project}, "success"));
        }

        [HttpPost]
        public ActionResult<Project> Create(Project project)
        {
            _projectService.Create(project);

            return CreatedAtRoute("GetProject", new { id = project.Id.ToString() }, new Response<Project>(new List<Project> { project}, "success"));
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Project projectIn)
        {
            var project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound();
            }

            _projectService.Update(id, projectIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound();
            }

            _projectService.Remove(project.Id);

            return NoContent();
        }

        [HttpDelete("user/{id:length(24)}")]
        public IActionResult DeletebyUser(string uId)
        {
            var projects = _projectService.GetbyUser(uId);

            if (projects == null)
            {
                return NotFound();
            }
            foreach(Project x in projects)
            {
                _projectService.Remove(x.Id);
            }
            

            return NoContent();
        }
    }
}
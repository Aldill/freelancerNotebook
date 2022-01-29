using FreelancerNotebook.Models;
using FreelancerNotebook.Services;
using FreelancerNotebook.Services.EntryService;
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
        private readonly IEntryService entriesService;

        public ProjectsController(IProjectService projectService, IUserService userService, IEntryService entriesService)
        {
            _projectService = projectService;
            this.userService = userService;
            this.entriesService = entriesService;
        }

        [HttpGet]
        public ActionResult<List<Project>> GetbyUser()
        {
            var userId = userService.getUserId();
            var projects = _projectService.GetbyUser(userId);

            return Ok(new Response<List<Project>>(projects, "success"));
        }
            

        [HttpGet("{id:length(24)}")]
        public ActionResult<Project> Get(string id)
        {
            var project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(new Response<Project>(project, "success"));
        }

        [HttpGet("{id:length(24)}/details")]
        public ActionResult<Project> GetDetails(string id)
        {
            var project = _projectService.Get(id);

            if (project == null)
            {
                return NotFound();
            }

            var entries = entriesService.GetbyProject(project.Id);

            if(entries == null)
            {
                return NotFound();
            }

            var totalMinutes = (int)entries.Sum(entry =>
            {
                return (entry.EndDate - entry.StartDate).TotalMinutes;
            });

            double totalEarned = entries.Sum(entry =>
            {
                if (entry.IsFlatFee)
                {
                    return entry.Fee;
                }
                return (entry.EndDate - entry.StartDate).TotalHours * entry.Fee;
            });


            return Ok(new Response<ProjectDetails>(new ProjectDetails {Title = project.Title, TotalEarned = totalEarned, TotalMinutes = totalMinutes }, "success"));
        }

        [HttpPost]
        public ActionResult<Project> Create(ProjectDTO project)
        {
            var userId = userService.getUserId();
            var newProject = _projectService.Create(new Project { UserId = userId.ToString(), ClientId = project.ClientId, Date = project.Date, Deadline = project.Deadline,  Description = project.Description, Title=project.Title});

            if(newProject == null)
            {
                return BadRequest(); 
            }

            return CreatedAtRoute("GetProject", new { id = newProject.Id.ToString() }, new Response<Project>( newProject , "success"));
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

        [HttpDelete("user")]
        public IActionResult DeletebyUser()
        {
            var userId = userService.getUserId();
            var projects = _projectService.GetbyUser(userId);

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
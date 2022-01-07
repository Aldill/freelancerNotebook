using FreelancerNotebook.Models;
using FreelancerNotebook.Services;
using FreelancerNotebook.Services.AuthService;
using FreelancerNotebook.Services.ClientService;
using FreelancerNotebook.Services.EntryService;
using FreelancerNotebook.Services.ProjectService;
using FreelancerNotebook.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEntryService, EntryService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors();


builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard ATUH header bearer before token",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

// auth

builder.Services.AddAuthentication(
   JwtBearerDefaults.AuthenticationScheme
).AddJwtBearer(x => 
{ 
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JWT").Value)),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero,
    };
}
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x
   .AllowAnyMethod()
   .AllowAnyHeader()
   .SetIsOriginAllowed(origin => true) // allow any origin
   .AllowCredentials() // allow credentials);
   );

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

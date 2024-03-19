using Microsoft.EntityFrameworkCore;
using ShowPulse.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddDbContext<ShowContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("connectionString"), sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "frontend", policy => { policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowCredentials(); }));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors("frontend");
app.UseAuthorization();
app.MapControllers();
app.Run();



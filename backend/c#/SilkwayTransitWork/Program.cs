
var builder = WebApplication.CreateBuilder(args);
/*builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:7031",
                                "http://localhost:3000");
        });
});*/
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors(x => x
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials()
           //.WithOrigins("https://localhost:44351")); // Allow only this origin can also have multiple origins seperated with comma
           .SetIsOriginAllowed(origin => true));

app.UseAuthorization();

app.MapControllers();

app.Use(async (context, next) =>
{
    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
    await next.Invoke();
});

app.Run();

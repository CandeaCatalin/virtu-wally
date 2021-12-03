using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using VirtuWally.API.Services;
using VirtuWally.Data;
using VirtuWally.Data.Repositories;

namespace VirtuWally.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "VirtuWally.API", Version = "v1" });
            });

            services.AddDbContext<VirtuWallyContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("VirtuWallyConnection")).EnableSensitiveDataLogging().UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));


            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IDocRepository, DocRepository>();
            services.AddScoped<JwtService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "VirtuWally.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(options => options.WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" }).AllowAnyHeader().AllowAnyMethod().AllowCredentials());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using EbookConverter.WebApi.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace EbookConverter.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            Boolean.TryParse(Configuration["DynamoDb:LocalMode"], out var runLocalDb);
            if (runLocalDb)
            {
                services.AddSingleton<IAmazonDynamoDB>(sp =>
                {
                    var clientConfig = new AmazonDynamoDBConfig
                    {
                        ServiceURL = Configuration["DynamoDb:LocalServiceUrl"]
                    };

                    return new AmazonDynamoDBClient(clientConfig);
                });
            }
            else
                services.AddAWSService<IAmazonDynamoDB>();

            services.AddScoped(typeof(BookRepository));
            
            services.AddMvc();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
                var basePath = AppContext.BaseDirectory;
                var xmlPath = Path.Combine(basePath, "EbookConverter.WebApi.xml");
                c.IncludeXmlComments(xmlPath);
            });
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors();
            
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            
            app.UseMvc();
        }

        private IConfiguration Configuration { get; }
    }
}

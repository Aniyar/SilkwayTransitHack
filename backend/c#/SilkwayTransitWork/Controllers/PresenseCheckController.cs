using SilkwayTransitWork.Models;
using System;
using SilkwayTransitWork.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Data;
using System.Data.SqlClient;
using Npgsql;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;

namespace SilkwayTransitWork.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PresenseCheckController : ControllerBase
    {
        [HttpGet(Name = "GetAllPresentDrivers")]
        public string GetAllPresentDrivers([FromQuery]String stationId)
        {
            List<User> drivers = new List<User>();
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"SELECT * from users " +
                                    $"WHERE id IN (SELECT driverid from attendance WHERE approved = 'no' AND " +
                                    $"date='{DateTime.Today.ToString("dd/MM/yyyy")}' AND stationid = '{stationId}')";

                try
                {
                    var dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        User driver = new User();
                        driver.Id = dr["id"].ToString();
                        driver.Name = dr["name"].ToString();
                        driver.Surname = dr["surname"].ToString();
                        drivers.Add(driver);
                    }
                    
                    return JsonSerializer.Serialize(drivers);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error getting all drivers " + e.Message);
                }
            }
            return "{}";
        }

        [HttpPost(Name = "ApprovePresenseDriver")]
        public String ApprovePresenseDriver([FromQuery] String driverId, [FromQuery] String approved)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"UPDATE attendance SET approved='{approved}' WHERE driverid = '{driverId}' AND date = '{DateTime.Today.ToString("dd/MM/yyyy")}'";

                try
                {
                    cmd.ExecuteNonQuery();


                    return JsonSerializer.Serialize<Status>(new Status() { data = "success" }); 
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error approving driver attendance " + e.Message);

                    return JsonSerializer.Serialize<Status>(new Status() { data = "fail" }); 
                }
            }
        }
    }
}
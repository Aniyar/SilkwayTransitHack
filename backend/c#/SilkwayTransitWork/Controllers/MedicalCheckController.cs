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
    public class MedicalCheckController : ControllerBase
    {
        [HttpGet(Name = "GetAllApprovedDrivers")]
        public string GetAllApprovedDrivers([FromQuery]String stationId)
        {
            List<User> drivers = new List<User>();
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"SELECT * from users where id IN " +
                    $"(SELECT driverid from attendance WHERE approved = 'yes' AND medicalcheck = 'no' " +
                    $"AND date='{DateTime.Today.ToString("dd/MM/yyyy")}' AND stationid = '{stationId}')";

                try
                {
                    if (connection.State == ConnectionState.Open)
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
                    }
                    return JsonSerializer.Serialize(drivers);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error getting all drivers ready for medicalcheackup" + e.Message);
                }
            }
            return "{}";
        }

        [HttpPost(Name = "MedicalCheckDriver")]
        public void MedicalCheckDriver([FromQuery] String driverId, [FromQuery] String approved)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"UPDATE attendance SET medicalcheck='{approved}' WHERE driverid = '{driverId}' AND date = '{DateTime.Today.ToString("dd/MM/yyyy")}'";

                try
                {
                    cmd.ExecuteNonQuery();
                    return;
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error approving driver medical check " + e.Message);
                    return;
                }
            }
        }
    }
}

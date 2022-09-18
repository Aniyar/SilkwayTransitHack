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
using System.Diagnostics;
using Newtonsoft.Json.Linq;
//using Microsoft.AspNetCore.Mvc;

namespace SilkwayTransitWork.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class PresenseDriverController : ControllerBase
    {
        //[Route("api/Insert-Attendance")]

        [HttpPost(Name = "InsertAttendance")]
        public String InsertAttendance([Microsoft.AspNetCore.Mvc.FromQuery]String driverId, [Microsoft.AspNetCore.Mvc.FromQuery] String stationId)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"INSERT INTO attendance (driverid, arrived, date, time, approved, medicalcheck, stationid) " +
                                    $"VALUES ('{driverId}', 'yes', '{DateTime.Today.ToString("dd/MM/yyyy")}', '{DateTime.Now.ToString("HH:mm")}'," +
                                    $" 'no', 'no', '{stationId}')";

                try
                {                    
                    cmd.ExecuteNonQuery();
                    return JsonSerializer.Serialize<Status>(new Status() { data = "success" });
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                return JsonSerializer.Serialize<Status>(new Status() { data = "fail" }); 
            }
        }
    }
}
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
    public class TripController : ControllerBase
    {

        [HttpPost]
        [Route("StartTrip")]
        public void StartTrip([FromQuery] String driverId, [FromQuery] String trainid, [FromQuery] String startstation, [FromQuery] String finalstation, [FromQuery] String roadid)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"SELECT MAX(tripid) FROM trips";
                var tripid = Int32.Parse(cmd.ExecuteScalar().ToString()) + 1;

   

                cmd.CommandText = $"INSERT INTO trips (tripid, driverid, trainid, date," +
                    $"startstation, finalstation, roadid, approved, finished) VALUES " +
                    $"('{tripid}', '{driverId}', '{trainid}', '{DateTime.Now.ToString()}', '{startstation}', '{finalstation}', '{roadid}', 'no', 'no')";

                try
                {
                    cmd.ExecuteNonQuery();
                    return;
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error creating trip " + e.Message);
                    return;
                }
            }
        }

        [HttpPost]
        [Route("FinishTrip") ]
        public void FinishTrip([FromQuery] String driverId)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"SELECT tripid FROM trips WHERE driverid = '{driverId}' AND approved = 'yes' AND finished = 'no'";
                var tripid = cmd.ExecuteScalar().ToString();



                cmd.CommandText = $"UPDATE trips SET finishdate = '{DateTime.Now.ToString()}', finished = 'yes' WHERE tripid = '{tripid}'";

                try
                {
                    cmd.ExecuteNonQuery();
                    return;
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error creating trip " + e.Message);
                    return;
                }
            }
        }


    }
}

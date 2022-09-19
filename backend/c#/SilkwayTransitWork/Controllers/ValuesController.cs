using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using SilkwayTransitWork.Models;
using System.Data;
using System.Text.Json;

namespace SilkwayTransitWork.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        [Route("GetTrainLocations")]
        public String GetTrainLocations()
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
            {
                List<TrainStatus> tss = new List<TrainStatus>();
                connection.Open();
                NpgsqlCommand cmd = new NpgsqlCommand();
                cmd.CommandTimeout = 60;
                cmd.Connection = connection;
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = $"SELECT trips.trainid, trips.driverid, ts.stationid FROM trips INNER JOIN tripstations as ts ON ts.tripid = trips.tripid;";
                

                try
                {
                    var dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        TrainStatus ts = new TrainStatus();
                        ts.trainid = dr["trainid"].ToString();
                        ts.driverid = dr["driverid"].ToString(); 
                        ts.stationid = dr["stationid"].ToString();
                        tss.Add(ts);
                    }
                    return JsonSerializer.Serialize(tss);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error creating trip " + e.Message);
                    return JsonSerializer.Serialize(tss);
                }
            }
            return JsonSerializer.Serialize<Status>(new Status() { data = "fail" });
        }
    }

    class TrainStatus
    {
        public String trainid { get; set; }

        public String stationid { get; set; }
        public String driverid { get; set; }
    }
}

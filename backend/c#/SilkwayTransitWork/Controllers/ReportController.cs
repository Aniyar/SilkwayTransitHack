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
using System.Xml.Linq;
using System.Xml.Xsl;
using System.Xml;

namespace SilkwayTransitWork.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportController : ControllerBase
    {
        [HttpGet(Name = "getReport")]
        public String getReport([FromQuery] String driverid)
        {
            XDocument htReport = new XDocument();
            
            using (XmlWriter writer = htReport.CreateWriter())
            {
                using (NpgsqlConnection connection = new NpgsqlConnection(Helper.ConnectionString()))
                {
                    XDocument xdReport = new XDocument();
                    XElement report = new XElement("report");
                    connection.Open();
                    NpgsqlCommand cmd = new NpgsqlCommand();
                    cmd.CommandTimeout = 60;
                    cmd.Connection = connection;
                    cmd.CommandType = CommandType.Text;
                    cmd.CommandText = $"SELECT * from trips where driverid = '{driverid}'";

                    
                    Trip trip = new Trip();

                    var dr = cmd.ExecuteReader();
                    dr.Read();
                    var tripid = dr["tripid"].ToString();

                    XElement tripElem = new XElement("trip",
                            new XAttribute("tripid", dr["tripid"].ToString()),

                            
                            new XAttribute("trainid", dr["trainid"].ToString()), //ToDo
                            new XAttribute("startstation", dr["startstation"].ToString()),
                            new XAttribute("finalstation", dr["finalstation"].ToString()),

                            new XAttribute("roadid", dr["roadid"].ToString()),
                            new XAttribute("date", dr["date"].ToString()),
                            new XAttribute("finishdate", dr["finishdate"].ToString())
                        );

                    dr.Close();

                    NpgsqlCommand getdriver = new NpgsqlCommand();
                    getdriver.CommandTimeout = 60;
                    getdriver.Connection = connection;
                    getdriver.CommandType = CommandType.Text;
                    getdriver.CommandText = $"SELECT name, surname from users where id = '{driverid}'";

                    var dr3 = getdriver.ExecuteReader();
                    dr3.Read();

                    tripElem.Add(new XAttribute("driver", dr3["name"].ToString() + " " + dr3["surname"].ToString()));
                    
                    dr3.Close();
                    cmd.CommandText = $"SELECT * from tripstations where tripid = '{tripid}'";


                    var dr2 = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        XElement tripstationElem = new XElement("tripstation",
                            new XAttribute("startstation", dr["stationid"].ToString()),
                            new XAttribute("trainid", dr["gas"].ToString()), //ToDo
                            new XAttribute("driverid", dr["weight"].ToString()),
                            new XAttribute("finalstation", dr["distance"].ToString()),
                            new XAttribute("date", dr["arrivaltime"].ToString()),
                            new XAttribute("finishdate", dr["depoapprovedtime"].ToString())

                            );
                        tripElem.Add(tripstationElem);

                    }
                    dr.Close();


                    report.Add(tripElem);

                    xdReport.Add(report);
                    XslCompiledTransform transform = new XslCompiledTransform();
                    transform.Load(XmlReader.Create("xsl/Report.xml"));
                    transform.Transform(xdReport.CreateReader(), writer);
                    
                }
            }
            htReport.Save("C:/Users/Aniyar/Desktop/reports/report.html");
            return JsonSerializer.Serialize<Status>(new Status() { data = "success" });

        }
    }
}
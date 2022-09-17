namespace SilkwayTransitWork.Models
{
    public class Request
    {
        public string Id { get; set; }
        public string DriverId { get; set; }
        public string ReqType { get; set; }
        public string StationId { get; set; }
        public DateTime TimeCode { get; set; }
        public string CarId { get; set; }
        public bool Status { get; set; }
        public string ApproverId { get; set; }


        // Constructor
        public Request(string id, string driverId, string reqType, string stationId, string carId)
        {
            this.Id = id;
            this.DriverId = driverId;
            this.ReqType = reqType;
            this.TimeCode = DateTime.Now;
            this.StationId = stationId;
            this.CarId = carId;
            this.Status = false;
            this.ApproverId = "";

            // sql text to create a record

        }
        public void approveReq(bool status, string approverId)
        {
            this.Status = status;
            this.ApproverId = approverId;
        }

    }
}

package models

type User struct {
	Id       string `json:"id"`
	Type     string `json:"type"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Password []byte `json:"-"`
}

type Trips struct {
	TripId       string `json:"tripId"`
	DriverId     string `json:"driverID"`
	TrainId      string `json:"trainId"`
	RoadId       string `json:"roadId"`
	StartStation string `json:"startStation"`
	FinalStation string `json:"finalStation"`
	Approved     string `json:"approved"`
	Finished     string `json:"finished"`
}

type TrainsHistory struct {
	TripId      string `json:"tripId"`
	Gas         string `json:"gas"`
	Weight      string `json:"weight"`
	StationId   string `json:"stationId"`
	DepoApprove string `json:"depoApprove"`
	Distance    string `json:"distance"`
	ArrivalTime string `json:"arrivalTime"`
}

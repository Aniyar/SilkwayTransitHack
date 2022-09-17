package models

type User struct {
	Id       string `json:"id"`
	Type     string `json:"type"`
	Name     string `json:"username"`
	Surname  string `json:"email"`
	Password []byte `json:"-"`
}

type CurrentStationState struct {
	StationId         string `json:"stationId"`
	DriverId          string `json:"driverID"`
	DriverApprove     string `json:"driverApprove"`
	DriverApproveTime string `json:"driverApproveTime"`
	DepoApprove       string `json:"depoApprove"`
	DepoApproveTime   string `json:"depoApproveTime"`
}

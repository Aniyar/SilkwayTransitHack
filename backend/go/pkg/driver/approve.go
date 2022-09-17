package driver

import (
	"fmt"
	"net/http"
	"time"

	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/database"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/models"
	"github.com/gin-gonic/gin"
)

func Approve(ctx *gin.Context) {
	var data map[string]string

	if err := ctx.BindJSON(&data); err != nil {
		panic(err)
	}
	fmt.Println(data)

	currentStation := models.CurrentStationState{
		DriverId:          data["driverId"],
		StationId:         data["stationId"],
		DriverApprove:     data["driverApprove"],
		DriverApproveTime: time.Now().Format(time.RFC822),
		DepoApprove:       data["depoApprove"],
		DepoApproveTime:   time.Now().Format(time.RFC822),
	}
	if currentStation.StationId == "" || currentStation.DriverId == "" {
		ctx.JSON(http.StatusOK, gin.H{"message": "nope"})
		return
	}
	fmt.Println(currentStation)
	if currentStation.DriverApprove == "Approved" {
		_, err := database.DB.Query(fmt.Sprintf("UPDATE arrival%s SET DriverConfirm='Approved', DriverConfirmTime='%s' WHERE stationId = '%s'", currentStation.DriverId, currentStation.DriverApproveTime, currentStation.StationId))
		if err != nil {
			panic(err)
		}
	}
	if currentStation.DepoApprove == "Approved" {
		_, err := database.DB.Query(fmt.Sprintf("UPDATE arrival%s SET DepoConfirm='Approved', DepoConfirmTime='%s' WHERE stationId = '%s'", currentStation.DriverId, currentStation.DepoApproveTime, currentStation.StationId))
		if err != nil {
			panic(err)
		}
	}
	res, err := database.DB.Query(fmt.Sprintf("SELECT * FROM arrival%s", currentStation.DriverId))
	if err != nil {
		panic(err)
	}
	if res == nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"messages": "No such DriverId"})
		return
	}
	var current models.CurrentStationState
	for res.Next() {
		err := res.Scan(&current.DriverId, &current.StationId, &current.DriverApprove, &current.DriverApproveTime, &current.DepoApprove, &current.DepoApproveTime)
		if err != nil {
			panic(err)
		}
		break
	}
	ctx.JSON(http.StatusOK, current)
}

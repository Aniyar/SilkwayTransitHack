package driver

import (
	"fmt"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/database"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Approve(ctx *gin.Context) {
	var data map[string]string
	if err := ctx.BindJSON(&data); err != nil {
		panic(err)
	}
	currentStation := models.TrainsHistory{
		TripId:      data["tripId"],
		ArrivalTime: data["arrivalTime"],
		Weight:      data["weight"],
		Gas:         data["gas"],
		StationId:   data["stationId"],
		DepoApprove: data["depoApprove"],
	}
	if currentStation.StationId == "" {
		ctx.JSON(http.StatusOK, gin.H{"message": "nope"})
		return
	}
	if currentStation.DepoApprove == "no" {
		_, err := database.DB.Query(fmt.Sprintf("UPDATE tripstations SET gas = '%s', weight = '%s', arrivaltime = '%s', WHERE stationid = %s", currentStation.Gas, currentStation.Weight, currentStation.ArrivalTime, currentStation.StationId))
		if err != nil {
			panic(err)
		}
		ctx.JSON(http.StatusOK, gin.H{"message": "driver approve"})
	} else {
		ctx.JSON(http.StatusOK, gin.H{"message": "success"})
	}
}

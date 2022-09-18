package driver

import (
	"fmt"
	"net/http"

	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/database"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/models"
	"github.com/gin-gonic/gin"
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
		Distance:    data["distance"],
		StationId:   data["stationId"],
		DepoApprove: data["depoApprove"],
	}
	fmt.Println(currentStation)
	if currentStation.TripId == "" {
		ctx.JSON(http.StatusOK, gin.H{"message": "nope"})
		return
	}
	if currentStation.DepoApprove == "no" {
		_, err := database.DB.Query(fmt.Sprintf("INSERT INTO tripstations VALUES('%s','%s','%s','%s','%s','%s','%s')", currentStation.TripId, currentStation.Gas, currentStation.Weight, currentStation.StationId, currentStation.DepoApprove, currentStation.Distance, currentStation.ArrivalTime))
		if err != nil {
			panic(err)
		}
		ctx.JSON(http.StatusOK, gin.H{"message": "driver approve"})
	} else {
		ctx.JSON(http.StatusOK, gin.H{"message": "success"})
	}
}

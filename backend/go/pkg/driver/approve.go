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
		_, err := database.DB.Query(fmt.Sprintf("INSERT INTO tripstations VALUES('%s','%s','%s','%s','%s','%s','%s','%s')", currentStation.TripId, currentStation.Gas, currentStation.Weight, currentStation.StationId, currentStation.Distance, currentStation.ArrivalTime, currentStation.DepoApprove, "none"))
		if err != nil {
			panic(err)
		}
		res, err := database.DB.Query(fmt.Sprintf("SELECT * FROM tripstations WHERE depoapprove = 'no'"))
		if err != nil {
			panic(err)
		}
		var depolist []models.TrainsHistory
		for res.Next() {
			var depo models.TrainsHistory
			err = res.Scan(&depo.TripId, &depo.Gas, &depo.Weight, &depo.StationId, &depo.Distance, &depo.ArrivalTime, &depo.DepoApprove, &depo.DepoApproveTime)
			if err != nil {
				panic(err)
			}
			depolist = append(depolist, depo)
		}
		ctx.JSON(http.StatusOK, depolist)
	} else {
		_, err := database.DB.Query(fmt.Sprintf("UPDATE tripstations SET depoapprove = 'yes', depoapprovetime = '%s' WHERE tripid = '%s' and stationid = '%s'", time.Now().Format("15:04 2006-01-02"), currentStation.TripId, currentStation.StationId))
		if err != nil {
			panic(err)
		}
		ctx.JSON(http.StatusOK, gin.H{"message": "Depo Approved"})
	}
}

package driver

import (
	"fmt"
	"net/http"

	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/controllers"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/database"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/models"
	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v4"
)

func DriverInfo(ctx *gin.Context) models.User {
	cookie, err := ctx.Cookie("jwt")
	if err != nil {
		return models.User{}
	}
	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(controllers.SecretKey), nil
	})
	if err != nil {
		panic(err)
	}
	claims := token.Claims.(*jwt.RegisteredClaims)
	user := models.User{"", "", "", "", "", []byte{}}
	fmt.Println(claims, "CLAIMS")
	res, _ := database.DB.Query(fmt.Sprintf("SELECT * FROM users WHERE token = '%s'", claims.Issuer))
	if res != nil {
		for res.Next() {
			err = res.Scan(&user.Id, &user.Token, &user.Type, &user.Name, &user.Surname, &user.Password)
			if err != nil {
				panic(err)
			}
			break
		}
	}
	return user
}

func Stations(ctx *gin.Context) {
	user := DriverInfo(ctx)
	fmt.Println(string(user.Id))
	res, err := database.DB.Query(fmt.Sprintf("SELECT * FROM trips WHERE driverid = '%s'", user.Name+user.Surname))
	if err != nil {
		panic(err)
	}
	var trip models.Trips
	for res.Next() {
		err := res.Scan(&trip.TripId, &trip.DriverId, &trip.TrainId, &trip.Date, &trip.StartStation, &trip.FinalStation, &trip.RoadId, &trip.Approved, &trip.Finished, &trip.Finishdate)
		if err != nil {
			panic(err)
		}
		break
	}
	res, err = database.DB.Query(fmt.Sprintf("SELECT * FROM roads WHERE roadid = '%s'", trip.RoadId))
	if err != nil {
		panic(err)
	}
	var road models.Roads
	for res.Next() {
		err := res.Scan(&road.RoadId, &road.Stations)
		if err != nil {
			panic(err)
		}
		break
	}
	ctx.JSON(http.StatusOK, road)
}

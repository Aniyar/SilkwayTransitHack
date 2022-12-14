package routes

import (
	"net/http"

	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/controllers"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/driver"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "PATCH", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Accept", "Accept-Encoding", "Authorization", "X-CSRF-Token"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
	}))
	r.Use(static.Serve("/", static.LocalFile("./web", true)))

	api := r.Group("/api")
	api.GET("/check", func(ctx *gin.Context) { ctx.JSON(http.StatusOK, gin.H{"message": "Work pls!!"}) })
	api.GET("/stations", driver.Stations)
	api.GET("/user", controllers.User)
	api.GET("/logout", controllers.Logout)
	api.GET("/trips", driver.TripStations)
	api.GET("/driver", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, driver.DriverInfo(ctx))
	})
	api.POST("/register", controllers.Register)
	api.POST("/login", controllers.Login)
	api.POST("/stationApprove", driver.Approve)
	r.Run(":8080")

}

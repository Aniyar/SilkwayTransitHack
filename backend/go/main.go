package main

import (
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/database"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/routes"
)

func main() {
	database.Connect()
	routes.SetupRoutes()
}

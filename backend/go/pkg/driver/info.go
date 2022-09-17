package driver

import (
	"fmt"
	"net/http"

	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/controllers"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/database"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func DriverInfo(ctx *gin.Context) {
	cookie, err := ctx.Cookie("jwt")
	if err != nil {
		return
	}
	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(controllers.SecretKey), nil
	})
	if err != nil {
		panic(err)
	}
	claims := token.Claims.(*jwt.RegisteredClaims)
	user := models.User{"", "", "", "", []byte{}}
	res, _ := database.DB.Query(fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", claims.Issuer))
	if res != nil {
		for res.Next() {
			err = res.Scan(&user.Id, &user.Type, &user.Name, &user.Surname, &user.Password)
			if err != nil {
				panic(err)
			}
			break
		}
	}
	ctx.JSON(http.StatusOK, user)
	return
}

package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/database"
	"github.com/doxanocap/SilkwayTransitHack/backend/go/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(ctx *gin.Context) {
	var data map[string]string

	if err := ctx.BindJSON(&data); err != nil {
		panic(err)
	}
	fmt.Println(data)
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	user := models.User{
		Id:       data["id"],
		Type:     data["type"],
		Name:     data["name"],
		Surname:  data["surname"],
		Password: password,
	}
	user.Token = generateToken(10)
	fmt.Println(user.Token)
	_, err := database.DB.Query(fmt.Sprintf("INSERT INTO users (id,token,type,name, surname, password) VALUES('%s','%s','%s','%s','%s','%s')", user.Id, user.Token, user.Type, user.Name, user.Surname, user.Password))
	if err != nil {
		panic(err)
	}

	ctx.JSON(http.StatusOK, user)
}

func Login(ctx *gin.Context) {
	var data map[string]string

	if err := ctx.BindJSON(&data); err != nil {
		panic(err)
	}

	res, err := database.DB.Query(fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", data["id"]))
	if err != nil {
		panic(err)
	}

	var user models.User
	for res.Next() {
		err = res.Scan(&user.Id, &user.Type, &user.Name, &user.Surname, &user.Password, &user.Token)
		if err != nil {
			panic(err)
		}
		if user.Id == "" {
			ctx.JSON(http.StatusNotFound, gin.H{"message": "user not found"})
			return
		}
		if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"message": "incorrect password"})
			return
		}
		break
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    string(user.Token),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), // expires after 1 day
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "couldn't login"})
		return
	}

	http.SetCookie(ctx.Writer, &http.Cookie{
		Name:    "jwt",
		Value:   token,
		Expires: time.Now().Add(time.Hour * 24),
	})
	fmt.Println(user, "qwe")

	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func User(ctx *gin.Context) {
	cookie, _ := ctx.Cookie("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "unauthenticated"})
		return
	}

	claims := token.Claims.(*jwt.RegisteredClaims)

	var user models.User
	res, _ := database.DB.Query(fmt.Sprintf("SELECT * FROM users WHERE token = '%s'", claims.Issuer))
	for res.Next() {
		err = res.Scan(&user.Id, &user.Token, &user.Type, &user.Name, &user.Surname, &user.Password)
		if err != nil {
			panic(err)
		}
		break
	}
	ctx.JSON(http.StatusOK, user)
}

func Logout(ctx *gin.Context) {
	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
	}
	http.SetCookie(ctx.Writer, cookie)
	ctx.JSON(http.StatusOK, gin.H{"message": "deleted cookie"})
}

func generateToken(ln int) string {
	rand.Seed(time.Now().UnixNano())
	var token string
	for i := 0; i < ln; i++ {
		n := rand.Intn(62)
		if n < 10 {
			n += 48
		} else if n < 36 {
			n += 55
		} else {
			n += 61
		}
		token += string(rune(n))
	}
	return token
}

package main

import (
	"log"
	"os"

	"github.com/Vishaltalsaniya-7/crmapp/controller"
	"github.com/Vishaltalsaniya-7/crmapp/db"
	"github.com/Vishaltalsaniya-7/crmapp/managers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	if err := db.Connect(); err != nil {
		log.Fatalf("Error initializing database: %v", err)
		os.Exit(1)
	}

	userManager := managers.NewUserManager()

	userController := controller.NewUserController(userManager)

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.POST("/user", userController.CreateUser)
	e.GET("/user",userController.GetAllUser)

	e.Logger.Fatal(e.Start(":8080"))

}

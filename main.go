package main

import (
	"log"

	"github.com/Vishaltalsaniya-7/crmapp/db"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	if err := db.Connect(); err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Logger.Fatal(e.Start(":8080"))

}

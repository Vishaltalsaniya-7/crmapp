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

	//user
	e.POST("/user", userController.CreateUser)
	e.GET("/user", userController.GetAllUser)
	e.GET("/user/:id", userController.GetUserById)
	e.PUT("/user/:id", userController.UpdateUser)
	e.PATCH("/user/:id/role", userController.UpdateUserRole)
	e.DELETE("/user/:id", userController.DeleteUser)

	//auth
	e.POST("/register", controller.Register)
	e.POST("/login", controller.Login)

	

	// customerManager := managers.NewCustomerManager()
	// customermanager:=controller.NewCustomerController(customerManager)
	//Customer
	e.POST("/customer", controller.CreateCustomer)
	e.GET("/customer", controller.GetAllCustomer)
	e.GET("/customer/:id", controller.GetCustomerById) // Get Customer by ID

	e.PUT("/customer/:id", controller.UpdateCustomer)
	e.DELETE("/customer/:id", controller.DeleteCustomer)

	// Lead
	e.POST("/lead", controller.CreateLead)
	e.GET("/lead", controller.GetLead)
	e.PUT("/lead/:id", controller.UpdateLead)
	e.PATCH("/lead/:id/status", controller.UpdateLeadStatus)
	e.GET("/lead/:id", controller.GetLeadById)
	e.DELETE("/lead/:id", controller.DeleteLead)

	e.Logger.Fatal(e.Start(":8080"))

}

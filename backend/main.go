package main

import (
	"log"
	"os"

	"github.com/Vishaltalsaniya-7/crmapp/controller"
	"github.com/Vishaltalsaniya-7/crmapp/db"
	"github.com/Vishaltalsaniya-7/crmapp/managers"
	"github.com/Vishaltalsaniya-7/crmapp/midd"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	// Initialize Database
	if err := db.Connect(); err != nil {
		log.Fatalf("Error initializing database: %v", err)
		os.Exit(1)
	}

	// Initialize Managers
	userManager := managers.NewUserManager()
	userController := controller.NewUserController(userManager)

	// Initialize Echo
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{echo.GET, echo.PUT, echo.POST, echo.DELETE, echo.OPTIONS},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		AllowCredentials: true,
	}))

	// Public Routes
	e.POST("/register", controller.Register)
	e.POST("/login", controller.Login)

	// Protected Routes (Require Authentication)
	userRoutes := e.Group("/user")
	userRoutes.Use(midd.AuthMiddleware) // Apply AuthMiddleware
	userRoutes.POST("", userController.CreateUser)
	userRoutes.GET("", userController.GetAllUser)
	userRoutes.GET("/:id", userController.GetUserById)
	userRoutes.PUT("/:id", userController.UpdateUser)
	userRoutes.PATCH("/:id/role", userController.UpdateUserRole)
	userRoutes.DELETE("/:id", userController.DeleteUser)

	customerRoutes := e.Group("/customer")
	// customerRoutes.Use(midd.AuthMiddleware)
	customerRoutes.POST("", controller.CreateCustomer)
	customerRoutes.GET("", controller.GetAllCustomer)
	customerRoutes.GET("/:id", controller.GetCustomerById)
	customerRoutes.PUT("/:id", controller.UpdateCustomer)
	customerRoutes.DELETE("/:id", controller.DeleteCustomer)

	leadRoutes := e.Group("/lead")
	// leadRoutes.Use(midd.AuthMiddleware)
	leadRoutes.POST("", controller.CreateLead)
	leadRoutes.GET("", controller.GetLead)
	leadRoutes.PUT("/:id", controller.UpdateLead)
	leadRoutes.PATCH("/:id/status", controller.UpdateLeadStatus)
	leadRoutes.GET("/:id", controller.GetLeadById)
	leadRoutes.DELETE("/:id", controller.DeleteLead)

	// Start Server
	e.Logger.Fatal(e.Start(":8082"))
}

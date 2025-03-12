package controller

import (
	"net/http"

	"github.com/Vishaltalsaniya-7/crmapp/managers"
	"github.com/Vishaltalsaniya-7/crmapp/models"
	"github.com/labstack/echo/v4"
)

func Register(c echo.Context) error {
	req := new(models.AuthRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	err := managers.RegisterUser(req.Username, req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "User registration failed"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "User registered successfully"})
}

func Login(c echo.Context) error {
	req := new(models.AuthRequest)
	if err := c.Bind(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	token, err := managers.AuthenticateUser(req.Email, req.Password)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid credentials"})
	}

	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

package midd

import (
	"log"
	"net/http"
	"strings"

	utils "github.com/Vishaltalsaniya-7/crmapp/utils"
	"github.com/labstack/echo/v4"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if authHeader == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Missing token"})
		}

		log.Println("Authorization Header:", authHeader) //
		if strings.HasPrefix(authHeader, "Bearer ") {

			authHeader = strings.TrimPrefix(authHeader, "Bearer ")
		}

		claims, err := utils.ValidateToken(authHeader)
		if err != nil {
			log.Println("Token validation failed:", err) // Debugging log

			return c.JSON(http.StatusUnauthorized, map[string]string{"error": err.Error()})
		}
		c.Set("user_email", claims.Email)

		return next(c)
	}
}

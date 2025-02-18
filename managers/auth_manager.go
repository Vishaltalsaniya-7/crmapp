package managers

// import (
// 	"errors"
// 	"time"

// 	"github.com/Vishaltalsaniya-7/crmapp/models"
// 	"github.com/dgrijalva/jwt-go"
// 	"golang.org/x/crypto/bcrypt"
// )

// func AuthenticateUser(email, password string) (string, error) {
// 	var user models.User
// 	err := models.GetDB().QueryTable("user").Filter("email", email).One(&user)
// 	if err != nil {
// 		return "", errors.New("User not found")
// 	}

// 	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
// 		return "", errors.New("Invalid credentials")
// 	}

// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"sub": user.ID,
// 		"exp": time.Now().Add(time.Hour * 24).Unix(),
// 	})

// 	tokenString, err := token.SignedString([]byte("123456"))
// 	if err != nil {
// 		return "", errors.New("Error generating token")
// 	}

// 	return tokenString, nil
// }

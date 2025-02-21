package models

import (
	"time"

	"github.com/beego/beego/v2/client/orm"
)

type User struct {
	Id        int       `json:"id" orm:"auto"`
	Username  string    `json:"username" orm:"unique;size(100)"`
	Email     string    `json:"email" orm:"unique;size(100)"`
	Password  string    `json:"password" orm:"size(100)"`
	Role      string    `json:"role" orm:"size(10)"` // admin/user
	CreatedAt time.Time `json:"created_at" orm:"auto_now_add;type(datetime)"`
}

type AuthRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func init() {
	orm.RegisterModel(new(AuthRequest))
}

// func (user *User) HashPassword(password string) error {
// 	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
// 	if err != nil {
// 		return err
// 	}
// 	user.Password = string(bytes)
// 	return nil
// }

// func (user *User) CheckPassword(providedPassword string) error {
// 	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
// 	if err != nil {
// 		return err
// 	}
// 	return nil
// }

// type Customer struct {
// 	ID        int       `json:"id" orm:"auto"`
//     Name      string    `json:"name" orm:"size(255);"`
//     Email     string    `json:"email" orm:"unique;size(100)"`
//     Phone     string    `json:"phone" orm:"size(20)"`
//     Address   string    `json:"address" orm:"size(255)"`
//     CreatedAt time.Time `json:"created_at" orm:"auto_now_add;type(datetime)"`
// }

// type Lead struct {
// 	ID             int       `json:"id" orm:"auto"`
// 	CustomerID     int       `json:"customer_id" orm:"rel(fk);"`
// 	AssignedUserID int       `json:"assigned_user_id" orm:"rel(fk);"`
// 	Status         string    `json:"status" orm:"size(20);"`
// 	CreatedAt      time.Time `json:"created_at" orm:"auto_now_add;type(datetime)"`
// }

func init() {
	orm.RegisterModel(new(User))
}

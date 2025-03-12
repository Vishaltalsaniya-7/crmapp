package models

import (
	"time"

	"github.com/beego/beego/v2/client/orm"
)

type Customer struct {
	Id        int       `json:"id" orm:"auto"`
	Name      string    `json:"name" orm:"size(255);"`
	Email     string    `json:"email" orm:"unique;size(100)"`
	Phone     string    `json:"phone" orm:"size(20)"`
	Address   string    `json:"address" orm:"size(255)"`
	CreatedAt time.Time `json:"created_at" orm:"auto_now_add;type(datetime)"`
}

func init() {
	// Register the Customer model with ORM
	orm.RegisterModel(new(Customer))
}

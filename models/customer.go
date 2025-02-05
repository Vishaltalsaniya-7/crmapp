package models

import (
	"time"
)

type Customer struct {
	ID        int       `orm:"auto"`
	Name      string    `orm:"size(100)"`
	Email     string    `orm:"size(100);unique"`
	Phone     string    `orm:"size(20)"`
	Company   string    `orm:"size(100)"`
	CreatedAt time.Time `orm:"auto_now_add;type(datetime)"`
	UpdatedAt time.Time `orm:"auto_now;type(datetime)"`
}

// func init() {
// 	orm.RegisterModel(
// 				new(Lead),
// 	)
// }

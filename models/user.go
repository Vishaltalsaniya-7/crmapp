	package models

	import (
		"time"
	)

	type User struct {
		ID        int       `orm:"auto"`
		Name      string    `orm:"size(100)"`
		Email     string    `orm:"size(100);unique"`
		Password  string    `orm:"size(255)"`
		Role      string    `orm:"size(50)"`
		CreatedAt time.Time `orm:"auto_now_add;type(datetime)"`
		UpdatedAt time.Time `orm:"auto_now;type(datetime)"`
	}

// func init() {
// 	orm.RegisterModel(
// 		new(User),
// 		new(Customer),
// 		new(Lead),
// 	)
// }

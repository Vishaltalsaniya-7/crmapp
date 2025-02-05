	package models

	import (
		"time"
	)

	type Lead struct {
		ID         int       `orm:"auto"`
		CustomerID *Customer  `orm:"rel(fk);on_delete(set_null)"` // Foreign Key to Customer
		UserID     *User      `orm:"rel(fk);on_delete(set_null)"` 
		Source     string    `orm:"size(100)"`
		Status     string    `orm:"size(50)"`
		CreatedAt  time.Time `orm:"auto_now_add;type(datetime)"`
		UpdatedAt  time.Time `orm:"auto_now;type(datetime)"`
	}

// func init() {
// 	orm.RegisterModel(
// 		new(User),
// 		new(Customer),
// 		new(Lead),
// 	)
// }

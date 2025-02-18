package models

import "github.com/beego/beego/v2/client/orm"

type User struct {
	Id        int    `orm:"auto"`
	Name      string `orm:"size(100)"`
	Email     string `orm:"size(100);unique"`
	Password  string `orm:"size(255)"`
	Role      string `orm:"size(20)"`
	CreatedAt string `orm:"type(datetime)"`
	UpdatedAt string `orm:"type(datetime)"`
	// Sessions  []*Session `orm:"reverse(many)"` // One-to-many relationship
}

type Customer struct {
	Id        int    `orm:"auto"`
	Name      string `orm:"size(100)"`
	Email     string `orm:"size(100);unique"`
	Phone     string `orm:"size(15)"`
	CreatedAt string `orm:"type(datetime)"`
	UpdatedAt string `orm:"type(datetime)"`
}

// Lead represents a lead in the system
type Lead struct {
	Id        int    `orm:"auto"`
	Name      string `orm:"size(100)"`
	Email     string `orm:"size(100);unique"`
	Phone     string `orm:"size(15)"`
	Source    string `orm:"size(100)"`
	CreatedAt string `orm:"type(datetime)"`
	UpdatedAt string `orm:"type(datetime)"`
}

// init registers the models with the ORM
func init() {
	orm.RegisterModel(new(User))
}

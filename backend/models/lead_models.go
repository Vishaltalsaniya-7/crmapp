package models

import (
	"time"
	"github.com/beego/beego/v2/client/orm"
)

type Lead struct {
	Id       int       `json:"id" orm:"auto"`
	Customer  *Customer `json:"customer" orm:"rel(fk)"` // Foreign key relation with Customer
	Source    string    `json:"source" orm:"size(100)"`
	Status    string    `json:"status" orm:"size(20)"` // E.g., "New", "Contacted", "Converted"
	CreatedAt time.Time `json:"created_at" orm:"auto_now_add;type(datetime)"`
}

func init() {
	// Register the Lead model with ORM
	orm.RegisterModel(new(Lead))
}

package request

type CustomerRequest struct {
	Name  string `json:"name" valid:"Required"`
	Email string `json:"email" valid:"Required;Email"`
	Phone string `json:"phone" valid:"Required"`
}
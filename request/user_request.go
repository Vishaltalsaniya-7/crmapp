package request

type UserRequest struct {
	Name     string `json:"name" valid:"Required"`
	Email    string `json:"email" valid:"Required;Email"`
	Password string `json:"password" valid:"Required"`
	Role     string `json:"role" valid:"Required"`
}
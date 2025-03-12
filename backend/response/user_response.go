package response

type UserResponse struct {
    Id       int    `json:"id"`
    Username  string `json:"username"`
    Email     string `json:"email"`
    Role      string `json:"role"`
    CreatedAt string `json:"created_at"`
}


// type CustomerResponse struct {
// 	ID        int       `json:"id"`
// 	Name      string    `json:"name"`
// 	Email     string    `json:"email"`
// 	Phone     string    `json:"phone"`
// 	CreatedAt time.Time `json:"created_at"`
// 	UpdatedAt time.Time `json:"updated_at"`
// }

type LoginResponse struct {
	Token string `json:"token"`
}

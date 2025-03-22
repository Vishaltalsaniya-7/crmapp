package request

type CreateCustomerRequest struct {
    Name    string `json:"name" binding:"required"`
    Email   string `json:"email" binding:"required,email"`
    Phone   string `json:"phone" binding:"required"`
    Company string `json:"company"`
    Address string `json:"address"`
}
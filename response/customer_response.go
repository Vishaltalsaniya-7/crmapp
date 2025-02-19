package response


type CustomerResponse struct {
    Id        int    `json:"id"`
    Name      string `json:"name"`
    Email     string `json:"email"`
    Phone     string `json:"phone"`
    Address   string `json:"address"`
    CreatedAt string `json:"created_at"`
}
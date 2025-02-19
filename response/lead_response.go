package response

type LeadResponse struct {
	Id       int    `json:"id"`
	Customer  int    `json:"customer_id"` // Keep as int
	Source    string `json:"source"`
	Status    string `json:"status"`
	CreatedAt string `json:"created_at"`
}
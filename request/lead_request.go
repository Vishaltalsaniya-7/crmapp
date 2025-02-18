package request

type LeadRequest struct {
	CustomerID int    `json:"customer_id" valid:"Required"`
	Status     string `json:"status" valid:"Required"`
}
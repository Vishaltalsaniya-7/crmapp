package request

type LeadRequest struct {
	CustomerID int    `json:"customer_id" validate:"required"`
	Source     string `json:"source" validate:"required"`
	Status     string `json:"status" validate:"required"` // Example: "New", "Contacted", "Converted"
}
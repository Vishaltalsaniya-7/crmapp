package managers

import (
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/Vishaltalsaniya-7/crmapp/models"
	"github.com/Vishaltalsaniya-7/crmapp/request"
	"github.com/Vishaltalsaniya-7/crmapp/response"
	"github.com/beego/beego/v2/client/orm"
)

func CreateLead(lead request.LeadRequest) (response.LeadResponse, error) {
	o := orm.NewOrm()
	customer := models.Customer{Id: lead.CustomerID}
	err := o.Read(&customer)
	if err != nil {
		log.Printf("Error: Customer with ID %d not found\n", lead.CustomerID)
		return response.LeadResponse{}, err
	}

	newLead := models.Lead{
		Customer:  &customer,
		Source:    lead.Source,
		Status:    lead.Status,
		CreatedAt: time.Time{},
	}

	log.Println("Inserting new user into the database...")
	_, err = o.Insert(&newLead)
	if err != nil {
		log.Printf("Error inserting lead into the database: %v\n", err)
		return response.LeadResponse{}, err
	}
	log.Println("User successfully inserted, parsing timestamps...")

	leadResponse := response.LeadResponse{
		Id:        newLead.Id,
		Customer:  newLead.Customer.Id,
		Source:    newLead.Source,
		Status:    newLead.Status,
		CreatedAt: newLead.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	log.Println("Lead creation successful, returning response.")
	return leadResponse, nil

}

func GetLead(pageSize int, pageNo int, order string, orderby string, searchQuery string) ([]response.LeadResponse, int, int, error) {
	o := orm.NewOrm()
	var lead []models.Lead
	query := o.QueryTable(new(models.Lead))

	if searchQuery != "" {
		query = query.Filter("name__icontains", searchQuery)
	}

	totalRecords, err := query.Count()
	if err != nil {
		log.Printf("Error counting lead: %v", err)
		return nil, 0, 0, fmt.Errorf("failed to count users: %v", err)
	}

	if order == "" {
		order = "asc"
	}
	if orderby == "" {
		orderby = "id"
	}

	orderByClause := orderby
	if strings.ToLower(order) == "desc" {
		orderByClause = "-" + orderby
	}

	offset := (pageNo - 1) * pageSize

	_, err = query.OrderBy(orderByClause).Limit(pageSize, offset).All(&lead)
	if err != nil {
		log.Printf("Error fetching lead: %v", err)
		return nil, 0, 0, fmt.Errorf("failed to fetch lead: %v", err)
	}

	lastPage := (int(totalRecords) + pageSize - 1) / pageSize

	var leadResponses []response.LeadResponse
	for _, user := range lead {
		leadResponses = append(leadResponses, response.LeadResponse{
			Id:        user.Id,
			Customer:  user.Customer.Id,
			Source:    user.Source,
			Status:    user.Status,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return leadResponses, lastPage, int(totalRecords), nil
}

func UpdateLead(id int, req request.LeadRequest) (response.LeadResponse, error) {
	o := orm.NewOrm()
	lead := models.Lead{Id: id}

	err := o.Read(&lead)
	if err == orm.ErrNoRows {
		return response.LeadResponse{}, fmt.Errorf("lead not found")
	} else if err != nil {
		return response.LeadResponse{}, fmt.Errorf("database error: %v", err)
	}

	customer := models.Customer{Id: req.CustomerID}
	if err := o.Read(&customer); err == orm.ErrNoRows {
		return response.LeadResponse{}, fmt.Errorf("customer not found")
	} else if err != nil {
		return response.LeadResponse{}, fmt.Errorf("error fetching customer: %v", err)
	}
	lead.Customer = &customer
	lead.Source = req.Source
	lead.Status = req.Status
	// user.UpdatedAt = time.Now().Format("2006-01-02 15:04:05")

	_, err = o.Update(&lead)
	if err != nil {
		return response.LeadResponse{}, fmt.Errorf("failed to update movie: %v", err)
	}
	responseCustomer := &response.LeadResponse{
		Id:        lead.Id,
		Customer:  lead.Customer.Id,
		Source:    lead.Source,
		Status:    lead.Status,
		CreatedAt: lead.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return *responseCustomer, nil
}

func GetLeadById(id int) (response.LeadResponse, error) {
	o := orm.NewOrm()
	lead := models.Lead{Id: id}

	err := o.Read(&lead)
	if err == orm.ErrNoRows {
		return response.LeadResponse{}, fmt.Errorf("lead not found")
	} else if err != nil {
		return response.LeadResponse{}, fmt.Errorf("database error: %v", err)
	}

	leadResponse := response.LeadResponse{
		Id:        lead.Id,
		Customer:  lead.Customer.Id,
		Source:    lead.Source,
		Status:    lead.Status,
		CreatedAt: lead.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return leadResponse, nil
}

func DeleteLead(id int) error {
	o := orm.NewOrm()

	existingLead := models.Lead{Id: id}
	if err := o.Read(&existingLead); err != nil {
		if err == orm.ErrNoRows {
			return errors.New("cLeadr not found")
		}
		return err
	}
	if _, err := o.Delete(&existingLead); err != nil {
		return err
	}
	return nil
}

func UpdateLeadStatus(id int, req request.LeadRequest) (response.LeadResponse, error) {
	o := orm.NewOrm()

	lead := models.Lead{Id: id}
	err := o.Read(&lead)
	if err == orm.ErrNoRows {
		return response.LeadResponse{}, fmt.Errorf("lead not found")
	} else if err != nil {
		return response.LeadResponse{}, fmt.Errorf("database error: %v", err)
	}
	// lead.leadname = req.leadname
	// lead.Email = req.Email
	lead.Status = req.Status
	lead.Source = req.Source
	// lead.Password = req.Password
	// lead.UpdatedAt = time.Now().Format("2006-01-02 15:04:05")

	_, err = o.Update(&lead)
	if err != nil {
		return response.LeadResponse{}, fmt.Errorf("failed to update movie: %v", err)
	}
	responseleadstatus := &response.LeadResponse{
		Id:        lead.Id,
		Customer:  lead.Customer.Id,
		Source:    lead.Source,
		Status:    lead.Status,
		CreatedAt: lead.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return *responseleadstatus, nil

}

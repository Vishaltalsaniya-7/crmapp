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

// type CustomerMgr struct {
// }

// func NewCustomerManager() *CustomerMgr {
// 	return &CustomerMgr{}
// }

func CreateCustomer(customerRequest request.CreateCustomerRequest) (response.CustomerResponse, error) {
	o := orm.NewOrm()
	existingUser := models.Customer{}
	log.Printf("Checking if user with email '%s' exists...\n", customerRequest.Email)
	err := o.QueryTable(&models.Customer{}).Filter("email", customerRequest.Email).One(&existingUser)
	if err == nil {
		log.Printf("User with email '%s' already exists.\n", customerRequest.Email)
		return response.CustomerResponse{}, fmt.Errorf("user with email '%s' already exists", customerRequest.Email)
	} else if err != orm.ErrNoRows {
		log.Printf("Error checking for existing user: %v\n", err)
		return response.CustomerResponse{}, err
	}

	log.Println("User does not exist, proceeding to create new user...")

	newUser := models.Customer{
		Name:      customerRequest.Name,
		Email:     customerRequest.Email,
		Phone:     customerRequest.Phone,
		Address:   customerRequest.Address,
		CreatedAt: time.Time{},
		// UpdatedAt: currentTime.Format("2006-01-02 15:04:05"),
	}

	log.Println("Inserting new user into the database...")
	_, err = o.Insert(&newUser)
	if err != nil {
		log.Printf("Error inserting user into the database: %v\n", err)
		return response.CustomerResponse{}, err
	}

	log.Println("User successfully inserted, parsing timestamps...")

	userresponse := response.CustomerResponse{
		Id:        newUser.Id,
		Name:      newUser.Name,
		Email:     newUser.Email,
		Phone:     newUser.Phone,
		Address:   newUser.Address,
		CreatedAt: newUser.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	log.Println("User creation successful, returning response.")
	return userresponse, nil

}

func GetAllCustomer(pageSize int, pageNo int, order string, orderby string, searchQuery string, addressFilter string) ([]response.CustomerResponse, int, int, error) {
	o := orm.NewOrm()
	var customer []models.Customer
	query := o.QueryTable(new(models.Customer))

	if searchQuery != "" {
		query = query.Filter("name__icontains", searchQuery)
	}

	if addressFilter != "" {
		query = query.Filter("address", addressFilter)
	}

	totalRecords, err := query.Count()
	if err != nil {
		log.Printf("Error counting customer: %v", err)
		return nil, 0, 0, fmt.Errorf("failed to count customer: %v", err)
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

	_, err = query.OrderBy(orderByClause).Limit(pageSize, offset).All(&customer)
	if err != nil {
		log.Printf("Error fetching customer: %v", err)
		return nil, 0, 0, fmt.Errorf("failed to fetch customer: %v", err)
	}

	lastPage := (int(totalRecords) + pageSize - 1) / pageSize

	var customerResponse []response.CustomerResponse
	for _, customer := range customer {
		customerResponse = append(customerResponse, response.CustomerResponse{
			Id:        customer.Id,
			Name:      customer.Name,
			Email:     customer.Email,
			Phone:     customer.Phone,
			Address:   customer.Address,
			CreatedAt: customer.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return customerResponse, lastPage, int(totalRecords), nil
}

func UpdateCustomer(id int, customerRequest request.CreateCustomerRequest) (response.CustomerResponse, error) {
	o := orm.NewOrm()
	customer := models.Customer{Id: id}

	err := o.Read(&customer)
	if err == orm.ErrNoRows {
		return response.CustomerResponse{}, fmt.Errorf("customer not found")
	} else if err != nil {
		return response.CustomerResponse{}, fmt.Errorf("database error: %v", err)
	}
	customer.Name = customerRequest.Name
	customer.Email = customerRequest.Email
	customer.Phone = customerRequest.Phone
	customer.Address = customerRequest.Address
	// user.UpdatedAt = time.Now().Format("2006-01-02 15:04:05")

	_, err = o.Update(&customer)
	if err != nil {
		return response.CustomerResponse{}, fmt.Errorf("failed to update movie: %v", err)
	}
	responseCustomer := &response.CustomerResponse{
		Id:        customer.Id,
		Name:      customer.Name,
		Email:     customer.Email,
		Phone:     customer.Phone,
		Address:   customer.Address,
		CreatedAt: customer.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return *responseCustomer, nil
}

func DeleteCustomer(id int) error {
	o := orm.NewOrm()
	existingCustomer := models.Customer{Id: id}
	if err := o.Read(&existingCustomer); err != nil {
		if err == orm.ErrNoRows {
			return errors.New("customer not found")
		}
		return err
	}
	if _, err := o.Delete(&existingCustomer); err != nil {
		return err
	}
	return nil
}

func GetCustomerById(id int) (response.CustomerResponse,error){
	o :=orm.NewOrm()
	customer := models.Customer{Id: id}

	err := o.Read(&customer)
	if err == orm.ErrNoRows {
		return response.CustomerResponse{}, fmt.Errorf("lead not found")
	} else if err != nil {
		return response.CustomerResponse{}, fmt.Errorf("database error: %v", err)
	}

	customerResponse := response.CustomerResponse{
		Id:        customer.Id,
		Name:      customer.Name,
		Email:     customer.Email,
		Phone:     customer.Phone,
		Address:   customer.Address,
		CreatedAt: customer.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return customerResponse, nil
}
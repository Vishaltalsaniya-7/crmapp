package managers

import (
	"fmt"
	"log"
	"time"

	"github.com/Vishaltalsaniya-7/crmapp/models"
	"github.com/Vishaltalsaniya-7/crmapp/request"
	"github.com/Vishaltalsaniya-7/crmapp/response"
	"github.com/beego/beego/v2/client/orm"
)

type UserMgr struct {
}

func NewUserManager() *UserMgr {
	return &UserMgr{}
}

func (mn *UserMgr) CreateUser(req request.UserRequest) (response.UserResponse, error) {
	o := orm.NewOrm()

	log.Println("Starting user creation process...")

	existingUser := models.User{}
	log.Printf("Checking if user with email '%s' exists...\n", req.Email)
	err := o.QueryTable(&models.User{}).Filter("email", req.Email).One(&existingUser)
	if err == nil {
		log.Printf("User with email '%s' already exists.\n", req.Email)
		return response.UserResponse{}, fmt.Errorf("user with email '%s' already exists", req.Email)
	} else if err != orm.ErrNoRows {
		log.Printf("Error checking for existing user: %v\n", err)
		return response.UserResponse{}, err
	}

	log.Println("User does not exist, proceeding to create new user...")

	currentTime := time.Now()

	newUser := models.User{
		Name:      req.Name,
		Email:     req.Email,
		Password:  req.Password,
		Role:      req.Role,
		CreatedAt: currentTime.Format("2006-01-02 15:04:05"),
		UpdatedAt: currentTime.Format("2006-01-02 15:04:05"),
	}

	log.Println("Inserting new user into the database...")
	_, err = o.Insert(&newUser)
	if err != nil {
		log.Printf("Error inserting user into the database: %v\n", err)
		return response.UserResponse{}, err
	}

	log.Println("User successfully inserted, parsing timestamps...")

	createdAt, err := time.Parse("2006-01-02 15:04:05", newUser.CreatedAt)
	if err != nil {
		log.Printf("Error parsing CreatedAt: %v\n", err)
		return response.UserResponse{}, err
	}

	updatedAt, err := time.Parse("2006-01-02 15:04:05", newUser.UpdatedAt)
	if err != nil {
		log.Printf("Error parsing UpdatedAt: %v\n", err)
		return response.UserResponse{}, err
	}

	userresponse := response.UserResponse{
		ID:        newUser.Id,
		Name:      newUser.Name,
		Email:     newUser.Email,
		Role:      newUser.Role,
		CreatedAt: createdAt,
		UpdatedAt: updatedAt,
	}

	log.Println("User creation successful, returning response.")
	return userresponse, nil
}


func (mn *UserMgr) GetAllUser(pageSize int, pageNo int, order string, orderby string, searchQuery string, roleFilter string) ([]response.UserResponse, int, int, error) {
	o := orm.NewOrm()
	var users []models.User
	query := o.QueryTable(new(models.User))

	if searchQuery != "" {
		query = query.Filter("name__icontains", searchQuery)
		// .Filter("email__icontains", searchQuery)
	}

	if roleFilter != "" {
		query = query.Filter("role", roleFilter)
	}

	totalRecords, err := query.Count()
	if err != nil {
		return nil, 0, 0, fmt.Errorf("failed to count users: %v", err)
	}

	if order == "" {
		order = "asc" // Default order
	}
	if orderby == "" {
		orderby = "id" // Default sorting by ID
	}
	orderByClause := fmt.Sprintf("%s %s", orderby, order)

	offset := (pageNo - 1) * pageSize

	_, err = query.OrderBy(orderByClause).Limit(pageSize, offset).All(&users)
	if err != nil {
		return nil, 0, 0, fmt.Errorf("failed to fetch users: %v", err)
	}

	lastPage := (int(totalRecords) + pageSize - 1) / pageSize

	var userResponses []response.UserResponse
	for _, user := range users {
		createdAt, err := time.Parse("2006-01-02 15:04:05", user.CreatedAt)
		if err != nil {
			log.Printf("Error parsing CreatedAt: %v", err)
			return nil, 0, 0, err
		}
		updatedAt, err := time.Parse("2006-01-02 15:04:05", user.UpdatedAt)
		if err != nil {
			log.Printf("Error parsing UpdatedAt: %v", err)
			return nil, 0, 0, err
		}

		userResponses = append(userResponses, response.UserResponse{
			ID:        user.Id,
			Name:      user.Name,
			Email:     user.Email,
			Role:      user.Role,
			CreatedAt: createdAt,			UpdatedAt: updatedAt,
		})
	}

	return userResponses, lastPage, int(totalRecords), nil
}
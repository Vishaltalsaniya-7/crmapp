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

	// currentTime := time.Now()

	newUser := models.User{
		Username:  req.Username,
		Email:     req.Email,
		Password:  req.Password,
		Role:      req.Role,
		CreatedAt: time.Time{},
		// UpdatedAt: currentTime.Format("2006-01-02 15:04:05"),
	}

	log.Println("Inserting new user into the database...")
	_, err = o.Insert(&newUser)
	if err != nil {
		log.Printf("Error inserting user into the database: %v\n", err)
		return response.UserResponse{}, err
	}

	log.Println("User successfully inserted, parsing timestamps...")

	// createdAt, err := time.Parse("2006-01-02 15:04:05", newUser.CreatedAt)
	// if err != nil {
	// 	log.Printf("Error parsing CreatedAt: %v\n", err)
	// 	return response.UserResponse{}, err
	// }

	// updatedAt, err := time.Parse("2006-01-02 15:04:05", newUser.UpdatedAt)
	// if err != nil {
	// 	log.Printf("Error parsing UpdatedAt: %v\n", err)
	// 	return response.UserResponse{}, err
	// }

	userresponse := response.UserResponse{
		Id:        newUser.Id,
		Username:  newUser.Username,
		Email:     newUser.Email,
		Role:      newUser.Role,
		CreatedAt: newUser.CreatedAt.Format("2006-01-02 15:04:05"),
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
	}

	if roleFilter != "" {
		query = query.Filter("role", roleFilter)
	}

	totalRecords, err := query.Count()
	if err != nil {
		log.Printf("Error counting users: %v", err)
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

	_, err = query.OrderBy(orderByClause).Limit(pageSize, offset).All(&users)
	if err != nil {
		log.Printf("Error fetching users: %v", err)
		return nil, 0, 0, fmt.Errorf("failed to fetch users: %v", err)
	}

	lastPage := (int(totalRecords) + pageSize - 1) / pageSize

	var userResponses []response.UserResponse
	for _, user := range users {
		userResponses = append(userResponses, response.UserResponse{
			Id:        user.Id,
			Username:  user.Username,
			Email:     user.Email,
			Role:      user.Role,
			CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
		})
	}

	return userResponses, lastPage, int(totalRecords), nil
}

func (mn *UserMgr) UpdateUser(id int, req request.UserRequest) (response.UserResponse, error) {
	o := orm.NewOrm()

	user := models.User{Id: id}
	err := o.Read(&user)
	if err == orm.ErrNoRows {
		return response.UserResponse{}, fmt.Errorf("user not found")
	} else if err != nil {
		return response.UserResponse{}, fmt.Errorf("database error: %v", err)
	}
	user.Username = req.Username
	user.Email = req.Email
	user.Role = req.Role
	user.Password = req.Password
	// user.UpdatedAt = time.Now().Format("2006-01-02 15:04:05")

	_, err = o.Update(&user)
	if err != nil {
		return response.UserResponse{}, fmt.Errorf("failed to update movie: %v", err)
	}
	responseUser := &response.UserResponse{
		Id:        user.Id,
		Username:  user.Username,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return *responseUser, nil
}

func (mn *UserMgr) DeleteUser(id int) error {
	o := orm.NewOrm()
	existingUser := models.User{Id: id}
	if err := o.Read(&existingUser); err != nil {
		if err == orm.ErrNoRows {
			return errors.New("user not found")
		}
		return err
	}
	if _, err := o.Delete(&existingUser); err != nil {
		return err
	}
	return nil
}

func (mn *UserMgr) GetUserById(id int) (response.UserResponse, error) {
	o := orm.NewOrm()
	user := models.User{Id: id}

	err := o.Read(&user)
	if err == orm.ErrNoRows {
		return response.UserResponse{}, fmt.Errorf("lead not found")
	} else if err != nil {
		return response.UserResponse{}, fmt.Errorf("database error: %v", err)
	}

	leadResponse := response.UserResponse{
		Id:        user.Id,
		Username:  user.Username,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return leadResponse, nil
}
func(mn *UserMgr)UpdateUserRole(id int,req request.UserRequest)(response.UserResponse,error){
	o := orm.NewOrm()

	user := models.User{Id: id}
	err := o.Read(&user)
	if err == orm.ErrNoRows {
		return response.UserResponse{}, fmt.Errorf("user not found")
	} else if err != nil {
		return response.UserResponse{}, fmt.Errorf("database error: %v", err)
	}
	// user.Username = req.Username
	// user.Email = req.Email
	user.Role = req.Role
	// user.Password = req.Password
	// user.UpdatedAt = time.Now().Format("2006-01-02 15:04:05")

	_, err = o.Update(&user)
	if err != nil {
		return response.UserResponse{}, fmt.Errorf("failed to update movie: %v", err)
	}
	responseUser := &response.UserResponse{
		Id:        user.Id,
		Username:  user.Username,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt.Format("2006-01-02 15:04:05"),
	}

	return *responseUser, nil
}

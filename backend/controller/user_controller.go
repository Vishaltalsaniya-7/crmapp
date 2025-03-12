package controller

import (
	"log"
	"net/http"
	"strconv"

	"github.com/Vishaltalsaniya-7/crmapp/managers"
	"github.com/Vishaltalsaniya-7/crmapp/request"
	"github.com/go-playground/validator"
	"github.com/labstack/echo/v4"
)

var validate = validator.New()

type UserCont struct {
	managers *managers.UserMgr
}

func NewUserController(mn *managers.UserMgr) *UserCont {
	return &UserCont{managers: mn}
}
func (us *UserCont) CreateUser(c echo.Context) error {
	userEmail, ok := c.Get("user_email").(string)
	if !ok || userEmail == "" {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Unauthorized"})
	}
	var req request.UserRequest

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	log.Println("req----->")

	if err := validate.Struct(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	user, err := us.managers.CreateUser(req)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, user)
}

func (us *UserCont) GetAllUser(c echo.Context) error {
	pageSize := c.QueryParam("per_page")
	pageNo := c.QueryParam("page_no")
	order := c.QueryParam("order")
	orderby := c.QueryParam("orderby")
	searchQuery := c.QueryParam("search")
	roleFilter := c.QueryParam("role")

	pageSizeInt, err := strconv.Atoi(pageSize)
	if err != nil || pageSizeInt <= 0 {
		pageSizeInt = 10
	}
	pageNoInt, err := strconv.Atoi(pageNo)
	if err != nil || pageNoInt <= 0 {
		pageNoInt = 1
	}

	users, lastPage, totalDocuments, err := us.managers.GetAllUser(pageSizeInt, pageNoInt, order, orderby, searchQuery, roleFilter)
	if err != nil {
		log.Printf("Error fetching users: %v", err)

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"page_no":         pageNoInt,
		"per_page":        pageSizeInt,
		"last_page":       lastPage,
		"total_documents": totalDocuments,
		"users":           users,
	})
}

func (us *UserCont) UpdateUser(c echo.Context) error {
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	var req request.UserRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	if err := validate.Struct(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	updateduser, err := us.managers.UpdateUser(id, req)
	if err != nil {

		return c.JSON(http.StatusNotFound, map[string]string{"error": "User Not Found"})

	}

	return c.JSON(http.StatusOK, updateduser)
}

func (us *UserCont) DeleteUser(c echo.Context) error {
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}

	if err := us.managers.DeleteUser(id); err != nil {

		return c.JSON(http.StatusNotFound, map[string]string{"error": "user not found"})

	}
	return c.JSON(http.StatusOK, map[string]string{"message": "Useer successfully deleted"})
}

func(us *UserCont) GetUserById(c echo.Context) error{
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	leadResponse, err := us.managers.GetUserById(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Lead not found"})
	}
	return c.JSON(http.StatusOK, leadResponse)
}
func(us *UserCont)UpdateUserRole(c echo.Context) error{
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	var req request.UserRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	if err := validate.Struct(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	updateduser, err := us.managers.UpdateUserRole(id, req)
	if err != nil {

		return c.JSON(http.StatusNotFound, map[string]string{"error": "User Not Found"})

	}

	return c.JSON(http.StatusOK, updateduser)	
}

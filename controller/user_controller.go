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
func (us *UserCont)CreateUser(c echo.Context) error {
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



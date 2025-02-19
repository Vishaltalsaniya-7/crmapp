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

var validater = validator.New()

func CreateCustomer(c echo.Context) error {
	var customerRequest request.CreateCustomerRequest

	if err := c.Bind(&customerRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	log.Println("req----->")

	if err := validater.Struct(customerRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	customer, err := managers.CreateCustomer(customerRequest)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, customer)
}

func GetAllCustomer(c echo.Context) error {
	pageSize := c.QueryParam("per_page")
	pageNo := c.QueryParam("page_no")
	order := c.QueryParam("order")
	orderby := c.QueryParam("orderby")
	searchQuery := c.QueryParam("search")
	addressFilter := c.QueryParam("address")

	pageSizeInt, err := strconv.Atoi(pageSize)
	if err != nil || pageSizeInt <= 0 {
		pageSizeInt = 10
	}
	pageNoInt, err := strconv.Atoi(pageNo)
	if err != nil || pageNoInt <= 0 {
		pageNoInt = 1
	}

	customers, lastPage, totalDocuments, err := managers.GetAllCustomer(pageSizeInt, pageNoInt, order, orderby, searchQuery, addressFilter)
	if err != nil {
		log.Printf("Error fetching customers: %v", err)

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"page_no":         pageNoInt,
		"per_page":        pageSizeInt,
		"last_page":       lastPage,
		"total_documents": totalDocuments,
		"customers":       customers,
	})
}

func UpdateCustomer(c echo.Context) error {

	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	var customerRequest request.CreateCustomerRequest

	if err := c.Bind(&customerRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	log.Println("req----->")

	if err := validater.Struct(customerRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	updatecustomer, err := managers.UpdateCustomer(id, customerRequest)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "customer Not Found"})
	}
	return c.JSON(http.StatusCreated, updatecustomer)
}

func DeleteCustomer(c echo.Context) error {
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid customer ID"})
	}

	if err := managers.DeleteCustomer(id); err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "customer not found"})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "Useer successfully deleted"})
}

func GetCustomerById(c echo.Context) error{
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	leadResponse, err := managers.GetCustomerById(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Customer not found"})
	}
	return c.JSON(http.StatusOK, leadResponse)

}
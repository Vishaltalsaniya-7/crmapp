package controller

import (
	"log"
	"net/http"
	"strconv"

	"github.com/Vishaltalsaniya-7/crmapp/managers"
	"github.com/Vishaltalsaniya-7/crmapp/request"
	"github.com/labstack/echo/v4"
)

func CreateLead(c echo.Context) error {
	var leadRequest request.LeadRequest

	if err := c.Bind(&leadRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	log.Println("req----->")

	if err := validater.Struct(leadRequest); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	lead, err := managers.CreateLead(leadRequest)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, lead)
}

func GetLead(c echo.Context) error {
	pageSize := c.QueryParam("per_page")
	pageNo := c.QueryParam("page_no")
	order := c.QueryParam("order")
	orderby := c.QueryParam("orderby")
	searchQuery := c.QueryParam("search")

	pageSizeInt, err := strconv.Atoi(pageSize)
	if err != nil || pageSizeInt <= 0 {
		pageSizeInt = 10
	}
	pageNoInt, err := strconv.Atoi(pageNo)
	if err != nil || pageNoInt <= 0 {
		pageNoInt = 1
	}

	lead, lastPage, totalDocuments, err := managers.GetLead(pageSizeInt, pageNoInt, order, orderby, searchQuery)
	if err != nil {
		log.Printf("Error fetching users: %v", err)

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"page_no":         pageNoInt,
		"per_page":        pageSizeInt,
		"last_page":       lastPage,
		"total_documents": totalDocuments,
		"lead":            lead,
	})
}

func UpdateLead(c echo.Context) error {
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	var req request.LeadRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	if err := validate.Struct(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	updatelead, err := managers.UpdateLead(id, req)
	if err != nil {

		return c.JSON(http.StatusNotFound, map[string]string{"error": "Lead Not Found"})

	}

	return c.JSON(http.StatusOK, updatelead)
}

func GetLeadById(c echo.Context) error {
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	leadResponse, err := managers.GetLeadById(id)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Lead not found"})
	}
	return c.JSON(http.StatusOK, leadResponse)

}

func DeleteLead(c echo.Context) error {
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)

	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid customer ID"})
	}

	if err := managers.DeleteLead(id); err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "lead not found"})
	}
	return c.JSON(http.StatusOK, map[string]string{"message": "Useer successfully deleted"})

}

func UpdateLeadStatus( c echo.Context) error{
	idparam := c.Param("id")
	id, err := strconv.Atoi(idparam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid User ID"})
	}
	var req request.LeadRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request payload"})
	}
	if err := validate.Struct(req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	updatedlead, err := managers.UpdateLeadStatus(id,req)
	if err != nil {

		return c.JSON(http.StatusNotFound, map[string]string{"error": "lead Not Found"})

	}

	return c.JSON(http.StatusOK, updatedlead)		
}

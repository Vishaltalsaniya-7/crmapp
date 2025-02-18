 package controller

// import (
// 	"net/http"

// 	"github.com/Vishaltalsaniya-7/crmapp/managers"
// 	"github.com/Vishaltalsaniya-7/crmapp/request"
// 	"github.com/Vishaltalsaniya-7/crmapp/response"
// 	"github.com/astaxie/beego/validation"
// 	"github.com/beego/beego/v2/server/web"
// )

// type AuthController struct {
// 	web.Controller
// }

// func (c *AuthController) Login() {
// 	var req request.SessionRequest
// 	if err := c.ParseForm(&req); err != nil {
// 		c.Ctx.ResponseWriter.WriteHeader(http.StatusBadRequest)
// 		c.Data["json"] = map[string]interface{}{"error": "Invalid request"}
// 		c.ServeJSON()
// 		return
// 	}

// 	// Validate input
// 	valid := validation.Validation{}
// 	if v, _ := valid.Valid(&req); !v {
// 		c.Ctx.ResponseWriter.WriteHeader(http.StatusBadRequest)
// 		c.Data["json"] = map[string]interface{}{"error": "Validation failed", "details": valid.Errors}
// 		c.ServeJSON()
// 		return
// 	}

// 	// Call manager to authenticate and generate JWT token
// 	expires_at,token, err := managers.AuthenticateUser(req.Email, req.Password)
// 	if err != nil {
// 		c.Ctx.ResponseWriter.WriteHeader(http.StatusUnauthorized)
// 		c.Data["json"] = map[string]interface{}{"error": err.Error()}
// 		c.ServeJSON()
// 		return
// 	}

// 	// Respond with token
// 	c.Data["json"] = response.SessionResponse{Token: token,ExpiresAt: expires_at}
// 	c.ServeJSON()
// }

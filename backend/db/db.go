package db

import (
	"fmt"

	"github.com/Vishaltalsaniya-7/crmapp/config"
	"github.com/beego/beego/v2/client/orm"
	_ "github.com/go-sql-driver/mysql"
)

func Connect() error {
	cfg, err := config.LoadConfig()
	if err != nil {
		return fmt.Errorf("failed to load configuration: %v", err)
	}

	connectionString := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8",
		cfg.Mysql.DB_USER, cfg.Mysql.DB_PASSWORD, cfg.Mysql.DB_HOST, cfg.Mysql.DB_PORT, cfg.Mysql.DB_NAME)

	if err := orm.RegisterDataBase("default", "mysql", connectionString); err != nil {
		return fmt.Errorf("failed to register database: %v", err)
	}
	// orm.RegisterModel(new(models.User), new(models.Customer), new(models.Lead))
	orm.Debug = true
	return orm.RunSyncdb("default", false, true)
}

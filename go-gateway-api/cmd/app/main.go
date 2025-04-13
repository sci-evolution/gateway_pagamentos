package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq" // driver PostgreSQL
	"github.com/wellington-evolution/go-gateway-api/internal/repository"
	"github.com/wellington-evolution/go-gateway-api/internal/service"
	"github.com/wellington-evolution/go-gateway-api/internal/web/server"
)

func main() {
	// Load .env file if it exists
	godotenv.Load() // ignoring error as env vars may come from the environment

	// Database connection
	connString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_SSLMODE"),
	)
	db, err := sql.Open("postgres", connString)

	if err != nil {
		log.Fatal("Error opening database:", err)
	}

	defer db.Close()

	accountRepository := repository.NewAccountRepository(db)
	accountService := service.NewAccountService(accountRepository)

	invoiceRepository := repository.NewInvoiceRepository(db)
	invoiceService := service.NewInvoiceService(invoiceRepository, *accountService)

	port := os.Getenv("HTTP_PORT")
	srv := server.NewServer(accountService, invoiceService, port)
	srv.ConfigureRoutes()

	if err := srv.Start(); err != nil {
		log.Fatal("Error starting server:", err)
	}
}

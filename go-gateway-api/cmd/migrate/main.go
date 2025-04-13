package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/wellington-evolution/go-gateway-api/internal/database"
)

func main() {
	// Load .env file if it exists
	godotenv.Load()

	// Database connection string
	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_SSLMODE"),
	)

	if err := database.RunMigrations(dbURL); err != nil {
		log.Fatal("Error running migrations:", err)
	}
}

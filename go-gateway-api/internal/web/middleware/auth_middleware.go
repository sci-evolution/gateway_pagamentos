package middleware

import (
	"log"
	"net/http"

	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/domain"
	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/service"
)

type AuthMiddleware struct {
	accountService *service.AccountService
}

func NewAuthMiddleware(accountService *service.AccountService) *AuthMiddleware {
	return &AuthMiddleware{accountService: accountService}
}

func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		apiKey := r.Header.Get("X-API-Key")
		if apiKey == "" {
			log.Println("No API key provided in request")
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		log.Printf("Authenticating request with API Key: %s", apiKey)
		account, err := m.accountService.FindByAPIKey(apiKey)

		if err != nil {
			log.Printf("Error authenticating account: %v", err)
			if err == domain.ErrAccountNotFound {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}

			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		log.Printf("Successfully authenticated account: %s", account.ID)
		next.ServeHTTP(w, r)
	})
}

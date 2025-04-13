package middleware

import (
	"fmt"
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
			fmt.Println("No API key provided")
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		_, err := m.accountService.FindByAPIKey(apiKey)
		if err != nil {
			fmt.Println("Error on find account", err)
			if err == domain.ErrAccountNotFound {
				http.Error(w, err.Error(), http.StatusUnauthorized)
				return
			}

			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		next.ServeHTTP(w, r)
	})
}

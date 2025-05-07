package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/dto"
	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/service"
)

type AccountHandler struct {
	accountService *service.AccountService
}

func NewAccountHandler(accountService *service.AccountService) *AccountHandler {
	return &AccountHandler{accountService: accountService}
}

func (h *AccountHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input dto.CreateAccountInput

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		log.Printf("error decoding request body: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	output, err := h.accountService.CreateAccount(input)

	if err != nil {
		log.Printf("error creating account: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(output)
}

func (h *AccountHandler) Get(w http.ResponseWriter, r *http.Request) {
	apiKey := r.Header.Get("X-API-Key")

	if apiKey == "" {
		log.Println("API Key is required")
		http.Error(w, "API Key is required", http.StatusUnauthorized)
		return
	}

	log.Printf("Processing request with API Key: %s", apiKey)

	output, err := h.accountService.FindByAPIKey(apiKey)

	if err != nil {
		log.Printf("Error finding account: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(output)
}

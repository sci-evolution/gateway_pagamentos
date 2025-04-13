package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/service"
	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/web/handlers"
	authMiddleware "github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/web/middleware"
)

type Server struct {
	router         *chi.Mux
	server         *http.Server
	accountService *service.AccountService
	invoiceService *service.InvoiceService
	port           string
}

func NewServer(accountService *service.AccountService, invoiceService *service.InvoiceService, port string) *Server {
	return &Server{
		router:         chi.NewRouter(),
		accountService: accountService,
		invoiceService: invoiceService,
		port:           port,
	}
}

func (s *Server) ConfigureRoutes() {
	authMiddleware := authMiddleware.NewAuthMiddleware(s.accountService)
	accountHandler := handlers.NewAccountHandler(s.accountService)
	invoiceHandler := handlers.NewInvoiceHandler(s.invoiceService)

	// Accounts
	s.router.Post("/accounts", accountHandler.Create)
	s.router.Get("/accounts", accountHandler.Get)

	// Invoices
	s.router.Group(func(r chi.Router) {
		r.Use(authMiddleware.Authenticate)
		r.Post("/invoices", invoiceHandler.Create)
		r.Get("/invoices", invoiceHandler.ListByAccount)
		r.Get("/invoices/{id}", invoiceHandler.GetByID)
	})
}

func (s *Server) Start() error {
	s.ConfigureRoutes()

	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: s.router,
	}

	return s.server.ListenAndServe()
}

package service

import (
	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/domain"
	"github.com/wellington-evolution/gateway_pagamentos/go-gateway-api/internal/dto"
)

type InvoiceService struct {
	invoiceRepository domain.InvoiceRepository
	accountService    AccountService
}

func NewInvoiceService(invoiceRepository domain.InvoiceRepository, accountService AccountService) *InvoiceService {
	return &InvoiceService{
		invoiceRepository: invoiceRepository,
		accountService:    accountService,
	}
}

func (s *InvoiceService) Create(input dto.InvoiceInput) (*dto.InvoiceOutput, error) {
	accountOutput, err := s.accountService.FindByAPIKey(input.APIKey)
	if err != nil {
		return nil, err
	}

	invoice, err := dto.ToInvoice(input, accountOutput.ID)
	if err != nil {
		return nil, err
	}

	if err := invoice.Process(); err != nil {
		return nil, err
	}

	if invoice.Status == domain.StatusApproved {
		_, err = s.accountService.UpdateBalance(input.APIKey, invoice.Amount)
		if err != nil {
			return nil, err
		}
	}

	if err := s.invoiceRepository.Save(invoice); err != nil {
		return nil, err
	}

	output := dto.FromInvoice(invoice)
	return &output, nil
}

func (s *InvoiceService) GetByID(id, apikey string) (*dto.InvoiceOutput, error) {
	invoice, err := s.invoiceRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	accountOutput, err := s.accountService.FindByAPIKey(apikey)
	if err != nil {
		return nil, err
	}

	if invoice.AccountID != accountOutput.ID {
		return nil, domain.ErrUnauthorizedAccess
	}

	output := dto.FromInvoice(invoice)
	return &output, nil
}

// List all invoices by account ID
func (s *InvoiceService) ListByAccountI(accountID string) ([]*dto.InvoiceOutput, error) {
	invoices, err := s.invoiceRepository.FindByAccountID(accountID)
	if err != nil {
		return nil, err
	}

	output := make([]*dto.InvoiceOutput, len(invoices))
	for i, invoice := range invoices {
		toOutput := dto.FromInvoice(invoice)
		output[i] = &toOutput
	}

	return output, nil
}

// List by AccountAPIKey and return all invoices of an account by an API key
func (s *InvoiceService) ListByAccountAPIKey(apikey string) ([]*dto.InvoiceOutput, error) {
	accountOutput, err := s.accountService.FindByAPIKey(apikey)
	if err != nil {
		return nil, err
	}

	return s.ListByAccountI(accountOutput.ID)
}

package domain

import "errors"

var (
	// ErrAccountNotFound is returned when an account is not found
	ErrAccountNotFound = errors.New("account not found")

	// ErrDuplicateAPIKey is returned when a duplicate API key is found
	ErrDuplicateAPIKey = errors.New("api key already exists")

	// ErrInvoiceNotFound is returned when an invoice is not found
	ErrInvoiceNotFound = errors.New("invoice not found")

	// ErrUnauthorizedAccess is returned when an unauthorized access is attempted
	ErrUnauthorizedAccess = errors.New("unauthorized access")

	// ErrInvalidAmount is returned when an invalid amount is provided
	ErrInvalidAmount = errors.New("invalid amount")

	// ErrInvalidStatus is returned when an invalid status is provided
	ErrInvalidStatus = errors.New("invalid status")
)

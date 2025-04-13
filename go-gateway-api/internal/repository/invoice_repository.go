package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/wellington-evolution/go-gateway-api/internal/domain"
)

type InvoiceRepository struct {
	db *sql.DB
}

func NewInvoiceRepository(db *sql.DB) *InvoiceRepository {
	return &InvoiceRepository{db: db}
}

func (r *InvoiceRepository) Save(invoice *domain.Invoice) error {
	_, err := r.db.Exec(
		`INSERT INTO invoices (id, account_id, amount, status, description, payment_type, card_last_digits, created_at, updated_at)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
		invoice.ID,
		invoice.AccountID,
		invoice.Amount,
		invoice.Status,
		invoice.Description,
		invoice.PaymentType,
		invoice.CardLastDigits,
		invoice.CreatedAt,
		invoice.UpdatedAt,
	)

	if err != nil {
		fmt.Println("Error on saving invoice:", err)
		return err
	}

	return nil
}

func (r *InvoiceRepository) FindByID(id string) (*domain.Invoice, error) {
	var invoice domain.Invoice
	var createdAt, updatedAt time.Time
	err := r.db.QueryRow(
		`SELECT id, account_id, amount, status, description, payment_type, card_last_digits, created_at, updated_at
		 FROM invoices WHERE id = $1`,
		id,
	).Scan(
		&invoice.ID,
		&invoice.AccountID,
		&invoice.Amount,
		&invoice.Status,
		&invoice.Description,
		&invoice.PaymentType,
		&invoice.CardLastDigits,
		&createdAt,
		&updatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, domain.ErrInvoiceNotFound
	}

	if err != nil {
		fmt.Println("Error scanning row:", err)
		return nil, err
	}

	invoice.CreatedAt = createdAt
	invoice.UpdatedAt = updatedAt

	return &invoice, nil
}

func (r *InvoiceRepository) FindByAccountID(accountID string) ([]*domain.Invoice, error) {
	rows, err := r.db.Query(
		`SELECT id, account_id, amount, status, description, payment_type, card_last_digits, created_at, updated_at
		 FROM invoices WHERE account_id = $1`,
		accountID,
	)

	if err != nil {
		fmt.Println("Error querying invoices:", err)
		return nil, err
	}
	defer rows.Close()

	invoices := []*domain.Invoice{}

	for rows.Next() {
		var invoice domain.Invoice
		var createdAt, updatedAt time.Time

		err := rows.Scan(
			&invoice.ID,
			&invoice.AccountID,
			&invoice.Amount,
			&invoice.Status,
			&invoice.Description,
			&invoice.PaymentType,
			&invoice.CardLastDigits,
			&createdAt,
			&updatedAt,
		)

		if err != nil {
			fmt.Println("Error scanning row:", err)
			return nil, err
		}

		invoice.CreatedAt = createdAt
		invoice.UpdatedAt = updatedAt

		invoices = append(invoices, &invoice)
	}

	if err = rows.Err(); err != nil {
		fmt.Println("Error iterating rows:", err)
		return nil, err
	}

	return invoices, nil
}

func (r *InvoiceRepository) UpdateStatus(invoice *domain.Invoice) error {
	tx, err := r.db.Begin()
	if err != nil {
		fmt.Println("Error on starting transaction:", err)
		return err
	}
	defer tx.Rollback()

	var currentStatus string
	err = tx.QueryRow(
		`SELECT status FROM invoices WHERE id = $1 FOR UPDATE`,
		invoice.ID,
	).Scan(&currentStatus)

	if err == sql.ErrNoRows {
		fmt.Println("Invoice not found")
		return domain.ErrInvoiceNotFound
	}

	if err != nil {
		fmt.Println("Error scanning row:", err)
		return err
	}

	if currentStatus != "pending" {
		return domain.ErrInvalidStatus
	}

	_, err = tx.Exec(
		`UPDATE invoices SET status = $1, updated_at = $2 WHERE id = $3`,
		invoice.Status,
		time.Now(),
		invoice.ID,
	)

	if err != nil {
		fmt.Println("Error updating invoice status:", err)
		return err
	}

	return tx.Commit()
}

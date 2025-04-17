# syntax=docker/dockerfile:1

# Build stage
FROM golang:1.24-alpine AS builder

# Set necessary environment variables for Go
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Set working directory
WORKDIR /build

# Install necessary build tools
RUN apk add --no-cache git

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN go build -o main ./cmd/app/main.go

# Final stage
FROM alpine:3.21

# Add non root user
RUN adduser -D -g '' appuser

# Add CA certificates
RUN apk add --no-cache ca-certificates

# Set working directory
WORKDIR /app

# Copy the binary from builder
COPY --from=builder /build/main .
COPY --from=builder /build/migrations ./migrations

# Use non root user
USER appuser

# Expose API port
EXPOSE 8080

# Command to run the application
CMD ["./main"]
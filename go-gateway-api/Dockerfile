# syntax=docker/dockerfile:1

# Build stage - common base
FROM golang:1.24-alpine AS base
WORKDIR /app

# Set necessary environment variables for Go
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Install necessary build tools
RUN apk add --no-cache git

# Copy go mod and sum files for dependency caching
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

# Development stage
FROM base AS development
# Install Air for live-reloading during development
RUN --mount=type=cache,target=/go/pkg/mod \
    go install github.com/air-verse/air@latest

# Initialize Air config and modify it for correct build command
RUN air init && \
    sed -i 's#cmd = "go build -o ./tmp/main ."#cmd = "go build -o ./tmp/main ./cmd/app"#' .air.toml

# Copy source code
COPY . .
EXPOSE 8080
CMD ["air"]

# Build stage
FROM base AS builder
COPY . .
RUN --mount=type=cache,target=/root/.cache/go-build \
    go build -o /app/main ./cmd/app/main.go

# Production stage - using minimal scratch image
FROM alpine:3.19 AS production
WORKDIR /app

# Add CA certificates and create non-root user
RUN apk add --no-cache ca-certificates && \
    adduser -D -g '' appuser

# Copy only the built binary from builder stage
COPY --from=builder /app/main .

# Use non-root user
USER appuser
EXPOSE 8080
CMD ["./main"]
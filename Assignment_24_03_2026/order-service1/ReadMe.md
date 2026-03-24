Problem Statement

Design and implement a Spring Boot REST API to manage Customer Orders for an e-commerce platform. Follow Test Driven Development (TDD) strictly:

1. Implement minimum production code
2. Make tests pass
3. Refactor while keeping tests green

Functional Requirements
1. Create Order

Endpoint:
POST /api/orders

Request DTO

{
  "customerName": "Ankit",
  "email": "ankit@gmail.com",
  "productName": "Laptop",
  "quantity": 2,
  "pricePerUnit": 45000
}

Constraints
=====================
1. customerName – Required, min length 3
2. email – Required, must be valid
3. productName – Required
4. quantity – Required, > 0
5. pricePerUnit – Required, > 0

Behavior
====================
1. Convert DTO → Entity
2. Save Order
3. Return Created Order with generated orderId and totalAmount

Response DTO
{
  "orderId": 1,
  "customerName": "Ankit",
  "email": "ankit@gmail.com",
  "productName": "Laptop",
  "quantity": 2,
  "pricePerUnit": 45000,
  "totalAmount": 90000
}

2. Get Order by Id
Endpoint:
GET /api/orders/{id}
If order exists → return details
If order not found → throw custom exception OrderNotFoundException

3. Delete Order
Endpoint:
DELETE /api/orders/{id}
If order exists → delete and return message
If not found → throw OrderNotFoundException

Entity
***********
OrderEntity
- id (PK)
- customerName
- email
- productName
- quantity
- pricePerUnit
- totalAmount
DTO
- OrderRequestDTO
- OrderResponseDTO

Layers Required

Controller
Service
Repository (JPA)
Mapper (manual or ModelMapper)

Exception Handling
************************
OrderNotFoundException
GlobalExceptionHandler using @RestControllerAdvice
Return structure:
{
  "timestamp": "2025-01-19",
  "message": "Order not found",
  "status": 404
}
For validation errors return:
{
  "timestamp":,
  "errors": [
      "customerName must not be blank",
      "quantity must be greater than 0"
  ]
}

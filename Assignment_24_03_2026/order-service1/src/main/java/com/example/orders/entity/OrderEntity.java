package com.example.orders.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String email;
    private String productName;
    private Integer quantity;
    private Double pricePerUnit;
    private Double totalAmount;

    public OrderEntity(String customerName, String email, String productName, Integer quantity, Double pricePerUnit, Double totalAmount) {
        this.customerName = customerName;
        this.email = email;
        this.productName = productName;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.totalAmount = totalAmount;
    }
}

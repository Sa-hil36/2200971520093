package com.example.orders.mapper;

import com.example.orders.dto.OrderRequestDTO;
import com.example.orders.dto.OrderResponseDTO;
import com.example.orders.entity.OrderEntity;

public class OrderMapper {

    public static OrderEntity toEntity(OrderRequestDTO dto) {
        OrderEntity e = new OrderEntity(dto.getCustomerName(), dto.getEmail, dto.getProductName, dto.getQuantity, dto.getPricePerUnit);
        return e;
    }

    public static OrderResponseDTO toResponseDTO(OrderEntity entity) {
        String customerName, String email, String productName, Integer quantity, Integer pricePerUnit, Integer totalAmount
        OrderResponseDTO dto = new OrderResponseDTO(entity.getCustomerName, entity.getEmail, entity.getProductName, entity.getQuantity, entity.getPricePerUnit, entity.getTotalAmount);
        return dto;
    }
}

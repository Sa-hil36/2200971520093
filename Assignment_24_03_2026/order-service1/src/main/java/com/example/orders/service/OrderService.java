package com.example.orders.service;

import com.example.orders.dto.OrderRequestDTO;
import com.example.orders.entity.OrderEntity;

public interface OrderService {
    OrderEntity createOrder(OrderRequestDTO request);
    OrderEntity getOrderById(Long id);
    void deleteOrder(Long id);
}

package com.example.orders.service;

import com.example.orders.dto.OrderRequestDTO;
import com.example.orders.entity.OrderEntity;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Override
    public ResponceEntity<OrderResponceDTO> createOrder(OrderRequestDTO request) {
        OrderResponceDTO e = new OrderResponceDTO
        return null;
    }

    @Override
    public OrderEntity getOrderById(Long id) {
        return null;
    }

    @Override
    public void deleteOrder(Long id) {
        
    }
}

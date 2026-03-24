package com.example.orders;

import com.example.orders.dto.OrderRequestDTO;
import com.example.orders.entity.OrderEntity;
import com.example.orders.exception.OrderNotFoundException;
import com.example.orders.repository.OrderRepository;
import com.example.orders.service.OrderServiceImpl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository repository;

    @InjectMocks
    private OrderServiceImpl service;

    @Test
    void shouldCreateOrderSuccessfully() {
        OrderRequestDTO request = new OrderRequestDTO();
        request.setCustomerName("John");
        request.setEmail("john@gmail.com");
        request.setProductName("Laptop");
        request.setQuantity(2);
        request.setPricePerUnit(50000.0);

        OrderEntity saved = new OrderEntity();
        saved.setId(1L);
        saved.setCustomerName("John");
        saved.setEmail("john@gmail.com");
        saved.setProductName("Laptop");
        saved.setQuantity(2);
        saved.setPricePerUnit(50000.0);
        saved.setTotalAmount(100000.0);

        when(repository.save(any(OrderEntity.class))).thenReturn(saved);

        OrderEntity response = service.createOrder(request);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals(100000.0, response.getTotalAmount());
        verify(repository, times(1)).save(any(OrderEntity.class));
    }

    @Test
    void shouldReturnOrderWhenExists() {
        OrderEntity order = new OrderEntity();
        order.setId(1L);
        order.setCustomerName("John");

        when(repository.findById(1L)).thenReturn(Optional.of(order));

        OrderEntity result = service.getOrderById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void shouldThrowExceptionWhenOrderNotFound() {

        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(OrderNotFoundException.class,
                () -> service.getOrderById(99L));

        verify(repository, times(1)).findById(99L);
    }

    @Test
    void shouldDeleteOrderSuccessfully() {

        when(repository.existsById(1L)).thenReturn(true);

        service.deleteOrder(1L);

        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeleteOrderNotFound() {

        when(repository.existsById(99L)).thenReturn(false);

        assertThrows(OrderNotFoundException.class,
                () -> service.deleteOrder(99L));

        verify(repository, never()).deleteById(anyLong());
    }
}


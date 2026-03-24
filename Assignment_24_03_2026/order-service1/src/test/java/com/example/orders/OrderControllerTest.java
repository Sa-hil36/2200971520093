package com.example.orders;

import com.example.orders.controller.OrderController;
import com.example.orders.dto.OrderRequestDTO;
import com.example.orders.entity.OrderEntity;
import com.example.orders.exception.OrderNotFoundException;
import com.example.orders.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldCreateOrderSuccessfully() throws Exception {

        OrderRequestDTO request = new OrderRequestDTO();
        request.setCustomerName("John Doe");
        request.setEmail("john@gmail.com");
        request.setProductName("Laptop");
        request.setQuantity(2);
        request.setPricePerUnit(45000.0);

        OrderEntity savedOrder = new OrderEntity();
        savedOrder.setId(1L);
        savedOrder.setCustomerName("John Doe");
        savedOrder.setEmail("john@gmail.com");
        savedOrder.setProductName("Laptop");
        savedOrder.setQuantity(2);
        savedOrder.setPricePerUnit(45000.0);
        savedOrder.setTotalAmount(90000.0);

        Mockito.when(orderService.createOrder(any(OrderRequestDTO.class)))
                .thenReturn(savedOrder);

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.orderId", is(1)))
                .andExpect(jsonPath("$.customerName", is("John Doe")))
                .andExpect(jsonPath("$.totalAmount", is(90000.0)));
    }
   
    @Test
    void shouldReturnValidationError() throws Exception {

        OrderRequestDTO request = new OrderRequestDTO();
        request.setCustomerName("");   // invalid
        request.setEmail("wrong-email");
        request.setQuantity(0);

        mockMvc.perform(post("/api/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors", hasSize(greaterThan(0))));
    }
   
    @Test
    void shouldGetOrderSuccessfully() throws Exception {

        OrderEntity order = new OrderEntity();
        order.setId(1L);
        order.setCustomerName("John Doe");
        order.setEmail("john@gmail.com");
        order.setProductName("Laptop");
        order.setQuantity(2);
        order.setPricePerUnit(45000.0);
        order.setTotalAmount(90000.0);

        Mockito.when(orderService.getOrderById(1L)).thenReturn(order);

        mockMvc.perform(get("/api/orders/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId", is(1)))
                .andExpect(jsonPath("$.customerName", is("John Doe")));
    }

    @Test
    void shouldReturnOrderNotFound() throws Exception {

        Mockito.when(orderService.getOrderById(99L))
                .thenThrow(new OrderNotFoundException());

        mockMvc.perform(get("/api/orders/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldDeleteOrderSuccessfully() throws Exception {

        Mockito.doNothing().when(orderService).deleteOrder(1L);

        mockMvc.perform(delete("/api/orders/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Order deleted successfully"));
    }

    @Test
    void shouldReturn404WhenDeleteFails() throws Exception {

        Mockito.doThrow(new OrderNotFoundException())
                .when(orderService)
                .deleteOrder(99L);

        mockMvc.perform(delete("/api/orders/99"))
                .andExpect(status().isNotFound());
    }
}

package ma.rahioui.billingservice.web;

import ma.rahioui.billingservice.entities.Bill;
import ma.rahioui.billingservice.entities.ProductItem;
import ma.rahioui.billingservice.feign.CustomerRestClient;
import ma.rahioui.billingservice.feign.ProductRestClient;
import ma.rahioui.billingservice.model.Customer;
import ma.rahioui.billingservice.model.Product;
import ma.rahioui.billingservice.repository.BillRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class BillRestControllerTest {
    @Mock BillRepository billRepository;
    @Mock CustomerRestClient customerRestClient;
    @Mock ProductRestClient productRestClient;
    @InjectMocks BillRestController controller;

    private MockMvc mvc;

    @BeforeEach
    void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void missingBillReturnsNotFoundWithoutCallingOtherServices() throws Exception {
        when(billRepository.findById(42L)).thenReturn(Optional.empty());

        mvc.perform(get("/bills/42"))
                .andExpect(status().isNotFound());

        verifyNoInteractions(customerRestClient, productRestClient);
    }

    @Test
    void existingBillIncludesItsCustomerAndProducts() throws Exception {
        ProductItem item = ProductItem.builder().id(5L).productId("sku-1").quantity(2).unitPrice(12.5).build();
        Bill bill = Bill.builder().id(1L).customerId(3L).productItems(List.of(item)).build();
        Customer customer = new Customer();
        customer.setId(3L);
        customer.setName("Imane");
        Product product = new Product();
        product.setId("sku-1");
        product.setName("Printer");
        when(billRepository.findById(1L)).thenReturn(Optional.of(bill));
        when(customerRestClient.getCustomerById(3L)).thenReturn(customer);
        when(productRestClient.getProductById("sku-1")).thenReturn(product);

        mvc.perform(get("/bills/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.customer.name").value("Imane"))
                .andExpect(jsonPath("$.productItems[0].product.name").value("Printer"))
                .andExpect(jsonPath("$.productItems[0].quantity").value(2));
    }
}

package com.carrerconnect.applicationservice.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.carrerconnect.applicationservice.ApplicationDTO.ApplicationDTO;
import com.carrerconnect.applicationservice.service.ApplicationService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ApplicationController.class)
class ApplicationControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ApplicationService applicationService;
    @Autowired
    private ObjectMapper objectMapper;

   

    @Test
    void getApplicationById_success() throws Exception {
        ApplicationDTO dto = new ApplicationDTO();
        when(applicationService.getApplicationById(1L)).thenReturn(dto);
        mockMvc.perform(get("/applications/1"))
                .andExpect(status().isOk());
    }

    @Test
    void getAllApplications() throws Exception {
        when(applicationService.getAllApplications()).thenReturn(Arrays.asList(new ApplicationDTO(), new ApplicationDTO()));
        mockMvc.perform(get("/applications"))
                .andExpect(status().isOk());
    }
}

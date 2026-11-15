package com.akshaj.mydigibank;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:mydigibank-test;DB_CLOSE_DELAY=-1",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.datasource.username=sa",
		"spring.datasource.password="
})
@AutoConfigureMockMvc
class MyDigiBankApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	void signupReportsConflictOnlyWhenUsernameAlreadyExists() throws Exception {
		String username = "signup-" + java.util.UUID.randomUUID();
		String requestBody = """
				{
				  "username": "%s",
				  "password": "test-password"
				}
				""".formatted(username);

		mockMvc.perform(post("/auth/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody))
				.andExpect(status().isOk());

		mockMvc.perform(post("/auth/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody))
				.andExpect(status().isConflict());
	}

	@Test
	void createsAccountAndRecordsInrTransactionWithoutExternalServices() throws Exception {
		mockMvc.perform(get("/accounts/types").param("lang", "hi"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].type").value("Savings"));

		MvcResult createResult = mockMvc.perform(post("/accounts")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{
						  "accountHolderName": "Test Customer",
						  "accountType": "Savings",
						  "balance": 1000,
						  "email": "customer@example.com",
						  "phoneNumber": "1234567890",
						  "ifsc": "ABCD0123456",
						  "status": "Active"
						}
						"""))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.accountId", notNullValue()))
				.andReturn();

		String response = createResult.getResponse().getContentAsString();
		String accountId = com.jayway.jsonpath.JsonPath.read(response, "$.accountId");

		mockMvc.perform(post("/accounts/{accountId}/debit", accountId)
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
						{
						  "amount": 100,
						  "description": "Test debit",
						  "currency": "INR",
						  "lang": "en"
						}
						"""))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.timeOfTransaction", notNullValue()));

		mockMvc.perform(get("/accounts/{accountId}", accountId))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.balance").value(900.0));
	}
}

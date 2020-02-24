package com.rental.shop.api.resource;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.shop.api.model.Customer;
import com.rental.shop.api.payload.ApiResponse;
import com.rental.shop.api.repository.CustomerRepository;
import com.rental.shop.api.resource.exception.ValidationError;
import com.rental.shop.api.service.CustomerService;
import com.rental.shop.api.utils.PagedResult;

@RestController
@RequestMapping("/api/customers")
public class CustomerResource {

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private CustomerService customerService;

	@GetMapping("/{id}")
	public ResponseEntity<?> getCustomerById(@PathVariable Integer id, Pageable pageable) {
		Page<Customer> customer = customerRepository.findById(id, pageable);
		PagedResult<Customer> te = new PagedResult<Customer>(customer.getContent(), customer.getTotalElements(),
				customer.getNumber(), customer.getSize());
		return ResponseEntity.ok().body(te);
	}

	@GetMapping
	public ResponseEntity<?> getCustomers( Pageable pageable) {

		Page<Customer> cust = customerRepository.findAll(pageable);

		PagedResult<Customer> result = new PagedResult<Customer>(cust.getContent(), cust.getTotalElements(),
				cust.getNumber(), cust.getSize());

		return ResponseEntity.ok().body(result);
	}

	@PostMapping
	public ResponseEntity<?> createCustomer(@Valid @RequestBody Customer customer, HttpServletRequest request) {

		Optional<Customer> customerOptional = customerRepository.findByEmailIgnoreCase(customer.getEmail());

		if (customerOptional.isPresent() && !customerOptional.get().equals(customer)) {
			return emailAlready(request);
		}
		customerService.save(customer);

		return ResponseEntity.ok().body(new ApiResponse(true, "Customer successfully registered!"));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateCustomer(@PathVariable Integer id, @RequestBody Customer customer, HttpServletRequest request) {

		Optional<Customer> existingUserById = customerRepository.findById(id);
		Optional<Customer> existingUserByEmail = customerRepository.findByEmailIgnoreCase(customer.getEmail());
		
		if (!existingUserById.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Customer not found!"));
		}

		if (existingUserByEmail.isPresent()) {
			if (existingUserById.get().getEmail().equals(existingUserByEmail.get().getEmail())) {
				customerService.save(customer);
			} else {
				return emailAlready(request);
			}
		}
		if (!existingUserByEmail.isPresent()) {
			customerService.save(customer);
		}

		return ResponseEntity.ok().body(new ApiResponse(true, "Customer successfully updated!"));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable Integer id) {
		Optional<Customer> customerOptional = customerRepository.findById(id);

		if (!customerOptional.isPresent()) {
			return ResponseEntity.ok().body(new ApiResponse(false, "Customer not found!"));
		}
		customerOptional.ifPresent(customer -> {
			customerRepository.delete(customer);
		});
		return ResponseEntity.ok().body(new ApiResponse(true, "Customer successfully deleted!"));
	}

	private ResponseEntity<?> emailAlready(HttpServletRequest request) {
		ValidationError err = new ValidationError(System.currentTimeMillis(), HttpStatus.CONFLICT.value(),
				"Error validation", "Conflict", request.getRequestURI());
		err.addError("email", "Email already exists.");
		return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
	}

}

package com.rental.shop.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.shop.api.model.Address;
import com.rental.shop.api.model.Customer;
import com.rental.shop.api.repository.CustomerRepository;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	public void save(Customer customer) {

		if (customer.getAddress() != null) {

			Address address = new Address();
			address.setId(customer.getId());
			address.setStreet(customer.getAddress().getStreet());
			address.setNumberAddress(customer.getAddress().getNumberAddress());
			address.setNeighborhood(customer.getAddress().getNeighborhood());
			address.setCity(customer.getAddress().getCity());
			address.setUf(customer.getAddress().getUf());
			address.setZipCode(customer.getAddress().getZipCode());
			address.setCustomer(customer);

			customer.setAddress(address);
		}
		customerRepository.save(customer);
	}

}

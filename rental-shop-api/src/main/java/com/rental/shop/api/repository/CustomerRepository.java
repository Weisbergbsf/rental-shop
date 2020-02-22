package com.rental.shop.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rental.shop.api.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	Page<Customer> findById(Integer id, Pageable pageable);
	Page<Customer> findAll(Pageable pageable);

	Optional<Customer> findById(Long id);
	Optional<Customer> findByEmailIgnoreCase(String email);
}

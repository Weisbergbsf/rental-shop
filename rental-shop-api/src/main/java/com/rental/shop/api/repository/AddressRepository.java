package com.rental.shop.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rental.shop.api.model.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}

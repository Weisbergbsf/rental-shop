package com.rental.shop.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rental.shop.api.model.ContractItem;

public interface ContractItemRepository extends JpaRepository<ContractItem, Integer> {

}

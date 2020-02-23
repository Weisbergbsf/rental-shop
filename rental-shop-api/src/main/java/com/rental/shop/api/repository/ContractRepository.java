package com.rental.shop.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rental.shop.api.model.Contract;

public interface ContractRepository extends JpaRepository<Contract, Integer> {

	Page<Contract> findById(Integer id, Pageable pageable);
}

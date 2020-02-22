package com.rental.shop.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rental.shop.api.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {

	Page<Item> findById(Integer id, Pageable pageable);

	Page<Item> findAll(Pageable pageable);

	Optional<Item> findById(Long id);

	Optional<Item> findByNameIgnoreCase(String name);

}

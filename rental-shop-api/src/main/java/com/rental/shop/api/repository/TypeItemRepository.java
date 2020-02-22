package com.rental.shop.api.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.rental.shop.api.model.TypeItem;

public interface TypeItemRepository extends JpaRepository<TypeItem, Integer> {

	Page<TypeItem> findById(Integer id, Pageable pageable);

	Page<TypeItem> findAll(Pageable pageable);

	Optional<TypeItem> findById(Long id);

	Optional<TypeItem> findByNameIgnoreCase(String name);

}

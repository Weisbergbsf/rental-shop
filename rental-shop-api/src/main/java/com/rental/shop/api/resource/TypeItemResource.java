package com.rental.shop.api.resource;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

import com.rental.shop.api.model.TypeItem;
import com.rental.shop.api.payload.ApiResponse;
import com.rental.shop.api.repository.TypeItemRepository;
import com.rental.shop.api.resource.exception.ResourceAlready;
import com.rental.shop.api.utils.PagedResult;

@RestController
@RequestMapping("/api/type-itens")
public class TypeItemResource {

	@Autowired
	private TypeItemRepository typeItemRepository;

	@GetMapping("/{id}")
	public ResponseEntity<?> getTypeItem(@PathVariable Integer id, Pageable pageable) {
		Page<TypeItem> typeItems = typeItemRepository.findById(id, pageable);
		PagedResult<TypeItem> result = new PagedResult<TypeItem>(typeItems.getContent(), typeItems.getTotalElements(),
				typeItems.getNumber(), typeItems.getSize());
		return ResponseEntity.ok().body(result);
	}

	@GetMapping
	public ResponseEntity<?> getTypeItems(@PageableDefault(size = 20, page = 0) Pageable pageable) {

		Page<TypeItem> typeItems = typeItemRepository.findAll(pageable);

		PagedResult<TypeItem> result = new PagedResult<TypeItem>(typeItems.getContent(), typeItems.getTotalElements(),
				typeItems.getNumber(), typeItems.getSize());

		return ResponseEntity.ok().body(result);
	}

	@PostMapping
	public ResponseEntity<?> createTypeItem(@Valid @RequestBody TypeItem typeItem, HttpServletRequest request) {

		Optional<TypeItem> typeItemOptional = typeItemRepository.findByNameIgnoreCase(typeItem.getName());

		if (typeItemOptional.isPresent() && !typeItemOptional.get().equals(typeItem)) {
			return ResourceAlready.message("name", "Name already exists.", request);
		}
		typeItemRepository.save(typeItem);

		return ResponseEntity.ok().body(new ApiResponse(true, "Type Item successfully registered!"));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateTypeItem(@PathVariable Integer id, @Valid @RequestBody TypeItem typeItem, HttpServletRequest request) {

		Optional<TypeItem> existingById = typeItemRepository.findById(id);

		Optional<TypeItem> existingByName = typeItemRepository.findByNameIgnoreCase(typeItem.getName());
		
		if (!existingById.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Type Item not found!"));
		}

		if (existingByName.isPresent()) {
			if (existingById.get().getName().equals(existingByName.get().getName())) {
				typeItemRepository.save(typeItem);
			} else {
				return ResourceAlready.message("name", "Name already exists.", request);
			}
		}
		if (!existingByName.isPresent()) {
			typeItemRepository.save(typeItem);
		}

		return ResponseEntity.ok().body(new ApiResponse(true, "Type Item successfully updated!"));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTypeItem(@PathVariable Integer id) {
		Optional<TypeItem> typeItemOptional = typeItemRepository.findById(id);

		if (!typeItemOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, "Type Item not found!"));
		}
		typeItemOptional.ifPresent(typeItem -> {
			typeItemRepository.delete(typeItem);
		});
		return ResponseEntity.ok().body(new ApiResponse(true, "Type Item successfully deleted!"));
	}

}

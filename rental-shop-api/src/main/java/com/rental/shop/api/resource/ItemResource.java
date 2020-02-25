package com.rental.shop.api.resource;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.shop.api.model.Item;
import com.rental.shop.api.model.dto.ItemDTO;
import com.rental.shop.api.payload.ApiResponse;
import com.rental.shop.api.repository.ItemRepository;
import com.rental.shop.api.utils.PagedResult;

@RestController
@RequestMapping("/api/items")
public class ItemResource {

	@Autowired
	private ItemRepository itemRepository;

	@GetMapping("/{id}")
	public ResponseEntity<?> getItem(@PathVariable Integer id, Pageable pageable) {
		Page<Item> items = itemRepository.findById(id, pageable);
		PagedResult<Item> result = new PagedResult<Item>(items.getContent(), items.getTotalElements(),
				items.getNumber(), items.getSize());

		return ResponseEntity.ok().body(result);
	}

	// TODO: Create option to search
	@GetMapping("/list")
	public ResponseEntity<List<ItemDTO>> getItem() {
		List<Item> items = itemRepository.findAll();

		List<ItemDTO> itemsDto = items.stream().map(this::convertToDto).collect(Collectors.toList());

		return ResponseEntity.ok().body(itemsDto);
	}

	@GetMapping
	public ResponseEntity<?> getItems(@PageableDefault(size = 20, page = 0) Pageable pageable) {

		Page<Item> items = itemRepository.findAll(pageable);

		PagedResult<Item> result = new PagedResult<Item>(items.getContent(), items.getTotalElements(),
				items.getNumber(), items.getSize());

		return ResponseEntity.ok().body(result);
	}

	@PostMapping
	public ResponseEntity<?> createItem(@Valid @RequestBody Item item, HttpServletRequest request) {

		itemRepository.save(item);

		return ResponseEntity.ok().body(new ApiResponse(true, "Item successfully registered!"));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateItem(@PathVariable Integer id, @Valid @RequestBody Item typeItem,
			HttpServletRequest request) {

		itemRepository.save(typeItem);

		return ResponseEntity.ok().body(new ApiResponse(true, "Item successfully updated!"));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteItem(@PathVariable Integer id) {
		Optional<Item> itemOptional = itemRepository.findById(id);

		if (!itemOptional.isPresent()) {
			return ResponseEntity.ok().body(new ApiResponse(false, "Item not found!"));
		}
		itemOptional.ifPresent(typeItem -> {
			itemRepository.delete(typeItem);
		});
		return ResponseEntity.ok().body(new ApiResponse(true, "Item successfully deleted!"));
	}

	private ItemDTO convertToDto(Item item) {
		return new ItemDTO(item.getId(), item.getName());
	}

}

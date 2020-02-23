package com.rental.shop.api.resource;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rental.shop.api.model.Contract;
import com.rental.shop.api.model.enums.ContractStatus;
import com.rental.shop.api.payload.ApiResponse;
import com.rental.shop.api.repository.ContractRepository;
import com.rental.shop.api.service.ContractService;
import com.rental.shop.api.utils.PagedResult;

@RestController
@RequestMapping("/api/contracts")
public class ContractResource {

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	private ContractService contractService;

	@GetMapping("/{id}")
	public ResponseEntity<PagedResult<Contract>> getItem(@PathVariable Integer id, Pageable pageable) {
		Page<Contract> contracts = contractRepository.findById(id, pageable);
		PagedResult<Contract> result = new PagedResult<Contract>(contracts.getContent(), contracts.getTotalElements(),
				contracts.getNumber(), contracts.getSize());

		return ResponseEntity.ok().body(result);
	}

	@PostMapping
	public ResponseEntity<?> createContract(@RequestBody Contract contract) {

		contract = contractService.save(contract);
		return ResponseEntity.ok().body(contract);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> changeStatusContract(@PathVariable Integer id,	@DefaultValue(value = "statusContract") Integer statusContract) {
		Optional<Contract> contract = contractRepository.findById(id);
		if (!contract.isPresent()) {
			return ResponseEntity.ok().body(new ApiResponse(false, "Contract not found!"));
		}
		try {
			contract.get().setContractStatus(ContractStatus.valueOf(statusContract));
			contractRepository.save(contract.get());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
		}

		return ResponseEntity.ok().body(contract.get());
	}

}

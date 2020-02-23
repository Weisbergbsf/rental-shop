package com.rental.shop.api.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rental.shop.api.model.Contract;
import com.rental.shop.api.model.ContractItem;
import com.rental.shop.api.model.Item;
import com.rental.shop.api.repository.ContractItemRepository;
import com.rental.shop.api.repository.ContractRepository;
import com.rental.shop.api.repository.CustomerRepository;
import com.rental.shop.api.repository.ItemRepository;

@Service
public class ContractService {

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private ContractItemRepository contractItemRepository;

	@Autowired
	private CustomerRepository customerRepository;

	public Contract save(Contract contract) {
		contract.setId(null);
		contract.setDateStart(LocalDateTime.now());
		contract.setCustomer(customerRepository.findById(contract.getCustomer().getId()).get());
		contract.setContractStatus(contract.getContractStatus());
		contract = contractRepository.save(contract);

		for (ContractItem ci : contract.getItems()) {
			Optional<Item> it = itemRepository.findById(ci.getItem().getId());

			ci.setItem(it.get());
			ci.setPrice(it.get().getPrice());
			ci.setContract(contract);

		}

		contractItemRepository.saveAll(contract.getItems());

		return contract;
	}

}

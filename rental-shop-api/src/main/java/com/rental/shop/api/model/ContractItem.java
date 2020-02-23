package com.rental.shop.api.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rental.shop.api.model.pk.ContractItemPK;

@Entity
@Table(name = "contract_item")
public class ContractItem implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonIgnore
	@EmbeddedId
	private ContractItemPK id = new ContractItemPK();

	private Integer quantity;
	private Double price;

	public ContractItem() {
	}

	public ContractItem(Contract contract, Item item, Integer quantity, Double price) {
		super();
		id.setContract(contract);
		id.setItem(item);
		this.quantity = quantity;
		this.price = price;
	}

	@JsonIgnore
	public Contract getContract() {
		return id.getContract();
	}

	public void setContract(Contract contract) {
		id.setContract(contract);
	}

	public Item getItem() {
		return id.getItem();
	}

	public void setItem(Item item) {
		id.setItem(item);
	}
	
	public ContractItemPK getId() {
		return id;
	}

	public void setId(ContractItemPK id) {
		this.id = id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public double getSubTotal() {
		return price  * quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ContractItem other = (ContractItem) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}

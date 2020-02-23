package com.rental.shop.api.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "items")
public class Item implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotBlank(message = "Name is required.")
	private String name;

	@NotNull(message = "Price is required.")
	private Double price;

	private String description;

	@Column(name = "quantity_stock")
	private Integer quantityStock;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "type_items_items", joinColumns = @JoinColumn(name = "items_id"), inverseJoinColumns = @JoinColumn(name = "type_items_id"))
	private Set<TypeItem> typeItems = new HashSet<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "id.item")
	private Set<ContractItem> items = new HashSet<>();

	public Item() {
	}

	public Item(Integer id, @NotBlank(message = "Name is required.") String name, Double price, String description,
			Integer quantityStock) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.quantityStock = quantityStock;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getQuantityStock() {
		return quantityStock;
	}

	public void setQuantityStock(Integer quantityStock) {
		this.quantityStock = quantityStock;
	}

	public Set<TypeItem> getTypeItems() {
		return typeItems;
	}

	public Item(Integer id, @NotBlank(message = "Name is required.") String name, Double price, String description,
			Integer quantityStock, Set<TypeItem> typeItems) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.description = description;
		this.quantityStock = quantityStock;
		this.typeItems = typeItems;
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
		Item other = (Item) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}

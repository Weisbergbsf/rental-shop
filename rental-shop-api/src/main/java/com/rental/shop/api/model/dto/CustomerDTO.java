package com.rental.shop.api.model.dto;

import java.io.Serializable;

public class CustomerDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String name;

	public CustomerDTO() {
	}

	public CustomerDTO(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

}

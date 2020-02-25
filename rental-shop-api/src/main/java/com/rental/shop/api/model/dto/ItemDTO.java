package com.rental.shop.api.model.dto;

import java.io.Serializable;

public class ItemDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String name;

	public ItemDTO() {
	}

	public ItemDTO(Integer id, String name) {
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

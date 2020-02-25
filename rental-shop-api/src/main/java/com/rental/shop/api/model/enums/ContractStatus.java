package com.rental.shop.api.model.enums;

public enum ContractStatus {

	RESERVED(1), RENTED(2), RETURNED(3), CANCELED(4);

	private int code;

	private ContractStatus(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static ContractStatus valueOf(int code) {
		for (ContractStatus value : ContractStatus.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Invalid ContractStatus");

	}
}

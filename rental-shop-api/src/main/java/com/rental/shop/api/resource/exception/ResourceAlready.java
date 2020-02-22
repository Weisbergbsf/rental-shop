package com.rental.shop.api.resource.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResourceAlready {

	public static ResponseEntity<?> message(String field, String message, HttpServletRequest request) {
		ValidationError err = new ValidationError(System.currentTimeMillis(), HttpStatus.CONFLICT.value(),
				"Error validation", "Conflict", request.getRequestURI());
		err.addError(field, message);
		return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
	}

}

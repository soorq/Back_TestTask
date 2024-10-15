import { AxiosHeaders, AxiosError } from 'axios';
export class AxiosContracts {
	static responseContract(schema) {
		return response => {
			const validation = schema.safeParse(response.data);
			if (validation.error) {
				throw new AxiosValidationError(
					response.config,
					response.request,
					response,
					validation.error.errors,
				);
			}
			return Object.assign(Object.assign({}, response), { data: validation.data });
		};
	}
	static requestContract(schema, data) {
		const validation = schema.safeParse(data);
		if (validation.error) {
			throw new AxiosValidationError(
				{ headers: new AxiosHeaders() },
				undefined,
				undefined,
				validation.error.errors,
			);
		}
		return validation.data;
	}
}
class AxiosValidationError extends AxiosError {
	constructor(config, request, response, issues) {
		super(
			'The provided data does not meet the required criteria.',
			AxiosValidationError.ERR_BAD_VALIDATION,
			config,
			request,
			response,
		);
		this.issues = issues;
	}
}
AxiosValidationError.ERR_BAD_VALIDATION = 'ERR_BAD_VALIDATION';

import { AxiosHeaders, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ZodType, ZodIssue } from 'zod';

export class AxiosContracts {
	static responseContract<Data>(schema: ZodType<Data>) {
		return (response: AxiosResponse<unknown>): AxiosResponse<Data> => {
			const validation = schema.safeParse(response.data);
			if (validation.error) {
				throw new AxiosValidationError(
					response.config,
					response.request,
					response,
					validation.error.errors,
				);
			}

			return { ...response, data: validation.data };
		};
	}

	static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
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

class AxiosValidationError<T = unknown> extends AxiosError {
	static readonly ERR_BAD_VALIDATION = 'ERR_BAD_VALIDATION';

	constructor(
		config?: InternalAxiosRequestConfig,
		request?: unknown,
		response?: AxiosResponse<T>,
		public readonly issues?: ZodIssue[],
	) {
		super(
			'The provided data does not meet the required criteria.',
			AxiosValidationError.ERR_BAD_VALIDATION,
			config,
			request,
			response,
		);
	}
}

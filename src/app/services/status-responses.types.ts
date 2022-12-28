/**
 * @description The generic success response of an API call
 */
export interface SuccessResponse {
  data: {
    type: 'message';
    detail: string;
  };
}

/**
 * @description The generic error response of an API call
 */
export interface ErrorResponse {
  errors: {
    detail: string;
    errorCode: number;
  };
}

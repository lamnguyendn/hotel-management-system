class ApiError extends Error {
  static INTERNAL_ERROR = 'Internal Error';

  errorCode: string;
  errorMessage: string;
  errorDetail: string;
  status: number | undefined;

  constructor(
    errorCode: string,
    errorMessage = ApiError.INTERNAL_ERROR,
    errorDetail = ApiError.INTERNAL_ERROR,
    status?: number
  ) {
    super(errorMessage);

    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    this.errorDetail = errorDetail;
    this.status = status;
  }
}

export default ApiError;

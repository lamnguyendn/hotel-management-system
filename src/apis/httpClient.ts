import axios, { AxiosError, AxiosResponse } from 'axios';
import isArray from 'lodash/isArray';
import { HttpClientInstance, RequestConfig } from '../@types/request';
import ApiError from './apiError';

const buildApiError = (data: unknown, status: number | undefined): ApiError => {
  let errorCode;
  let errorMessage;
  let errorDetail;
  const refinedData = data as Record<string, unknown>;

  if (refinedData.errorCodes) {
    const { errorCodes, errorMessages, errorDetails } = refinedData;
    errorCode = isArray(errorCodes) ? (errorCodes as Array<string>)[0] : errorCodes;
    errorMessage = isArray(errorMessages) ? (errorMessages as Array<string>)[0] : errorMessages;
    errorDetail = isArray(errorDetails) ? (errorDetails as Array<string>)[0] : errorDetails;
  } else if (refinedData.errorCode) {
    errorCode = refinedData.errorCode;
    errorMessage = refinedData.errorMessage;
    errorDetail = refinedData.errorDetail;
  }
  return new ApiError(errorCode as string, errorMessage as string, errorDetail as string, status);
};

const processApiError = (error: {
  response?: { status: number; data?: Record<string, unknown> };
}): Promise<unknown> => {
  let apiError = null;
  if ((error as AxiosError).response) {
    const { data, status } = error.response as AxiosResponse;
    if (data) {
      apiError = buildApiError(data, status);
    } else {
      apiError = new ApiError('UNKNOWN_ERROR', 'Unknown Error', 'Unknown Error', status);
    }
  }
  if (!apiError) {
    apiError = error;
  }
  return Promise.reject(apiError);
};

class HttpClient {
  config: RequestConfig;

  client: HttpClientInstance | null = null;

  constructor(config: RequestConfig) {
    this.config = config;
  }

  get<T>(url: string, options?: RequestConfig): Promise<T> {
    return this.getClient().get(url, options);
  }

  post<T>(url: string, data: unknown, options?: RequestConfig): Promise<T> {
    return this.getClient().post(url, data, options);
  }

  private getClient(): HttpClientInstance {
    if (this.client === null) {
      this.client = this.createClient();
    }

    return this.client;
  }

  private createClient(): HttpClientInstance {
    const client = axios.create(this.config);
    client.interceptors.response.use(
      (response) => response.data,
      (error) => processApiError(error)
    );
    return client;
  }
}

export default HttpClient;

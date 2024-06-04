import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface HttpResponse {
  message: string;
  status: number;
}

export default class RemoteCtrl {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async lockBorne(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.post('/lock');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async restartBorne(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.post('/restart');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async getLogs(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.get('/logs');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async getStatus(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.get('/status');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async stopServices(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.post('/stop-services');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async restartServices(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.post('/restart-services');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async shutdownBorne(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.post('/shutdown');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async getServices(): Promise<HttpResponse> {
    try {
      const response: AxiosResponse<HttpResponse> = await this.axiosInstance.get('/services');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): HttpResponse {
    if (error.response) {
      return { message: error.response.data.message || 'An error occurred', status: error.response.status };
    } else {
      return { message: 'Network Error', status: 500 };
    }
  }
}

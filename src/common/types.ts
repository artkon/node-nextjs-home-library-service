export interface IError {
    status: number;
    message: string;
}
export interface IServiceResponse {
    error?: IError;
    data?: unknown;
}

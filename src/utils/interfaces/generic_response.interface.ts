export interface IGenericResponse<T = any> {
    message?: string;
    data?: T;
    statusCode?: number;
    success?: boolean;
}
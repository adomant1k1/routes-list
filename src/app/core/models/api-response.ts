export interface ApiResponse<T> {
    message: string;
    code: number;
    successful: boolean;
    payload: { [k: string]: T } | null;
}

import api from "./axiosConfig";

export const fetchAccounts = () => api.get("/accounts");
export const createAccount = (data) => api.post("/accounts", data);
export const fetchAccountById = (id) => api.get(`/accounts/${id}`);
export const debitAccount = (id, body) => api.post(`/accounts/${id}/debit`, body);
export const creditAccount = (id, body) => api.post(`/accounts/${id}/credit`, body);
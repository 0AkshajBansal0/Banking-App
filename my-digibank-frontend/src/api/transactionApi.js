import api from "./axiosConfig";

export const fetchTransactionsByAccount = (id) =>
  api.get(`/transactions/account/${id}`);
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getAllRfpsApi = () => {
  return axios.get(`${API_BASE_URL}/rfp`);
};

export const getRfpByIdApi = (id) => {
  return axios.get(`${API_BASE_URL}/rfp/${id}`);
};

export const generateRfpApi = (text) => {
  return axios.post(`${API_BASE_URL}/rfp/generate`, { text });
};
export const getVendorsApi = () => {
  return axios.get(`${API_BASE_URL}/vendor`);
};

export const addVendorApi = (vendor) => {
  return axios.post(`${API_BASE_URL}/vendor`, vendor);
};

export const sendRfpApi = (rfpId, vendorIds) => {
  return axios.post(`${API_BASE_URL}/email/${rfpId}/send`, {
    vendorIds,
  });
};

export const parseProposalApi = ({ rfpId, vendorId, text }) => {
  return axios.post(`${API_BASE_URL}/proposal/parse`, {
    rfpId,
    vendorId,
    text,
  });
};
export const getProposalsApi = (rfpId) => {
  return axios.get(`${API_BASE_URL}/proposal/${rfpId}`);
};

export const recommendVendorApi = (rfpId) => {
  return axios.post(`${API_BASE_URL}/proposal/recommend/${rfpId}`);
};

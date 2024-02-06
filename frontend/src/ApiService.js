const API_BASE_URL = "http://localhost:8080/wake-on-lan";

const headers = {
  "Content-Type": "application/json",
};

const apiService = {
  async get(resource) {
    return await fetch(`${API_BASE_URL}/${resource}`, { headers });
  },

  async post(resource, data) {
    return await fetch(`${API_BASE_URL}/${resource}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
  },

  async put(resource, data) {
    return await fetch(`${API_BASE_URL}/${resource}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
  },

  async delete(resource) {
    return await fetch(`${API_BASE_URL}/${resource}`, {
      method: "DELETE",
      headers,
    });
  },

  async wakeOn(resource) {
    return await fetch(`${API_BASE_URL}/${resource}`, {
      method: "POST",
      headers,
    });
  },
};

export default apiService;

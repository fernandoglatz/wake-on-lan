const API_BASE_URL = "http://localhost:8080/wake-on-lan";
const BASE_PATH = "device";

const headers = {
  "Content-Type": "application/json",
};

const deviceService = {
  async getAll() {
    let method = "GET";
    let url = API_BASE_URL + "/" + BASE_PATH;

    return await fetch(url, {
      method: method,
      headers,
    }).then(async (response) => {
      let responseJson = response.json();

      if (response.ok) {
        return responseJson;
      } else {
        let json = await responseJson;
        throw Error(json.message);
      }
    });
  },

  async save(device) {
    let method = "PUT";
    let url = API_BASE_URL + "/" + BASE_PATH;

    if (device.id) {
      method = "POST";
      url += "/" + device.id;
    }

    return await fetch(url, {
      method: method,
      headers,
      body: JSON.stringify(device),
    }).then(async (response) => {
      let responseJson = response.json();

      if (response.ok) {
        return responseJson;
      } else {
        let json = await responseJson;
        throw Error(json.message);
      }
    });
  },

  async remove(device) {
    let method = "DELETE";
    let url = API_BASE_URL + "/" + BASE_PATH + "/" + device.id;

    return await fetch(url, {
      method: method,
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        let json = await response.json();
        throw Error(json.message);
      }
    });
  },

  async wakeOn(device) {
    let method = "POST";
    let url = API_BASE_URL + "/" + BASE_PATH + "/" + device.id + "/wake-on";

    return await fetch(url, {
      method: method,
      headers,
    }).then(async (response) => {
      if (!response.ok) {
        let json = await response.json();
        throw Error(json.message);
      }
    });
  },
};

export default deviceService;

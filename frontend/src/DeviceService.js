const API_URL = process.env.REACT_APP_API_ENDPOINT + "/device";

const headers = {
  "Content-Type": "application/json",
};

const deviceService = {
  async getAll() {
    let method = "GET";
    let url = API_URL;

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
    let url = API_URL;

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
    let url = API_URL + "/" + device.id;

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
    let url = API_URL + "/" + device.id + "/wake-on";

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

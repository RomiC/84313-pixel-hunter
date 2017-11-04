const SERVER_URL = `https://es.dump.academy/pixel-hunter/`;

export const getData = (url, successCallback, errorCallback) => {
  return fetch(`${SERVER_URL}${url}`, {
    method: `get`
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    if (errorCallback instanceof Function) {
      errorCallback(response);
    }
    throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
  }).then((response) => {
    if (successCallback instanceof Function) {
      successCallback(response);
    }
    return response;
  }).catch((err) => {
    throw new Error(`Ошибка: ${err.message}`);
  });
};

export const postData = (url, body, successCallback, errorCallback) => {
  return fetch(`${SERVER_URL}${url}`, {
    method: `post`,
    headers: {
      "Content-type": `application/json; charset=UTF-8`
    },
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.ok) {
      if (successCallback instanceof Function) {
        successCallback();
      }
    } else {
      if (errorCallback instanceof Function) {
        errorCallback(response);
      }
      throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
    }
  }).catch((err) => {
    throw new Error(`Ошибка: ${err.message}`);
  });
};

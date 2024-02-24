const host = "http://localhost:4000";

const checkError = (response: any) => {
  if (response.ok) {
    return response;
  } else {
    throw Error(response.statusText);
  }
};

export function get(path: string) {
  return fetch(host + path, {
    method: "GET",
  })
    .then((res) => checkError(res))
    .then((res) => res.json())
    .then((res) => res.data)
}

export function post(path: string, data: any) {
  return fetch(host + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkError(res))
    .then((res) => res.json())
    .then((res) => res.data);
}

export function put(path: string, data: any) {
  return fetch(host + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkError(res))
    .then((res) => res.json())
    .then((res) => res.data)
}

export function deleteFetch(path: string) {
  return fetch(host + path, {
    method: "DELETE",
  })
    .then((res) => checkError(res))
}

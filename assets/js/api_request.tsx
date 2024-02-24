const host = 'http://localhost:4000';

export function get (path: string) {
  return fetch(
    host + path,
    {
      method: "GET"
    }
  )
  .then(res => res.json())
  .then(res => res.data)
  .catch(error => console.log(error));
};

export function post(path: string, data: any) {
  return fetch(
    host + path,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
  )
  .then(res => res.json())
  .catch(error => console.log(error));
};


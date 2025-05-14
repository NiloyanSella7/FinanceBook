const api = async (method, path, body) => {
  const response = await axios({
    method,
    url: `http://localhost:7000${path}`,
    data: body,
  });

  return response.data;
};

// const api = async (method, path, body) => {
//   const xmhttpReq = new XMLHttpRequest();
//   xmhttpReq.open(method, `http://localhost:7000${path}`, false);
//   xmhttpReq.setRequestHeader("Content-Type", "application/json");

//   xmhttpReq.send(body ? JSON.stringify(body) : undefined);

//   return xmhttpReq.response;
// };

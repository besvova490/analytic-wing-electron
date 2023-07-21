import { io } from "socket.io-client";


function initSocketIo() {
  const socket = io(process.env.REACT_APP_API_URL, { retries: 3 });

  return socket;
}

export default initSocketIo;

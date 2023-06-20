import ClientIoSocket from "socket.io-client";

const host = process.env.REACT_APP_API_SERVER_URL;
const io = ClientIoSocket.connect(host);

export default io;

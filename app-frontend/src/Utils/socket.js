import { io } from "socket.io-client";
import { BACKEND_URL } from "../Constants/Api";
const socket = io.connect(`${BACKEND_URL}`);
export default socket;
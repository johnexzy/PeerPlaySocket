import client from "@/utils/client";
import { io } from "socket.io-client";
export default function useSocket() {
  // start the socket server

  try {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
 
    return socket;
  } catch (error) {}
}

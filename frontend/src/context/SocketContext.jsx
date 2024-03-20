import { createContext, useState, useEffect , useContext} from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext(); // used to create a new context

export const useSocketContext = () => { 
    return useContext(SocketContext);
} // used to create a custom hook to use the SocketContext

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      // used to connect to the socket server
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        }, // used to send the userId to the socket server
      });

      setSocket(socket); // used to set the socket state

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      }); // used to listen to the getOnlineUsers event

      return () => socket.close(); // used to disconnect from the socket server if the component is unmounted
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
     // used to provide the socket and onlineUsers to the children components
  );
};

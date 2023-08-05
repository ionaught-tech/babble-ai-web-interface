import { useEffect, useState } from "react";
import { createUserCall, getUserBotCall } from "./Services/api";
import io, { Socket } from "socket.io-client";
import useFetch from "./Hooks/useFetch";
import config from "./Config";
import { MESSAGE_STATUS, USER_TYPES, localStorage_TOKEN_KEY } from "./Config/constants";
import { socketUrl } from "./Config/apiUrl";
import { generateId } from "./Utils/Id";
import { ChatBotData, MessageType } from "./Types";


function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<"online" | "offline" | "typing">(
    "online"
  );
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { data: botData } = useFetch<ChatBotData>(getUserBotCall, {
    token: config.token,
  });

  useEffect(() => {
    const socket = io(socketUrl, {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem(localStorage_TOKEN_KEY)}`,
      },
    });
    setSocket(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (data) => {
      if (data.action === "typing") {
        setStatus("typing");
      } else {
        setStatus("online");
      }
      if (data.action === "messageList") {
        setMessages(data.message);
      }
      if (data.action === "newMessage") {
        setMessages((prev) => [...prev, data.message]);
      }
      if (data.action === "send") {
        setMessages((prev) =>
          prev.map((d) => {
            if (d._id === data.id) {
              return {
                ...d,
                status: MESSAGE_STATUS.Send,
                _id: data.message,
              };
            }
            return d;
          })
        );
      }
      if (data.action === "received") {
        setMessages((prev) =>
          prev.map((d) => {
            if (d._id === data.id) {
              return {
                ...d,
                status: MESSAGE_STATUS.Received,
              };
            }
            return d;
          })
        );
      }
      if (data.action === "read") {
        setMessages((prev) =>
          prev.map((d) => {
            if (d._id === data.id) {
              return {
                ...d,
                status: MESSAGE_STATUS.Read,
              };
            }
            return d;
          })
        );
      }
      if (data.action === "acceptChat") {
        // called when an agent accepted the chat
      }
    });
  }, [socket]);

  const onMessageEmit = (message: string) => {
    const id = generateId();
    socket?.emit("message", {
      message,
      id,
      action: "newMessage",
    });
    setMessages((prev) => [
      ...prev,
      {
        _id: id,
        to: botData?._id as string,
        message: [{
          message,
          type: "text"
        }],
        createdAt: new Date().toISOString(),
        senderType: `${USER_TYPES.User}`,
        status: 0,
      },
    ]);
  };

  const onUserCreate = async (data: any) => {
    try {
      const res = await createUserCall(data, config.token);
      localStorage.setItem(localStorage_TOKEN_KEY, res.data.token);
      // Call connectToSocket here
    } catch (error) {
      //!HANDLE USER CREATE ERROR HERE
    }
  };

  const connectToSocket = () => {
    const socket = io(socketUrl, {
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem(localStorage_TOKEN_KEY)}`,
      },
    });
    setSocket(socket);
  }

  return (
    <div>

    </div>
  );
}

export default App
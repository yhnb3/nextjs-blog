---
title: React와 socket.io를 이용하여 채팅룸 만들기
tags: 'React WebSocket'
date: '2022-04-06'
---

> webSocket이란 
>
> 서버와 클라이언트가 연결을 유지한채 데이터를 교환할 수 있으며 양방향 통신입니다.

### 요구사항

1. socket을 이용하여 채팅서버 만들기
2. 채팅룸을 접속하면 채팅방 welcom 멘트 나오기
3. 이름 : 메세지 형식으로 채팅 보여주기
4. 스타일은... 신경안쓰기..

### client

```react
// useChat 채팅룸 초기 접속 및 채팅로그를 관리하기 위한 hook입니다.

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3001");
export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
   
  useEffect(() => {                                       //socket.io 통신을 할때 useEffect에서 두번째 인자로 빈 배열을 넣어야합니다.
    socket.on("to client", (arg) => {
      setMessages((messages) => [...messages, arg]);
    });
  }, []);

  const sendMessage = (msg) => {
    socket.emit("to server", {
      message: msg,
      senderId: socket.id,
      senderName: name,
      welcome: false,
    });
  };

  const handleName = (name) => {                           // 이름을 설정하면 채팅로그에 웰컴 메시지를 추가합니다.
    setMessages((messages) => [
      ...messages,
      {
        message: `${name}님 채팅방에 들어오신것을 환영합니다.`,
        senderId: socket.id,
        senderName: name,
        welcome: true,
      },
    ]);
    setName(name);
  };

  return { socket, messages, sendMessage, handleName };
}
```

```react
import React, { useState, useEffect } from "react";
import useChat from "../hooks/useChat";
import ListItem from "../components/ListItem";

export default function Home() {
  const [isIn, setIsIn] = useState(false);
  const [isName, setIsName] = useState(false);
  const { socket, messages, sendMessage, handleName } = useChat();

  useEffect(() => {                 
    if (isIn) {
      socket.connect();
    } else {
      setIsIn(true);
    }

    return () => {
      socket.disconnect();
    }; 
  }, [isIn]);               // 채팅창에 들어 와있는 상태인지 아닌 상태인지를 확인하여 socket을 재연결합니다.        

  return (
    <div>
      <p>chat server</p>
      <ul>
        {messages.map((msg, idx) => (
          <ListItem key={idx} message={msg} />
        ))}
      </ul>
      <input
        disabled={!isName}
        placeholder={isName ? "메시지를 입력하세요." : "이름을 정하세요."}
        onKeyUp={(e) => {
          if (e.code === "Enter" && e.target.value !== "") {
            sendMessage(e.target.value);
            e.target.value = "";
          }
        }}
      ></input>
      <input
        disabled={isName}
        onKeyUp={(e) => {
          if (e.code === "Enter" && e.target.value !== "") {
            handleName(e.target.value);
            setIsName(true);
            e.target.value = "";
          }
        }}
      ></input>
    </div>
  );
}
```

### server

```react
const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("to server", (msg) => {
    socket.emit("to client", { ...msg });
    console.log(msg.message);
  });
});

console.log("서버 오픈");
io.listen(3001);
```

서버는 단순히 메시지를 받으면 로그에 메시지를 찍고 클라이언트에 다시 메시지를 넘깁니다.

### 코드

https://github.com/yhnb3/chatting




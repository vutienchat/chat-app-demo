import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useForm } from "react-hook-form";

const ChatRoomPage = () => {
  const socket = io("http://localhost:4000", {
    transports: ["websocket", "polling", "flashsocket"],
  });
  const [listMessage, setListMessage] = useState([]);
  const history = useHistory();
  const { handleSubmit, register, reset } = useForm("");
  const logout = () => {
    history.push("/");
  };
  const onSubmit = (data, e) => {
    e.target.reset();
    socket.emit("message", data);
  };
  useEffect(() => {
    socket.on("message", (message) => {
      setListMessage([...listMessage, message]);
      console.log(message);
    });
  }, [socket]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white h-96 w-full md:w-1/2 mx-5 flex flex-col justify-between relative">
        <div className="header-chat flex items-center justify-between border-b-4 p-2">
          <div className="info-user flex items-center">
            <div className="avatar">
              <img
                className="h-10 w-10 object-cover rounded-full "
                src="https://static2.yan.vn/YanNews/2167221/202005/hinh-anh-moi-nhat-cua-chi-dep-baifern-pimchanok-6c4694e2.jpeg"
                alt=""
              />
            </div>
            <div class="name-user">Chất</div>
          </div>
          <div className="logout">
            <GoogleLogout
              clientId="43629890670-7n7ffgffaiqlvs3fs8dqie2jph6mb5pl.apps.googleusercontent.com"
              buttonText="Logout"
              icon={false}
              className="p-0"
              onLogoutSuccess={logout}
            ></GoogleLogout>
          </div>
        </div>
        <div>
          <div className="content-chat h-44 overflow-y-auto">
            {listMessage.map((message) => {
              return (
                <div>
                  <div class="other break-all mt-2  ml-5 rounded-bl-none float-none bg-blue-500 mr-auto rounded-2xl p-2 inline-block">
                    {message.message}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="footer-chat">
            {/* <div className="footer-chat absolute bottom-0 right-0 left-0"> */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300"
            >
              <button className="outline-none focus:outline-none">
                <svg
                  className="text-gray-400 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <button className="outline-none focus:outline-none ml-1">
                <svg
                  className="text-gray-400 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              <input
                {...register("message")}
                aria-placeholder="Aa"
                placeholder="Aa"
                className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
                type="text"
                autoComplete="off"
                required
              />
              <button className="outline-none focus:outline-none" type="submit">
                <svg
                  className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("message")}
          type="text"
          placeholder="Placeholder"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button>send</button>
      </form>
      
      <GoogleLogout
        clientId="43629890670-7n7ffgffaiqlvs3fs8dqie2jph6mb5pl.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout> */}
    </div>
  );
};

export default ChatRoomPage;

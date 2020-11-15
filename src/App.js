import "./App.css";
import { useState, useEffect } from "react";
import { usePubNub } from "pubnub-react";

function App() {
  const [name, setName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const pubnub = usePubNub();

  const submitHandler = (e) => {
    e.preventDefault();

    pubnub.setUUID(name);
    pubnub.subscribe({
      channels: ["global"],
    });
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      pubnub.hereNow(
        {
          channels: ["global"],
          includeUUIDs: true,
        },
        (_, response) => {
          console.log(_, response);
          if (response !== null) {
            const onlineUserIds = response.channels.global.occupants.map(
              (onlineUser) => onlineUser.uuid
            );
            setOnlineUsers(onlineUserIds);
          }
        }
      );
    }, 2000);

    return () => {
      clearInterval(refreshInterval);
      leaveApplication();
    };
  }, [pubnub]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input onChange={(e) => setName(e.target.value)} value={name} />
        <button type="submit">Add Me</button>
      </form>
      <hr />
      <p>
        Currently Online:{" "}
        {onlineUsers.map((user) => (
          <span>{user} </span>
        ))}
      </p>
    </div>
  );
}

export default App;

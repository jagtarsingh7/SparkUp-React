import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../navbar';

interface Friend {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  picturePath: string

}
interface MessageReceive {
  _id: string,
  messageKey: string,
  sender: string,
  receiver: string,
  text: string,
  time: string,
  __v: string
}
function Chat() {


  const token = useSelector((state: any) => state.token);

  const loggedInUser = useSelector((state: any) => state.user);

  const [messages, setMessages] = useState<MessageReceive[]>([]);

  const [selectedUser, setSelectedUser] = useState<Friend>({
    _id: "1",
    firstName: "Sweta",
    lastName: "Rani Patra",
    email: "swetarani.patra@gmail.com",
    picturePath: ""

  });

  const [userList, setUserList] = useState<Friend[]>([]);

  const fetchfriends = async () => {
    const response = await fetch('http://localhost:3001/users/640c19ab549f7f4c02fc359c/friends', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const result = await response.json();
    setUserList(result);
  };

  const fetchChat = async () => {
    const params = new URLSearchParams();
    params.append('emailSender', loggedInUser.email);
    params.append('emailReceiver', selectedUser.email);
    fetch(`http://localhost:3001/chats/receive?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setMessages(data)
      })
      .catch(error => console.error(error));
  };


  useEffect(() => {
    fetchfriends();
  }, []);


  const handleUserSelect = (friend: Friend) => {
    setSelectedUser(friend);
  };

  useEffect(() => {
    fetchChat();
   
  }, [selectedUser]);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = formData.get('message') as string;
    const data = new URLSearchParams();
    data.append('emailSender', loggedInUser.email);
    data.append('emailReceiver', selectedUser.email);
    data.append('message', message);
    //sending messages to database before setting state
    fetch('http://localhost:3001/chats/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': `Bearer ${token}`
      },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        fetchChat()
      })
      .catch(error => console.error(error));

    event.currentTarget.reset();
  };

  return (

    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">

        <div className="container mx-auto pt-8 flex">
          <div className="w-1/4 pr-4">
            <h2 className="text-lg font-bold mb-4">Friend List</h2>
            <ul className="bg-white rounded-lg shadow-lg">
              {
                userList ? (userList.map((friend) => (
                  <li
                    key={friend._id}
                    className={`px-4 py-2 cursor-pointer ${selectedUser?._id === friend._id ? 'bg-gray-200' : ''}`}
                    onClick={() => handleUserSelect(friend)}
                  >
                    {friend.firstName}
                  </li>
                ))) : (<li>No friend to show</li>)
              }
            </ul>
          </div>

          <div className="w-3/4 pl-4">
            {selectedUser ? (
              <div className="bg-white rounded-lg shadow-lg">
                <div className="py-4 px-8 bg-gray-100">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Chat with {selectedUser.firstName}
                  </h1>
                </div>
                <div className="px-8 py-6 flex-1">
                  <div className="max-h-96 overflow-y-scroll mb-4">
                    {
                      messages.map((message, index) => (
                        <div key={index} className="mb-2">

                          {loggedInUser.email === message.sender ?

                            (<div className="flex items-start flex-row-reverse">
                              <div className="flex-shrink-0">

                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-gray-600">{loggedInUser.firstName}</p>
                                <div className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
                                  {message.text}
                                </div>
                              </div>
                            </div>
                            ) : (<div className="flex items-start">
                              <div className="flex-shrink-0">

                              </div>
                              <div className="ml-3">
                                <p className="text-sm text-gray-600">{selectedUser.firstName}</p>
                                <div className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
                                  {message.text}
                                </div>
                              </div>
                            </div>)}
                        </div>
                      )

                      )}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name="message"
                        className="flex-1 py-2 px-4 border border-gray-300 rounded-lg mr-2"
                        placeholder="Type your message here"
                        autoComplete="off"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg px-8 py-4">
                Please select a user to start chatting.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;


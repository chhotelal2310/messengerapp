import React, { useState, useEffect,useRef } from 'react';//yeha use ref new lgaya gya hai
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from "../utils/APIRoutes";
import Contacts from '../components/Contacts';
import { Welcome } from '../components/Welcome';
import {ChatContainer} from '../components/ChatContainer';
//niche wala new import kiya gaya hai
import {io} from "socket.io-client";

function Chat() {

const socket=useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded]=useState(false);

  // useEffect(async () => {
  //   if (!localStorage.getItem("chat-app-user")) {
  //     navigate("/login");
  //   } 
  //   else {
  //     setCurrentUser( await JSON.parse(localStorage.getItem("chat-app-user")));
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user);
        setIsLoaded(true);
      }
    };
    fetchData();
  }, []);


  ////niche wala new hai abdi soke me laga hau
  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser]);


  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } catch (error) {
            // Handle any errors here, e.g., set an error state.
            console.error("Error fetching data:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }


  // useEffect(async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);






  return (
    <Container>
      <div className="container">
        <Contacts 
         contacts={contacts} 
         currentUser={currentUser} 
         changeChat={handleChatChange} 
         />
        {
          //isme socke new import kiya gaya hai
            isLoaded && currentChat===undefined ? (<Welcome currentUser={currentUser} />) : (<ChatContainer currentChat={currentChat} 
             currentUser={currentUser}  socket={socket} />)}
      </div>
    </Container>
  )
}
const Container = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
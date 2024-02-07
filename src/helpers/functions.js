import { resetChat } from "../features/Chats/chatSlice";
import { resetAllUsers } from "../features/users/allUsersSlice";
import { resetSelectedFriend } from "../features/users/selectedFriendSlice";
import { logOut } from "../features/users/userSlice";

export const convertFileToBase64 = (e,setSelectedImage) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
            console.log(reader.result)
            setSelectedImage( reader.result)
        }
        reader.onerror=(error)=>{
            console.log(error)
        }

};


export const resetStore = (dispatch)=>{
    dispatch(resetChat())
    dispatch(resetAllUsers())
    dispatch(resetSelectedFriend())
    dispatch(logOut())
    console.log('AGAININNN')

}
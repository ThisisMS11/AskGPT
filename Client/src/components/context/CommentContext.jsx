import { useContext, createContext } from "react";
import axios from "axios";
import { useToast } from "./toast";
const commentContext = createContext();

export const CommentProvider = ({ children }) => {

    const toaster=useToast();

    const HandleDeleteComment = async (postID, commentID) => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                authorisation: `Bearer ${token}`
            }
        }

        if (postID && commentID) {
            await axios.delete(`http://localhost:4001/api/v1/posts/comment/${postID}/${commentID}`, config)
                .then((res) => {
                    if (res.data.success) return true;
                })
                .catch((err) => {
                    console.log(err);
                    alert(err.response.data.error);
                })
        }
    }

    

    const value = {
        HandleDeleteComment
    }

    return (
        <commentContext.Provider value={value}>
            {children}
        </commentContext.Provider>
    )
}

export const usecomment = () => {
    return useContext(commentContext);
}
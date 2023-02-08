import { useContext, createContext } from "react";
import axios from "axios";
const commentContext = createContext();

export const CommentProvider = ({ children }) => {

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
                    if (res.data.success) {
                        alert(`${res.data.data} Comment Deleted Successfully`)
                    }
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
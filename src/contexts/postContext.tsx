import React, { useEffect, useState, createContext } from "react";
import { Post } from "../utils/types";
import apiClient from "../utils/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserConsumer } from "./userContext";

type postContectType = {
    posts: Post[] | null,
    // setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>,
    addPost: (title: string, content: string, categoryId: number ) => void,
    getPost: (id: number) => void,
    updatePost: (id: number, post: Post) => void,
    deletePost: (id: number) => void
}

type Props = { children: React.ReactNode };

const PostContext = createContext<postContectType>({} as postContectType);

export const PostProvider = ({ children }: Props) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const navigate = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const { token } = UserConsumer();
    
    useEffect(() => {
      (async () => {
        const res = await apiClient.get<Post[]>('/posts');
        setPosts(res.data);
        setIsReady(true);
      })();
    }, []);

    

    const addPost = ( 
        title: string, 
        content: string, 
        categoryId: number, 
        ) => {
          console.log(title, content, categoryId);
            apiClient.post('/posts', {title, content, categoryId}, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
      .then(res => {
        console.log(res.data);
        setPosts([...posts!, res.data]);
        toast.success('You post was added successfully');
        navigate('/');
      })
      .catch((errors: any) => toast.warning(errors.response?.data?.message));
    }

    

    const getPost = (id: number) => {
      apiClient.get(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch((errors: any) => toast.warning(errors.response.data.message));
    }

    const updatePost = (id: number, post: Post) => {
      apiClient.put(`/posts/${id}`, {post}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setPosts(posts!.map(post => post.id === id ? res.data : post));
        toast.success('You post was updated successfully');
        navigate('/');
      })
      .catch((errors: any) => toast.warning(errors.response.data.message));
    };
    
    const deletePost = (id: number) => {
      apiClient.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res.data);
        setPosts(posts!.filter(post => post.id !== id));
        toast.success('You post was deleted successfully');
      })
      .catch((errors: any) => toast.warning(errors.response.data.message));
    }


    return (
        <PostContext.Provider
          value={{ addPost, posts, getPost, updatePost, deletePost }}
        >
          {isReady ? children : null}
        </PostContext.Provider>
      );
};

export const PostConsumer = () => React.useContext(PostContext);
import { Post, PostAction } from "./types";

const PostReducer = (posts: Post[], action: PostAction): Post[] => {
    switch (action.type) {
        case 'CREATE': 
            return [action.post, ...posts];
        case 'UPDATE':
            return  {...posts};
        case 'DELETE':
            return posts.filter(p => p.id !== action.postId);
        
    }
}

export default PostReducer;
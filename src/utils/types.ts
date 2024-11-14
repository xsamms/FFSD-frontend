export type Post = {
    id: number,
    title: string,
    content: string,
    featured_image: string,
    categoryId: number,
    userId: number
}

type AddPost = {
    type: 'CREATE'
    post: Post
}

type UpdatePost = {
    type: 'UPDATE',
    postId: number
}

type DeletePost = {
    type: 'DELETE',
    postId: number
}

export type PostAction = AddPost | UpdatePost | DeletePost;

export type User = {
    id: number,
    name: string,
    email: string,
    role?: string,
    isEmailVerified?: boolean
}
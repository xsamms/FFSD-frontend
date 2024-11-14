import { useQuery} from '@tanstack/react-query'
import apiClient from './apiClient';
import { Post } from './types';

const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => apiClient.get<Post[]>('posts').then(res => res.data)
})


export default usePosts;
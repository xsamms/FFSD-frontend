import { Post } from '../utils/types'
import { UserConsumer } from '../contexts/userContext';
import PostCard from '../components/PostCard';
import { PostConsumer } from '../contexts/postContext';




const Home = () => {
  const { user, token } = UserConsumer();
  const { posts, deletePost, updatePost } = PostConsumer();


  // const {data, isLoading, error} =useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () => apiClient.get<Post[]>('/posts').then(res => res.data),
  // });

  console.log(user, token);

  return (
    <>
    <div className='relative container mx-auto flex flex-wrap pt-20'>
    {posts?.map((post: Post) => (
      <div key={post.id} className='flex w-full sm:w-1/2 md:w-1/2 lg:w-1/3'>
       <PostCard data={post} handleDelete={deletePost} handleUpdate={updatePost} />
        </div>
    ))}
    
      
    </div>
    </>
  )
}

export default Home

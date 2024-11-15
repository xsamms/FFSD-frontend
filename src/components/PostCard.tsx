import { Post } from '../utils/types'
import { Link } from 'react-router-dom'

type props = {
    data: Post,
    handleDelete: (id: number) => void,
    handleUpdate: (id: number, post: Post) => void
}

function PostCard({data, handleDelete}: props) {
  return (
        <div key={data.id} className="flex">
          <div className="p-4">
           <div className="bg-gray-800 text-white w-32 md:w-64 h-32 md:h-64 items-center justify-center">
             <div>   <img className="rounded-t-lg contain"
                src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg" alt="" />
            </div>
          <div>
            <div className='flex flex-row justify-between mt-2 px-2'>
           <Link to={`/update/${data.id}`} state={{data: data}}
          className="inline-block rounded border-2 border-blue-600 border-radius-md px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
          Edit
        </Link>
        <button type="button" onClick={() => handleDelete(data.id)}
          className="inline-block rounded border-2 border-red-600 border-radius-md px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
          Delete
        </button>
            </div>
            <Link to={`/details/${data.id}`} state={{data: data}}><h4 className="text-white text-xl font-medium pt-2 pl-2">{data.title}</h4></Link>
            
        </div>
        </div>
    </div>
</div>
    
  )
}

export default PostCard
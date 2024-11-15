import {FieldValues, useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostConsumer } from '../contexts/postContext';
import { useLocation } from 'react-router-dom';
import { Post } from '../utils/types';

const schema = z.object({
    title: z.string().min(3, {message: "Title must be at least 3 characters"}),
    content: z.string().min(10, {message: "Content must be at least 10 characters"}),
    categoryId: z.number()
  })
  
  type FormData = z.infer<typeof schema>;

function Update() {
    const location = useLocation()
    const { data: info } = location.state;
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({resolver: zodResolver(schema)});
    const { updatePost} = PostConsumer();

  console.log(info);

  const onSubmit =  (data: FieldValues) => {
    updatePost(info.id, data as Post);
  }

  return (
    <div className="bg-gray-50 font-[sans-serif]">
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full">

        <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">Update Post</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Title</label>
              <div className="relative items-center">
                <input {...register('title')} defaultValue={info.title} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter Title" />
              </div>
                  {errors.title && (
                <p className='text-red-600'>{errors.title.message}</p>
              ) }
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Category</label>
              <div className="relative  items-center">
              <select {...register('categoryId', {valueAsNumber: true})} defaultValue={info.category_id == 1 ? 'Football' : info.category_id == 2 ? 'Politics' : 'Business'} className="w-full category bg-gray-100 border border-gray-300 p-2 mb-4 outline-none">
              <option className='w-full'>Category</option>
                <option value={1}>Football</option>
                <option value={2}>Politics</option>
                <option value={3}>Business</option>
                {/* {categories && categories.map((category: any) => <option value={category.id} key={category.id} className='text-white w-full'>{category.category_name}</option>)} */}
                  </select>
                  {errors.categoryId && (
                    <p className='text-red-600'>{errors.categoryId.message}</p>
                  ) }
              </div>
            </div>

            <div>
            <label className="text-gray-800 text-sm mb-2 block">Category</label>
            <div className="relative items-center">
            <textarea {...register('content')} defaultValue={info.content} className="w-full description sec p-3 h-60 border border-gray-300 outline-none" placeholder="Type your post content here"></textarea>
               {errors.content && (
                  <p className='text-red-600'>{errors.content.message}</p>
                ) }
              </div>
            </div>


            <div className="!mt-8">
              <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Update

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import {FieldValues, useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import apiClient from '../utils/apiClient'
import { useNavigate } from "react-router-dom";
import { UserConsumer } from '../contexts/userContext';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {message: "Password must be at least 6 characters"}),
})
  


type FormData = z.infer<typeof schema>;

function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({resolver: zodResolver(schema)});
  const navigate = useNavigate();
  const { loginUser } = UserConsumer();

  const onSubmit =  (data: FieldValues) => {
    loginUser(data.email, data.password);
  }
  return (
    <div className="bg-gray-50 font-[sans-serif]">
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-md w-full">

        <div className="p-8 rounded-2xl bg-white shadow">
          <h2 className="text-gray-800 text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">User name</label>
              <div className="relative flex items-center">
                <input {...register('email')} type="email" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter your email" />
                <svg viewBox="0 0 8 6" fill="#bbb" className="w-4 h-4 absolute right-4" stroke="#bbb" xmlns="http://www.w3.org/2000/svg">
	                  <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z"/>
                  </svg>
              </div>
                  {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              ) }
            </div>

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input {...register('password')} type="password" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
                {errors.password && (
                <p className='text-red-600'>{errors.password.message}</p>
              ) }
            </div>


            <div className="!mt-8">
              <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Login
              </button>
            </div>
            <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Register here</Link></p>
          </form>
        </div>
      </div>
    </div>
  </div>    
  )
}

export default Login

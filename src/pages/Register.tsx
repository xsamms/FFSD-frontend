import { Link } from 'react-router-dom'
import {FieldValues, useForm} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserConsumer } from '../contexts/userContext';

const schema = z.object({
  name: z.string().min(3, {message: "Name must be at least 3 characters"}),
  email: z.string().email(),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}).regex(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/), {message: "Password must have minimum 8 characters, at least 1 letter, 1 number and 1 special character"}),
})
  


type FormData = z.infer<typeof schema>;

const Register = () => {
  const { registerUser } = UserConsumer();
  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({resolver: zodResolver(schema)});


  const Submit =  (data: FieldValues) => {
    registerUser(data.email, data.name, data.password);
    }
  
  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
      <h2 className="text-gray-800 text-center text-2xl font-bold">Register</h2>
        <form onSubmit={handleSubmit(Submit)}>
          <div className="space-y-6">
          <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <input {...register('name')} type="text" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter name" />
              {errors.name && (
                <p className='text-red-600'>{errors.name.message}</p>
              ) }
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input {...register('email')}  type="email" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
              {errors.email && (
                <p className='text-red-600'>{errors.email.message}</p>
              ) }
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input {...register('password')} type="password" className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
              {errors.password && (
                <p className='text-red-600'>{errors.password.message}</p>
              ) }
            </div>
            

          </div>

          <div className="!mt-12">
            <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link to='/login' className="text-blue-600 font-semibold hover:underline ml-1">Login here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register
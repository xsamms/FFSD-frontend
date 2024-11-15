import { useLocation } from 'react-router-dom';


function Details() {
  const location =useLocation()
  const { data } = location.state;
  // const { state } = props.location;
  // const {data} = state;
  console.log(data);
  return (
    <div className='relative container mx-auto flex-wrap pt-20'>
      <div>   
        <img className="rounded-t-lg contain"
                src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg" alt="" />
       </div>
      <div className='block w-full my-8 sm:w-1/2 md:w-1/2 lg:w-1/3'>
      <h1 className='text-2xl font-bold'>{data.title}</h1>
      </div>
      <div className='flex my-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/3'>
      <p>{data.content}</p>
      </div>
    </div>
  )
}

export default Details

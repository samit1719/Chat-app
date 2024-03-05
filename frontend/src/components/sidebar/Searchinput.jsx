import {IoSearchSharp} from 'react-icons/io5'

const Searchinput = () => {
  return (
    <div  className="flex items-center gap-2">
      <input type="text" placeholder="Search..." className="input input-bordered rounded-full" />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className='w-6 h-6 outlline-none'/>
      </button>
    </div>
  )
}

export default Searchinput


// starter code
// import {IoSearchSharp} from 'react-icons/io5'

// const Searchinput = () => {
//   return (
//     <div  className="flex items-center gap-2">
//       <input type="text" placeholder="Search..." className="input input-bordered rounded-full" />
//       <button type="submit" className="btn btn-circle bg-sky-500 text-white">
//         <IoSearchSharp className='w-6 h-6 outlline-none'/>
//       </button>
//     </div>
//   )
// }

// export default Searchinput


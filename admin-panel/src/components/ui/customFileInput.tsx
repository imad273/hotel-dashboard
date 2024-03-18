import React from 'react'

const CustomFileInput = ({ inputFunction }: any) => {
  return (
    <div className='w-full'>
      <label htmlFor="dropzone-file" className="flex flex-col items-center w-full p-5 mt-2 text-center border-2 border-gray-600 border-dashed cursor-pointer bg-neutral-950 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>

        <h2 className="mt-1 font-medium tracking-wide text-gray-200">Room images</h2>

        <p className="mt-2 text-xs tracking-wide text-gray-400">Upload or darg & drop your file SVG, PNG, JPG or GIF. </p>

        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => inputFunction(e.target.files)} />
      </label>
    </div>
  )
}

export default CustomFileInput
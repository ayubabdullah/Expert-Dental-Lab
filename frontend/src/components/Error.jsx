import React from 'react'

const Error = ({message}) => {
  return (
    <div className="bg-red-400 rounded-2xl">
      <p className="text-2xl text-white px-6 py-3 ">
        {message}
      </p>
    </div>
  );
}

export default Error
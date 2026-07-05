import React from 'react'

const Dashcard = ({title, description}: {title: string; description: string}) => {
  return (
    <div className ="grid justify-center items-center mt-6">
        <div className="bg-blue-900 rounded-lg shadow-md p-17">

            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
  )
}

export default Dashcard;
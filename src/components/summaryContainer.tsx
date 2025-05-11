import React from 'react'

interface IProps{
    children: React.ReactNode;
}

const SummaryContainer: React.FC<IProps> = ({children}) => {
  return (
    <div className='w-full h-auto p-4 rounded-md flex items-center gap-4'>
        {children}
    </div>
  )
}

export default SummaryContainer
import React from 'react'
import { ApText } from './text'

interface IProps{
    title: string,
    value: any,
}

const SummaryCard: React.FC<IProps> = ({title, value}) => {
  return (
    <div className='w-64 h-32 rounded-md shadow-md flex items-center flex-col p-2 z-50'>
        <ApText className='font-bold text-2xl self-start mb-7 !text-green-500'>{title}</ApText>
        <ApText className='text-center text-lg'>{value}</ApText>
    </div>
  )
}

export default SummaryCard
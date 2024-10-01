import React from 'react'
import { RiMailCheckLine, RiPhoneFindLine } from 'react-icons/ri'

const OpeningSection = ({opening}:any) => {
  return (
    <div>
      <h2 className='font-bold text-2xl text-gray-700 dark:text-gray-200 mb-4'>Opening hours</h2>
      <table className='mb-10'>
        <tbody>
          <tr>
            <td className='pr-[50px] py-2 text-primary font-semibold'>Monday</td>
            <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>{opening.monday}</td>
          </tr>
          <tr>
            <td className='pr-[50px] py-2 text-primary font-semibold'>Tuesday</td>
            <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>{opening.tuesday}</td>
          </tr>
          <tr>
            <td className='pr-[50px] py-2 text-primary font-semibold'>Wednesday</td>
            <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>{opening.wednesday}</td>
          </tr>
          <tr>
            <td className='pr-[50px] py-2 text-primary font-semibold'>Thursday</td>
            <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>{opening.thursday}</td>
          </tr>
          <tr>
            <td className='pr-[50px] py-2 text-primary font-semibold'>Friday</td>
            <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>{opening.friday}</td>
          </tr>
          <tr>
            <td className='pr-[50px] py-2 text-primary font-semibold'>Saturday</td>
            <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>{opening.saturday}</td>
          </tr>
          <tr>
            <td className='pr-[50px] py-2 text-primary font-semibold'>Sunday</td>
            <td className='pr-[50px] py-2 text-gray-600 dark:text-gray-200'>{opening.sunday}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OpeningSection
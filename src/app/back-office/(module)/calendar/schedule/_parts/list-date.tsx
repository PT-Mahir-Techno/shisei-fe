'use client'

import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

interface Props {
  monthIndex?: number
  year?: number
  onSelectChange?: (selected: { id: string; label: string }[]) => void
  selected?: any
}

export default function HariPerBulan({ monthIndex = 0, year, onSelectChange , selected }: Props) {
  const [dates, setDates] = useState<{ label: string; id: string }[]>([])
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  useEffect(() => {
    const currentYear = year || new Date().getFullYear()
    const dateList: { label: string; id: string }[] = []

    const lastDay = new Date(currentYear, monthIndex + 1, 0).getDate()

    for (let i = 1; i <= lastDay; i++) {
      const date = new Date(currentYear, monthIndex, i)
      const label = `${dayNames[date.getDay()]}, ${i.toString().padStart(2, '0')} ${monthNames[monthIndex]} ${currentYear}`
      const id = date.toISOString()
      dateList.push({ label, id })
    }

    setDates(dateList)
    setSelectedDates([])
  }, [monthIndex, year])

  useEffect(() => {
    if (onSelectChange) {
      const selected = dates.filter((d) => selectedDates.includes(d.id))
      onSelectChange(selected)
    }
  }, [selectedDates, dates, onSelectChange])

  const toggleSelect = (id: string) => {
    setSelectedDates((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedDates.length === dates.length) {
      setSelectedDates([])
    } else {
      setSelectedDates(dates.map((d) => d.id))
    }
  }

  const isAllSelected = selectedDates.length === dates.length

  return (
    <div className='space-y-4 py-4'>

      <div className='flex justify-end'>
        <Button variant="outline" size="sm" onClick={handleSelectAll} type='button'>
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </Button>
      </div>

      <div className="space-y-2 grid grid-cols-7">
        {dates.map((date) => (
          <div key={date.id} className="flex items-center gap-2 text-sm">
            <div className='overflow-hidden'>
                <input
                  id={date.id}
                  type="checkbox"
                  checked={selectedDates.includes(date.id)}
                  onChange={() => toggleSelect(date.id)}
                  className='w-4 h-4 rounded border-gray-300 bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
                />
            </div>
            <label htmlFor={date.id}>{date.label}</label>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <h2 className="font-semibold">Selected Dates:</h2>
        <ul className="text-sm list-none pl-4 mt-2 flex flex-wrap gap-3">
          {selectedDates.map((id) => {
            const item = dates.find(d => d.id === id)
            return item ? <li className='text-sm font-semibold ' key={id}>{item.label}, </li> : null
          })}
        </ul>
      </div>
    </div>
  )
}

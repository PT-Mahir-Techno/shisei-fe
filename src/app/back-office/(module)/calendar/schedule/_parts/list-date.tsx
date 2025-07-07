'use client'

import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  monthIndex?: number // 0 = January
  year?: number
}

interface DateItem {
  id: string
  label: string
}

export default function DateSelector({ monthIndex = 0, year }: Props) {
  const [dates, setDates] = useState<DateItem[]>([])
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  useEffect(() => {
    const currentYear = year || new Date().getFullYear()
    const month = monthIndex
    const totalDays = new Date(currentYear, month + 1, 0).getDate()

    const generatedDates: DateItem[] = []

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, month, day)
      const formatted = date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
      generatedDates.push({ id: date.toISOString(), label: formatted })
    }

    setDates(generatedDates)
  }, [monthIndex, year])

  const handleToggle = (id: string) => {
    setSelectedDates((prev) =>
      prev.includes(id)
        ? prev.filter((d) => d !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">Select Dates</h1>
        <div className="grid grid-cols-4 gap-2">
            {dates.map((date) => (
            <div key={date.id} className="flex items-center gap-2">
                <Checkbox
                id={date.id}
                checked={selectedDates.includes(date.id)}
                onCheckedChange={() => handleToggle(date.id)}
                />
                <label htmlFor={date.id} className="text-sm">{date.label}</label>
            </div>
            ))}
        </div>

        <div className="pt-6">
            <h2 className="font-semibold">Selected Dates:</h2>
            <ul className="text-sm list-disc pl-4 mt-2">
            {selectedDates.map((id) => {
                const item = dates.find(d => d.id === id)
                return item ? <li key={id}>{item.label}</li> : null
            })}
            </ul>
        </div>
    </div>
  )
}

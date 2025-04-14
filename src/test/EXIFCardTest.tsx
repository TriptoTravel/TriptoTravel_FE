'use client'

import { useState } from 'react'
import EXIFCard from '../components/cards/EXIFCard'
import { eXIFCardMock } from './EXIFCardMock'

export default function EXIFCardTest() {
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [timeEditMode, setTimeEditMode] = useState(false)
  const [locationEditMode, setLocationEditMode] = useState(false)

  return (
    <EXIFCard
      imageUrl={eXIFCardMock.imageUrl}
      timeMeta={{
        value: time,
        state: timeEditMode ? 'edit' : time ? 'default' : 'error',
        onEdit: () => setTimeEditMode(true),
        onSave: (v) => {
          setTime(v)
          setTimeEditMode(false)
        }
      }}
      locationMeta={{
        value: location,
        state: locationEditMode ? 'edit' : location ? 'default' : 'error',
        onEdit: () => setLocationEditMode(true),
        onSave: (v) => {
          setLocation(v)
          setLocationEditMode(false)
        }
      }}
    />
  )
}

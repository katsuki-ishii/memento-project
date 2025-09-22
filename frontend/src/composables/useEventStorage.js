const STORAGE_KEY = 'life-calendar-events'

export function useEventStorage() {
  const getEvents = () => {
    const events = localStorage.getItem(STORAGE_KEY)
    return events ? JSON.parse(events) : {}
  }

  const saveEvent = (weekNumber, text) => {
    const events = getEvents()
    events[weekNumber] = text
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  }

  const getEvent = (weekNumber) => {
    const events = getEvents()
    return events[weekNumber]
  }

  return {
    getEvents,
    saveEvent,
    getEvent,
  }
}

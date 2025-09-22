import { ref, computed, watch } from 'vue'

const BIRTHDAY_STORAGE_KEY = 'memento-birthday'
export const TOTAL_LIFE_WEEKS = 4212 // 81 years * 52 weeks

const birthday = ref(localStorage.getItem(BIRTHDAY_STORAGE_KEY) || '')
console.log('useWeeks.js: Initial birthday from localStorage:', birthday.value)

watch(birthday, (newBirthday) => {
  console.log('useWeeks.js: Watcher triggered. New birthday:', newBirthday)
  localStorage.setItem(BIRTHDAY_STORAGE_KEY, newBirthday)
})

export function useWeeks() {
  const calculateWeeks = (birthDate) => {
    const weeks = []
    const start = new Date(birthDate)
    const now = new Date()

    for (let i = 0; i < TOTAL_LIFE_WEEKS; i++) {
      // 81年分（52週 × 81）
      const weekStart = new Date(start)
      weekStart.setDate(weekStart.getDate() + i * 7)

      const age = Math.floor(i / 52)
      const weekInYear = (i % 52) + 1

      weeks.push({
        number: i + 1,
        date: weekStart,
        isPast: weekStart < now,
        hasEvent: false, // This will be updated by useEventStorage
        age: age,
        weekInYear: weekInYear,
        totalWeeks: 52,
      })
    }

    return weeks
  }

  const weeks = computed(() => {
    console.log(
      'useWeeks.js: Computed weeks triggered. Birthday:',
      birthday.value,
    )
    if (!birthday.value) return []
    return calculateWeeks(birthday.value)
  })

  return {
    birthday,
    weeks,
  }
}

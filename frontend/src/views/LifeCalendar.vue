<template>
  <div class="life-calendar">
    <div class="calendar-container" v-if="weeks.length">
      <WeekGrid :weeks="weeks" />
    </div>
    <div v-else class="placeholder">
      誕生日が設定されていません。<br>
      <router-link to="/settings">設定ページ</router-link>で誕生日を入力してください。
    </div>
  </div>
</template>

<script>
import WeekGrid from '@/components/WeekGrid.vue'
import { useWeeks } from '@/composables/useWeeks.js'
import { onMounted } from 'vue'

export default {
  name: 'LifeCalendar',
  components: {
    WeekGrid
  },
  setup() {
    const { weeks, birthday } = useWeeks()

    onMounted(() => {
      console.log('LifeCalendar.vue: Component mounted. Birthday:', birthday.value)
    })

    return {
      weeks
    }
  }
}
</script>
<style scoped>
.placeholder a {
  color: #333;
  font-weight: 500;
}

.life-calendar {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-container {
  overflow-x: auto;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.placeholder {
  text-align: center;
  padding: 40px;
  background: #f5f5f5;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 
<template>
  <div class="settings-view">
    <h1>設定</h1>
    <div class="settings-section">
      <h2>プロフィール設定</h2>
      <p>誕生日を設定すると、あなたのライフカレンダーが生成されます。</p>
      <BirthdayInput v-model="birthday" />
      <button @click="saveSettings" class="save-button">保存</button>
    </div>
    <!-- 今後、他の設定項目もここに追加できます -->
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import BirthdayInput from '@/components/BirthdayInput.vue'
import { useWeeks } from '@/composables/useWeeks.js'

export default {
  name: 'SettingsView',
  components: {
    BirthdayInput
  },
  setup() {
    const { birthday } = useWeeks()
    const router = useRouter()

    const saveSettings = () => {
      // The birthday is already saved automatically by the watcher in useWeeks.js.
      // We just need to navigate the user back to the calendar.
      router.push('/')
    }

    return {
      birthday,
      saveSettings
    }
  }
}
</script>

<style scoped>
.settings-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 300;
}

.settings-section {
  margin-bottom: 3rem;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
}

h2, p {
  text-align: left;
}

.save-button {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: #555;
}
</style>
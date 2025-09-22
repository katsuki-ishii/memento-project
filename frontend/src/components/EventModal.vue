<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <h2>
        Age: {{ age }}<br />
        Week: {{ weekInYear }}/{{ totalWeeks }}<br />
        Life {{ percentagePassed }}/100％
      </h2>
      <div class="event-form">
        <textarea
          v-model="eventText"
          placeholder="イベントを入力してください"
        ></textarea>
        <button @click="saveEvent">保存</button>
        <button @click="$emit('close')">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useEventStorage } from '../composables/useEventStorage.js'
import { TOTAL_LIFE_WEEKS } from '../composables/useWeeks.js'

export default {
  name: 'EventModal',
  props: {
    week: {
      type: Object,
      required: true,
    },
  },
  computed: {
    age() {
      return this.week.age
    },
    weekInYear() {
      return this.week.weekInYear
    },
    totalWeeks() {
      return this.week.totalWeeks
    },
    percentagePassed() {
      if (this.week && typeof this.week.number !== 'undefined') {
        // week.number は 1-indexed の通算週番号
        return ((this.week.number / TOTAL_LIFE_WEEKS) * 100).toFixed(1)
      }
      return 0
    },
  },
  data() {
    return {
      eventText: '',
    }
  },
  methods: {
    async saveEvent() {
      const { saveEvent } = useEventStorage()
      await saveEvent(this.week.number, this.eventText)
      this.$emit('close')
    },
  },
  mounted() {
    const { getEvent } = useEventStorage()
    this.eventText = getEvent(this.week.number) || ''
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 600px;
  animation: zoomInEffect 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.modal-content h2 {
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  color: #333;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  min-height: 200px;
  padding: 8px;
}

button {
  padding: 8px;
  cursor: pointer;
}

@keyframes zoomInEffect {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

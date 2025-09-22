<template>
  <div class="grid-container">
    <div class="axis-label age-axis">Age</div>
    <div class="age-labels">
      <div v-for="age in 81" :key="age" class="age-label">
        {{ age - 1 }}
      </div>
    </div>
    <div class="grid-and-week-labels">
      <div class="week-grid">
        <WeekCell
          v-for="(week, index) in weeks"
          :key="index"
          :week="week"
          @click="openEventModal(week)"
        />
        <EventModal v-if="showModal" :week="selectedWeek" @close="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import WeekCell from './WeekCell.vue'
import EventModal from './EventModal.vue'

export default {
  name: 'WeekGrid',
  components: {
    WeekCell,
    EventModal,
  },
  props: {
    weeks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      selectedWeek: null,
    }
  },
  methods: {
    openEventModal(week) {
      this.selectedWeek = week
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedWeek = null
    },
  },
}
</script>

<style scoped>
.grid-container {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin: 0 auto;
  max-width: fit-content;
  padding-top: 10px;
}

.axis-label {
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.age-axis {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  text-align: center;
  padding-right: 2px;
}

.age-labels {
  display: grid;
  grid-template-rows: repeat(81, 1fr);
  gap: 2px;
  padding-top: 20px;
  padding-right: 5px;
  font-size: 12px;
  color: #666;
  height: calc(81 * 14px + 40px);
}

.age-label {
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3px;
}

.grid-and-week-labels {
  display: flex;
  flex-direction: column;
}

.week-grid {
  display: grid;
  grid-template-columns: repeat(52, 1fr);
  grid-template-rows: repeat(81, 14px);
  gap: 2px;
  padding: 20px;
}
</style>

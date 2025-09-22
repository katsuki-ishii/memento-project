<template>
  <div
    class="week-cell"
    :class="{
      'has-event': week.hasEvent,
      'is-past': week.isPast,
    }"
    @click="$emit('click')"
  ></div>
</template>

<script>
export default {
  name: 'WeekCell',
  props: {
    week: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.week-cell {
  aspect-ratio: 1;
  width: 12px;
  height: 12px;
  background-color: #e5e5e5;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.2s;
}

.week-cell:hover {
  transform: scale(1.2);
  border-color: #666;
}

.week-cell.has-event {
  background-color: #4caf50;
  border-color: #388e3c;
}

.week-cell.is-past {
  background-color: #9e9e9e;
  border-color: #757575;
}
</style>

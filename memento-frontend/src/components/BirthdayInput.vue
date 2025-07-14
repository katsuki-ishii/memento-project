<template>
  <div class="birthday-input">
    <label>誕生日を選択してください：</label>
    <input 
      type="date" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'BirthdayInput',
  props: {
    modelValue: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.birthday-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  text-align: center;
}

.birthday-input label {
  font-size: 1rem;
  color: #333;
}

input[type="date"] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 200px;
  text-align: center;
}

input[type="date"]:focus {
  outline: none;
  border-color: #666;
}
</style> 
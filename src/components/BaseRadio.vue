<script setup>

defineProps({
   label: {
      type: String,
      required: true
   },
   modelValue: {
      type: [String, Number]
   },
   value: {
      type: [String, Number]
   },
   error: {
      type: String,
      default: ''
   },
   uuid: {
      type: Number,
      required: true
   }
})
</script>

<template>
   <input
      type="radio"
      v-bind="{ ...$attrs, onChange: () =>{ $emit('update:modelValue', value)} }"
      :checked="modelValue === value"
      :id="uuid"
   />
   <label :for="uuid">{{ label }}</label>
   <BaseErrorMessage v-if="error" :id="`${uuid}-error`">
      {{ error }}
   </BaseErrorMessage>
</template>

<script setup>

defineProps({
   options: {
      type: Array,
      required: true
   },
   label: {
      type: String,
      required: true
   },
   error: {
      type: String,
      default: ''
   },
   modelValue: {
      type: [String, Number]
   },
   uuid: {
      type: Number,
      required: true
   }
})

</script>

<template>
   <label :for="uuid">{{ label }}</label>
   <select
      class="field"
      v-bind="{ ...$attrs, onChange: ($event) =>{ $emit('update:modelValue', $event.target.value) } }"
      :value="modelValue"
      :id="uuid"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="!!error"
      :class="{ error }"
   >
      <option
         v-for="option in options"
         :value="option"
         :key="option"
         :selected="option === modelValue"
      >
         {{ option }}
      </option>
   </select>
   <BaseErrorMessage v-if="error" :id="`${uuid}-error`">
      {{ error }}
   </BaseErrorMessage>
</template>

<script setup>

defineProps({
   label: {
      type: String,
      required: true
   },
   error: {
      type: String,
      default: ''
   },
   modelValue: {
      type: [String, Number],
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
      v-bind="{ ...$attrs, onChange: ($event) =>{ $emit('update:modelValue', $event.target.checked)} }"
      :checked="modelValue"
      :id="uuid"
      type="checkbox"
      class="field"
   />
   <label :for="uuid">{{ label }}</label>
   <BaseErrorMessage v-if="error" :id="`${uuid}-error`">
      {{ error }}
   </BaseErrorMessage>
</template>



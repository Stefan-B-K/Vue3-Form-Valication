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
   <label :for="uuid">{{ label }}</label>
   <input
      v-bind="{...$attrs, onChange: ($event) =>{ $emit('update:modelValue', $event.target.value) } }"
      :id="uuid"
      :value="modelValue"
      class="field"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="!!error"
      :class="{ error }"
   >
   <BaseErrorMessage v-if="error" :id="`${uuid}-error`">
      {{ error }}
   </BaseErrorMessage>
</template>



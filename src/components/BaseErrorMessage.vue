<script setup>
defineProps({
   id: {
      type: [String, Number],
      required: true
   }
})
</script>

<template>
   <p aria-live="assertive" :id="id" class="errorMessage">
      <slot/>
   </p>
</template>


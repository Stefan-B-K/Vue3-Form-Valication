<script setup>
import axios from 'axios'
import { useField, useForm } from 'vee-validate'
import { object, string, number, boolean } from 'yup'
import { reactive } from 'vue'
import { UniqueID } from '../features/UniqueID.js'

const categories = reactive([
   'sustainability',
   'nature',
   'animal welfare',
   'housing',
   'education',
   'food',
   'community'
])

const petOptions = reactive([
   { value: 1, label: 'Yes', uuid: UniqueID() },
   { value: 0, label: 'No', uuid: UniqueID() }
])

const validationSchema = object({
   category: string().required(),
   title: string().required('A cool title of is required (min 3 letters)').min(3),
   description: string().required(),
   location: string(),
   pets: number(),
   catering: boolean(),
   music: boolean()
})

const { handleSubmit, errors } = useForm({
   validationSchema,
   initialValues: {
      pets: 1,
      catering: false,
      music: false
   }
})

const { value: category } = useField('category')
const { value: title } = useField('title')
const { value: description } = useField('description')
const { value: location } = useField('location')
const { value: pets } = useField('pets')
const { value: catering } = useField('catering')
const { value: music } = useField('music')

const submit = handleSubmit(values => {
   axios.post('https://json-server.istef.ml/events', values).then(() => window.location.reload())

})

const allEvents = reactive([])
axios.get('https://json-server.istef.ml/events').then((res, _) => allEvents.push(res.data))

</script>


<template>
   <div>
      <h1>Create an Event</h1>
      <form @submit.prevent="submit">


         <fieldset>
            <legend>Name & describe your event</legend>
            <BaseSelect
               label="Select a category"
               :options="categories"
               v-model="category"
               :uuid="UniqueID()"
               :error="errors.category"
            />

            <BaseInput
               label="Title"
               type="text"
               v-model="title"
               :uuid="UniqueID()"
               :error="errors.title"
            />

            <BaseInput
               label="Description"
               type="text"
               v-model="description"
               :uuid="UniqueID()"
               :error="errors.description"
            />
         </fieldset>

         <fieldset>
            <legend>Where is your event?</legend>
            <BaseInput
               label="Location"
               type="text"
               v-model="location"
               :uuid="UniqueID()"
               :error="errors.location"
            />
         </fieldset>

         <fieldset>
            <legend>Are pets allowed?</legend>
            <BaseRadioGroup
               name="pets"
               :options="petOptions"
               v-model="pets"
               :error="errors.pets"
            />
         </fieldset>

         <fieldset>
            <legend>Extras</legend>
            <div>
               <BaseCheckbox
                  label="Catering"
                  v-model="catering"
                  :uuid="UniqueID()"
                  :error="errors.catering"
               />
            </div>

            <div>
               <BaseCheckbox
                  label="Live music"
                  v-model="music"
                  :uuid="UniqueID()"
                  :error="errors.music"
               />
            </div>
         </fieldset>

         <div>
            <BaseButton
               type="submit"
               class="-fill-gradient"
               something="else"
            >
               Submit
            </BaseButton>
         </div>
      </form>
      <pre v-if="allEvents.length">{{ allEvents }}</pre>
   </div>
</template>

<style scoped>
fieldset {
   border: 0;
   margin: 0;
   padding: 0;
}

legend {
   font-size: 28px;
   font-weight: 700;
   margin-top: 20px;
}
</style>

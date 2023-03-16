<script setup lang="ts">
import { reactive } from 'vue'
import { enroll, EnrollmentRequest } from '@/apis/participant.api'
import { fromPairs } from 'lodash';

// do not use same name with ref
const form = reactive({
  name: '',
  email: '',
  host: false,
  street: '',
  houseNumber: '',
  vegetarian: false,
  vegan: false,
  enlishSpeaker: false,
  germanSpeaker: false,
  starter: false,
  course: false,
  dessert: false
})

const onSubmit = () => {
  console.log('submit!')
  const req : EnrollmentRequest = {
    name: form.name,
    email: form.email,
    vegan: form.vegan,
    vegetarian: form.vegetarian,
    englishSpeaker: form.enlishSpeaker,
    germanSpeaker: form.germanSpeaker,
    street: form.street,
    houseNumber: Number(form.houseNumber),
    host: form.host,
    appetizer: form.starter,
    mainCourse: form.course,
    dessert: form.dessert
  }
  enroll(req)
}
</script>

<template>
  <div class="front">
    <el-form :model="form">
      <div>
        <label>Can you host in your kitchen?</label><br>
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="form.host" class="ml-4">
            <el-radio label="1" size="large">I can host</el-radio>
            <el-radio label="0" size="large">I cannot host</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div>
        <label>Could you kindly provide me with your address?</label><br>
        <el-row :gutter="2">
          <el-col :span="16"><el-input v-model="form.street" placeholder="Street" /></el-col>
          <el-col :span="8"><el-input v-model="form.houseNumber" placeholder="House number" type="number"/></el-col>
        </el-row>
      </div>

      <div>
        <label>Are you a vegetarian or vegan?</label><br>
        <div>
          <el-checkbox v-model="form.vegetarian" label="I am vegetarian" size="large" />
          <el-checkbox v-model="form.vegan" label="I am vegan" size="large" />
        </div>
      </div>

      <div>
        <label>What languages do you speak?</label><br>
        <div>
          <el-checkbox v-model="form.enlishSpeaker" label="I speak English" size="large" />
          <el-checkbox v-model="form.germanSpeaker" label="I speak german" size="large" />
        </div>
      </div>

      <div>
        <label>Which course would you like to prepare?</label><br>
        <div>
          <el-checkbox v-model="form.starter" label="I can prepare starter" size="large" />
          <el-checkbox v-model="form.course" label="I can prepare main course" size="large" />
          <el-checkbox v-model="form.dessert" label="I can prepare dessert" size="large" />
        </div>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
form.span {
  color: white
}

</style>
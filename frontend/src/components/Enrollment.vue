<script setup lang="ts">
import { reactive } from 'vue'
import { enroll, EnrollmentRequest } from '@/apis/participant.api'

defineProps<{
  withFriend?: boolean
}>()


// do not use same name with ref
const form = reactive({
  name: '',
  email: '',
  friendName: '',
  friendEmail: '',
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
    friendName: form.friendName,
    friendEmail: form.friendEmail,
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
        <el-form-item label="Your name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Your email">
        <el-input v-model="form.email" />
      </el-form-item>
      </div>
      <div v-if="withFriend">
        <el-form-item label="Your friend's name">
        <el-input v-model="form.friendName" />
      </el-form-item>
      <el-form-item label="Your friend's email">
        <el-input v-model="form.friendEmail" />
      </el-form-item>
      </div>
      <div>
        <label>Can you host in your kitchen?</label><br>
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="form.host" class="ml-4">
            <el-radio :label=true size="large">I can host</el-radio>
            <el-radio :label=false size="large">I cannot host</el-radio>
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

      <el-form-item class="commit-box">
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.front {
  text-align: left;
  padding: 1em;
}
form.span {
  color: white
}

.commit-box {
  margin: 0.5em auto;
  width: fit-content;
}

</style>
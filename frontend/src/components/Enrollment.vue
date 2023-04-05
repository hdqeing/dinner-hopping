<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { enroll, EnrollmentRequest } from '@/apis/participant.api'

defineProps<{
  withFriend?: boolean
}>()

const formRef = ref<FormInstance>()
// do not use same name with ref
const form = reactive({
  name: '',
  email: '',
  friendName: '',
  friendEmail: '',
  host: undefined,
  street: '',
  houseNumber: '',
  vegetarian: false,
  vegan: false,
  languages: [] as string[],
  courses: [] as string[]
})

const rules = reactive<FormRules>({
  name : [
    { required: true, message: 'How do I address you?', trigger: 'blur'}
  ],
  email : [
    { required: true, message: 'Please provide your email address for further correspondence!', trigger: 'blur'},
    { type: 'email', message: 'The email address you provided is not formatted correctly.', trigger: 'blur'}
  ],
  host : [
    { type:'boolean', required: true, message: 'Please select if you can host?', trigger: 'change' }
  ],
  street: [
    { required: true, message: 'Please input the name of the street where your home is located?', trigger: 'blur'}
  ],
  houseNumber: [
    { required: true, message: 'Please input the house number', trigger: 'blur'}
  ],
  languages: [
    { type: 'array', required: true, message: 'Please select at least one language', trigger:'change'}
  ],
  courses: [
    { type: 'array', required: true, message: 'Please select at least one course', trigger:'change'}
  ]

})

const onSubmit = async (formEl : FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      const req : EnrollmentRequest = {
        name: form.name,
        email: form.email,
        friendName: form.friendName,
        friendEmail: form.friendEmail,
        vegan: form.vegan,
        vegetarian: form.vegetarian,
        englishSpeaker: form.languages.includes('I speak English'),
        germanSpeaker: form.languages.includes('I speak German'),
        street: form.street,
        houseNumber: Number(form.houseNumber),
        host: form.host,
        appetizer: form.courses.includes('I can prepare starter'),
        mainCourse: form.courses.includes('I can prepare main course'),
        dessert: form.courses.includes('I can prepare dessert')
      }
      enroll(req)
    } else {
      console.log('error submit!', fields)
    }
  })
  
}
</script>

<template>
  <div class="front">
    <el-form ref="formRef" :model="form" :rules="rules" status-icon>
      <div>
        <el-form-item label="Your name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Your email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      </div>
      <div v-if="withFriend">
        <el-form-item label="Your friend's name" prop="friendName">
        <el-input v-model="form.friendName" />
      </el-form-item>
      <el-form-item label="Your friend's email" prop="friendEmail">
        <el-input v-model="form.friendEmail" />
      </el-form-item>
      </div>
      <div>
        <label>Could you kindly offer a dining room at your home?</label><br>
        <div class="mb-2 flex items-center text-sm">
          <el-form-item  prop="host">
            <el-radio-group v-model="form.host" class="ml-4">
              <el-radio :label=true size="large">I can host</el-radio>
              <el-radio :label=false size="large">I cannot host</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div>
        <label>Could you kindly provide me with your address?</label><br>
        <el-row :gutter="2">
          <el-col :span="16"><el-form-item prop="street"><el-input v-model="form.street" placeholder="Street" /></el-form-item></el-col>
          <el-col :span="8"><el-form-item prop="houseNumber"><el-input v-model="form.houseNumber" placeholder="House number" type="number"/></el-form-item></el-col>
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
          <el-form-item prop="languages">
            <el-checkbox-group v-model="form.languages">
              <el-checkbox name="languages" label="I speak English" size="large" />
              <el-checkbox name="languages" label="I speak german" size="large" />
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>

      <div>
        <label>Which course would you like to prepare?</label><br>
        <div>
          <el-form-item prop="courses">
            <el-checkbox-group v-model="form.courses" >
              <el-checkbox name="courses" label="I can prepare starter" size="large" />
              <el-checkbox name="courses" label="I can prepare main course" size="large" />
              <el-checkbox name="courses" label="I can prepare dessert" size="large" />
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>

      <el-form-item class="commit-box">
        <el-button type="primary" @click="onSubmit(formRef)">Create</el-button>
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
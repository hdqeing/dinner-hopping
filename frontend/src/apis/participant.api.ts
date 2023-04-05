import request from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'

const open = () => {
  ElMessageBox.alert('Congrats, check your email now.', 'Success', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK'
  })
}

export const enroll = (req: EnrollmentRequest) => {
  request
    .post('participant', req)
    .then((data: any) => {
      console.log(data)
      if (data.success) {
        open()
      } else {
        ElMessage.error("Failed to register, try again later.")
      }
    }).catch( reason => {
      console.warn(reason)
      ElMessage.error('Network or System error.')
    });
};

export interface EnrollmentRequest {
  name: string;
  email: string;
  friendName?: string;
  friendEmail?: string;
  phonenumber?: string | null;
  vegan: boolean;
  vegetarian: boolean;
  englishSpeaker: boolean;
  germanSpeaker: boolean;
  street?: string | null;
  houseNumber?: number | null;
  host: boolean | undefined;
  appetizer: boolean;
  mainCourse: boolean;
  dessert: boolean;
  comment?: string | null;
}

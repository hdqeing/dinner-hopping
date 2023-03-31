import request from '@/utils/request'

export const enroll = (req: EnrollmentRequest) => {
  request
    .post('participant', req)
    .then((response: { data: any }) => {
      console.log(response.data)
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
  host: boolean;
  appetizer: boolean;
  mainCourse: boolean;
  dessert: boolean;
  comment?: string | null;
}

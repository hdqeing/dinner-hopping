/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface AddParticipantRequest {
  name: string;
  email: string;
  friendName: string;
  friendEmail: string;
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

/**
 * @description Mail-Service parameters
 */
export interface SendMailEvent {
  /**
   * destination email address
   */
  to: string;
  /**
   * email title
   */
  subject: string;
  /**
   * email content: Support email content in html format
   */
  html: string;
}

export interface RegistrationSuccessEmailVariables {
  appellation: string;
  qa: QuestionAndAnswer[];
  verificationUrl: string;
}

export interface QuestionAndAnswer {
  question: string;
  answer: string;
}

export declare const enum EmailType {
  TEST = 1,
  REGISTRATION_SUCCESS,
}

export interface KeyValuePair {
  key: string;
  value: string;
}


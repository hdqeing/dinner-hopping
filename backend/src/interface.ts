/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface AddParticipantRequest {
  name: string;
  email: string;
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

/**
 * @description authentication credentials
 */
export interface OAuthCredentials {
  /** User e-mail address */
  user: string;
  /** Client ID value */
  clientId: string;
  /** Client secret value */
  clientSecret: string;
  /** Refresh token for an user */
  refreshToken: string;
  /** An existing valid accessToken */
  accessToken: string;
}

export declare const enum EmailType {
  TEST = 1,
}

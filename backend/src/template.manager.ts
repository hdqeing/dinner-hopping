import { Inject, Provide, Singleton } from '@midwayjs/core';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { participant } from '@prisma/client';
import { EmailType, RegistrationSuccessEmailVariables } from './interface';
import { join } from 'path';
import { VerificationService } from './service/verification.service';

@Provide()
@Singleton()
export class TemplateManager {

  @Inject()
  private verificationService: VerificationService;

  compliedTemplate: Map<EmailType, HandlebarsTemplateDelegate<any>>;
  constructor() {
    this.compliedTemplate = new Map();
  }

  async getTemplate(type: EmailType) {
    let result = this.compliedTemplate[type];
    if (!result) {
      const path = this.getTemplatePath(type);
      result = compile(readFileSync(path, 'utf-8'));
      this.compliedTemplate[type] = result;
    }
    return result;
  }

  getTemplatePath(type: EmailType) {
    if (type === EmailType.TEST) {
      return join(__dirname, './template/generate/test.html');
    } else if (type === EmailType.REGISTRATION_SUCCESS) {
      return join(__dirname, './template/generate/registration_success.html');
    }
    return '';
  }

  async getRegistrationSuccessHtml(pojo: participant): Promise<string> {
    let appellation = 'participant';
    const languages = [];
    let host = 'I cannnot';
    const address = [];
    const course = [];
    // Get appellation
    if (pojo.applicant_name && pojo.applicant_name !== '') {
      if (pojo.friend_name !== null && pojo.friend_name !== '') {
        appellation = pojo.applicant_name + ' and ' + pojo.friend_name;
      } else {
        appellation = pojo.applicant_name;
      }
    }
    // Get host
    if (pojo.host) {
      if (pojo.house_number) {
        address.push(pojo.house_number);
      }
      if (pojo.street) {
        address.push(pojo.street);
      }
      host =
        'I can host' + (address.length > 0 ? ' at ' + address.join(' ') : '');
    }
    // Get language
    if (pojo.english_speaker) {
      languages.push('english');
    }
    if (pojo.german_speaker) {
      languages.push('german');
    }
    // Get course
    if (pojo.appetizer) {
      course.push('appetizer');
    }
    if (pojo.main_course) {
      course.push('main_course');
    }
    if (pojo.dessert) {
      course.push('dessert');
    }
    const jwt = await this.verificationService.createToken(pojo.participant_id);
    //const veriUrl = 'https://api.dinnerhoppinggoettingen.de/verification/?jwt='+jwt;
    const veriUrl = 'https://localhost:4365/verification/?jwt='+jwt;
    const vars: RegistrationSuccessEmailVariables = {
      verificationUrl: veriUrl,
      appellation: appellation,
      qa: [
        {
          question: 'Can you host in your kitchen?',
          answer: host,
        },
        {
          question: 'What languages do you speak?',
          answer: languages.join(','),
        },
        {
          question: 'Which course would you like to prepare?',
          answer: course.join(','),
        },
      ],
    };
    console.log(vars);
    const tmp = await this.getTemplate(EmailType.REGISTRATION_SUCCESS);
    return tmp(vars);
  }
}

import { Config, Provide } from '@midwayjs/core';
import { OAuthCredentials } from './interface';
import request from 'superagent';

@Provide()
export class TokenManager {
  @Config('oauth2')
  credentials: OAuthCredentials;

  accessToken: string;

  getAccessToken() {
    return this.accessToken || this.credentials.accessToken;
  }

  async refreshAccessToken() {
    const refreshToken: string = this.credentials.refreshToken;
    const clientId: string = this.credentials.clientId;
    const clientSecret: string = this.credentials.clientSecret;

    const url = 'https://oauth2.googleapis.com/token';
    request
      .post(url)
      .type('form')
      .send({
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'refresh_token',
      })
      .then(response => {
        const data = response.body;
        console.log(data);
        // use the new access token here
        if (data) {
          this.accessToken = data.access_token;
          setTimeout(
            () => this.refreshAccessToken(),
            (data.expires_in - 59) * 1000,
            'refreshAccessToken'
          );
        }
      })
      .catch(error => console.error(error));
  }
}

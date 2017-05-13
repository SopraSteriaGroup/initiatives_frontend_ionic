export interface TokenModel {

  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: Date;
  user_info?: string;

}

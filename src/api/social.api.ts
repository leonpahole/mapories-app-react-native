import {postRequest} from './api';
import {LoginResponse} from './auth.api';

export interface SocialProviderData {
  name: string;
  email: string;
  profilePictureUrl?: string;
}

export interface LoginSocialResponse {
  existingUserLoginData: LoginResponse | null;
  nonExistingUser: SocialProviderData | null;
}

export type SocialProvider = 'facebook' | 'google' | 'twitter';

export const loginSocial = async (
  accessToken: string,
  provider: SocialProvider,
  accessTokenSecret?: string,
): Promise<LoginSocialResponse> => {
  return postRequest<LoginSocialResponse>(
    `/auth/login-social/${provider}`,
    {
      accessToken,
      accessTokenSecret,
    },
    false,
  );
};

export const registerSocial = async (
  name: string,
  provider: SocialProvider,
  accessToken: string,
  profilePictureUrl?: string,
  accessTokenSecret?: string,
): Promise<LoginResponse> => {
  return postRequest<LoginResponse>(
    `/auth/register-social/${provider}`,
    {
      name,
      accessToken,
      accessTokenSecret,
      profilePictureUrl,
    },
    false,
  );
};

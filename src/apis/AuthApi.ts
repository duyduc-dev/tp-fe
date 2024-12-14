import firebaseService from '@/configs/firebase.ts';
import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import httpRequest from '@/https/Axios.ts';
import { queryClient } from '@/libs/react-query.ts';
import { AuthDetail, TokenGoogleLogin } from '@/types/auth.ts';
import { UserDetail } from '@/types/user.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

class AuthApi {
  async getAuthInfo() {
    const result = await httpRequest.get<UserDetail>(API_URL.auth.authInfo);
    return result.data;
  }

  async logout() {
    const res = await httpRequest.delete(API_URL.auth.logout);
    queryClient.removeQueries({
      queryKey: [StorageHelper.getAuthToken()?.accessToken ?? '', QueryKeys.USER_DETAIL],
    });
    await firebaseService.deleteFcmToken();
    StorageHelper.deleteAuthToken();
    return res.data;
  }

  async googleLogin({ token }: TokenGoogleLogin) {
    const { data } = await httpRequest.post<TokenGoogleLogin, AuthDetail>(
      API_URL.auth.googleLogin,
      {
        token,
      },
    );
    if (data.accessToken) {
      StorageHelper.setAuthToken({
        accessToken: data.accessToken,
        expireTime: data.expireTime,
      });
    }
    return data;
  }
}

export default new AuthApi();

import { yupResolver } from '@hookform/resolvers/yup';
import md5 from 'md5';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { LuEye, LuEyeOff, LuLock, LuMail } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import Image from '@/components/Image';
import Input from '@/components/Input';
import { InternalLink } from '@/components/Link';
import firebaseService from '@/configs/firebase.ts';
import { Routes } from '@/constants/Routes';
import useGoogleLogin from '@/features/auth/apis/googleLogin.ts';
import useLogin from '@/features/auth/apis/login.ts';
import useAppLayout from '@/hooks/useAppLayout.ts';
import useAuthDetail from '@/hooks/useAuthDetail';
import { useQueryString } from '@/hooks/useQueryString.ts';
import yup from '@/libs/yup';
import { FormLogin } from '@/types/auth';
import { HttpResponse, RedirectUrlType } from '@/types/common.ts';
import { formatHttpErrorResponse, sleep } from '@/utils/helper.ts';
import RouterHelper from '@/utils/RouterHelper.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

const loginSchema = yup.object<FormLogin>().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

type Params = {
  refresh: boolean;
} & RedirectUrlType;

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isShowPassword, setShowPassword] = useState(false);
  const { setAuthDetail } = useAuthDetail();

  const [queryString] = useQueryString<Params>();

  const { mutateAsync: loginAsync } = useLogin();
  const { mutateAsync: googleLogin } = useGoogleLogin();

  const { setLoadingScreen } = useAppLayout();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormLogin>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver<FormLogin>(loginSchema),
  });

  const submitLogin = async (values: FormLogin) => {
    let id;
    try {
      const res = await loginAsync({
        username: values.email,
        passwordHash: md5(values.password),
      });
      if (res.accessToken) {
        StorageHelper.setAuthToken(res);
        setAuthDetail(res);
        const url = queryString.redirect ?? Routes.ROOT;
        navigate(
          RouterHelper.addParams(
            url,
            queryString.redirect && {
              refresh: queryString.refresh,
            },
          ),
        );
      }
    } catch (e) {
      const err = e as HttpResponse;
      toast.dismiss(id);
      toast.error(err.description);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const auth = await firebaseService.signInWithPopup();
      // @ts-ignore
      const token = auth.user?.accessToken;

      setLoadingScreen(true);
      const res = await googleLogin({
        token: token,
      });
      if (res.accessToken) {
        setAuthDetail(res);
        await sleep(100);
        StorageHelper.setAuthToken(res);
        const url = queryString.redirect ?? Routes.ROOT;
        navigate(
          RouterHelper.addParams(
            url,
            queryString.redirect && {
              refresh: queryString.refresh,
            },
          ),
        );
      }
      setLoadingScreen(false);
    } catch (e) {
      setLoadingScreen(false);
      const err = formatHttpErrorResponse(e);
      toast.error(err.description);
    }
  };

  return (
    <div className="flex items-center gap-20 justify-center bg-cover min-h-screen bg-[url('/assets/login-bg.png')] ">
      <div className="sm:h-[90%] sm:bg-white/40 rounded-[12px] h-full w-full max-w-[460px] max-h-[80vh] p-4 py-5">
        <div className="flex flex-col items-center ">
          <Image
            src="/assets/TechPlatformLogo.png"
            containerClassName="w-[60px] h-[60px]"
            alt="logo"
          />
          <h2 className="text-[18px] font-semibold text-center mt-5">{t`loginInTp`}</h2>
        </div>
        <form onSubmit={handleSubmit(submitLogin)} className="flex flex-col items-center px-6 ">
          <div className="w-full mb-4">
            <p className="text-[13px] font-medium mb-1">{t`email`}</p>
            <Input
              touched={touchedFields.email}
              errorMessage={errors.email?.message}
              containerInputClassName="bg-neutral-100 text-[14px]"
              leftIcon={<LuMail size={20} />}
              placeholder="abc@gmail.com"
              {...register('email')}
            />
          </div>
          <div className="w-full">
            <p className="text-[13px] font-medium mb-1">{t`password`}</p>
            <Input
              touched={touchedFields.password}
              type={isShowPassword ? 'text' : 'password'}
              containerInputClassName="bg-neutral-100  text-[14px]"
              leftIcon={<LuLock size={20} />}
              placeholder="123456"
              rightIcon={
                <button tabIndex={-1} type="button" onClick={() => setShowPassword((p) => !p)}>
                  {isShowPassword ? <LuEye /> : <LuEyeOff />}
                </button>
              }
              {...register('password')}
              errorMessage={errors.password?.message}
            />
          </div>
          <div className="flex justify-end w-full">
            <InternalLink className="text-[13px] text-[#CACACA] !font-[400] mt-1" to={'/'}>
              Quên mật khẩu
            </InternalLink>
          </div>
          <Button fullWidth type="submit" variant="gradient" className="mt-4">
            Đăng nhập
          </Button>
        </form>
        <div className="flex items-center justify-center gap-5 mt-5">
          <div className="h-[0.5px] w-[30%] bg-[#CACACA]"></div>
          <span className="text-sm text-[#CACACA]">{t`or`}</span>
          <div className="h-[0.5px] w-[30%] bg-[#CACACA]"></div>
        </div>
        <div className="flex justify-center my-4">
          <Button onClick={handleLoginGoogle} className="flex items-center gap-3 bg-white">
            <FcGoogle size={20} />
          </Button>
        </div>
        <div className="text-center text-[14px] mt-4 flex items-center gap-2 justify-center">
          <span>{t`doYouAlreadyHaveAnAccount`}</span>
          <InternalLink to={Routes.SIGNUP}>{t`signUp`}</InternalLink>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image source="/assets/login-right.png" className="h-[70vh] object-cover" />
      </div>
    </div>
  );
};

export default LoginPage;

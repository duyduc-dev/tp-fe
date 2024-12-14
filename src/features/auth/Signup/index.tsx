import { yupResolver } from '@hookform/resolvers/yup';
import md5 from 'md5';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FcGoogle } from 'react-icons/fc';
import { LuEye, LuEyeOff, LuLock, LuMail, LuUser } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import DialogOtp, { DialogOtpRef } from '@/components/DialogOtp';
import Input from '@/components/Input';
import { InternalLink } from '@/components/Link';
import firebaseService from '@/configs/firebase.ts';
import { Routes } from '@/constants/Routes';
import useGoogleLogin from '@/features/auth/apis/googleLogin.ts';
import useSignUpConfirm from '@/features/auth/apis/signUpConfirm.ts';
import useSignUpVerify from '@/features/auth/apis/signupVerify.ts';
import useAppLayout from '@/hooks/useAppLayout.ts';
import useAuthDetail from '@/hooks/useAuthDetail';
import { useQueryString } from '@/hooks/useQueryString.ts';
import yup from '@/libs/yup';
import { FormSignUp } from '@/types/auth';
import { HttpResponse } from '@/types/common.ts';
import { formatHttpErrorResponse, sleep } from '@/utils/helper.ts';
import RouterHelper from '@/utils/RouterHelper.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

const signUpSchema = yup.object<FormSignUp>().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    // @ts-ignore
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const SignUpPage = () => {
  const { t } = useTranslation();
  const [queryString] = useQueryString();

  const [isShowPassword, setShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const dialogRef = useRef<DialogOtpRef>(null);
  const navigate = useNavigate();

  const [loadingDialogOtp, setLoadingDialogOtp] = useState(false);
  const [loadingButtonGoogle, setLoadingButtonGoogle] = useState(false);
  const [disableBtnGoogle, setDisableBtnGoogle] = useState(false);

  const currentTokenResponseRef = useRef('');

  const { mutateAsync: signUpVerify } = useSignUpVerify();
  const { mutateAsync: signUpConfirm } = useSignUpConfirm();
  const { mutateAsync: googleLogin } = useGoogleLogin();
  const { setLoadingScreen } = useAppLayout();

  const { setAuthDetail } = useAuthDetail();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormSignUp>({
    defaultValues: {
      email: '',
      confirmPassword: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver<FormSignUp>(signUpSchema),
  });

  const submitSignup = async (values: FormSignUp) => {
    try {
      const payload = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        passwordHash: md5(values.confirmPassword),
      };
      setLoadingScreen(true);

      const response = await signUpVerify(payload);
      currentTokenResponseRef.current = response.token;
      dialogRef.current?.open();
      setLoadingScreen(false);
    } catch (e) {
      setLoadingScreen(false);
      const err = e as HttpResponse;
      toast.error(err.description);
    }
  };

  const handleSendOtp = async (token: string) => {
    let id;
    try {
      id = toast.loading('Đang tải');
      setLoadingScreen(true);
      const data = await signUpConfirm({
        token: currentTokenResponseRef.current,
        passcode: token,
      });
      if (data.accessToken) {
        StorageHelper.setAuthToken(data);
        setAuthDetail(data);
      }
      dialogRef.current?.close();
      currentTokenResponseRef.current = '';
      toast.dismiss(id);
      toast.success('Đăng ký thành công');
      navigate(Routes.INTRO);
      setLoadingScreen(false);
    } catch (e) {
      toast.dismiss(id);
      const err = formatHttpErrorResponse(e);
      toast.error(err.description);
      await sleep(200);
      dialogRef.current?.clearOTP();
      dialogRef.current?.blur();
      dialogRef.current?.focus();
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const auth = await firebaseService.signInWithPopup();
      // @ts-ignore
      const token = auth.user?.accessToken;
      setLoadingButtonGoogle(true);
      setDisableBtnGoogle(true);
      setLoadingScreen(true);
      const res = await googleLogin({
        token: token,
      });
      if (res.accessToken) {
        setAuthDetail(res);
        await sleep(100);
        StorageHelper.setAuthToken(res);
        const url = queryString?.redirect ?? Routes.ROOT;
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

      setLoadingButtonGoogle(false);
      setDisableBtnGoogle(false);
    } catch (e) {
      setLoadingScreen(false);

      setLoadingButtonGoogle(false);
      setDisableBtnGoogle(false);
      const err = formatHttpErrorResponse(e);
      toast.error(err.description);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-10">
      <div className="min-w-[360px] max-w-[400px]">
        <h1 className="text-[28px] font-[700] text-center pb-[50px]">TechPlatform</h1>
        <form onSubmit={handleSubmit(submitSignup)} className="flex flex-col gap-4">
          <Input
            touched={touchedFields.firstName}
            errorMessage={errors.firstName?.message}
            placeholder={t`firstName`}
            {...register('firstName')}
            leftIcon={<LuUser size={20} />}
          />
          <Input
            touched={touchedFields.lastName}
            errorMessage={errors.lastName?.message}
            placeholder={t`lastName`}
            {...register('lastName')}
            leftIcon={<LuUser size={20} />}
          />
          <Input
            touched={touchedFields.email}
            errorMessage={errors.email?.message}
            placeholder={t`email`}
            {...register('email')}
            leftIcon={<LuMail size={20} />}
          />
          <Input
            touched={touchedFields.password}
            placeholder={t`password`}
            leftIcon={<LuLock size={20} />}
            type={isShowPassword ? 'text' : 'password'}
            {...register('password')}
            errorMessage={errors.password?.message}
            rightIcon={
              <button type="button" tabIndex={-1} onClick={() => setShowPassword((p) => !p)}>
                {isShowPassword ? <LuEye /> : <LuEyeOff />}
              </button>
            }
          />
          <Input
            touched={touchedFields.confirmPassword}
            placeholder={t`confirmPassword`}
            leftIcon={<LuLock size={20} />}
            type={isShowConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            errorMessage={errors.confirmPassword?.message}
            rightIcon={
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setIsShowConfirmPassword((p) => !p)}
              >
                {isShowConfirmPassword ? <LuEye /> : <LuEyeOff />}
              </button>
            }
          />
          <Button fullWidth type="submit" variant="primary">
            {t`signUp`}
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-full bg-gray-100" />
            <span>{t`or`}</span>
            <div className="h-[1px] w-full bg-gray-100" />
          </div>
          <Button
            onClick={handleLoginGoogle}
            fullWidth
            disabled={disableBtnGoogle}
            loading={loadingButtonGoogle}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <FcGoogle />
            {t`google`}
          </Button>
          <div className="text-center text-[14px] mt-4">
            <span>{t`doYouAlreadyHaveAnAccount`} </span>
            <InternalLink to={Routes.AUTH}>{t`signIn`}</InternalLink>
          </div>
        </form>
      </div>

      <DialogOtp
        onOpen={() => {
          dialogRef.current?.resetCount();
          dialogRef.current?.startCount();
        }}
        loading={loadingDialogOtp}
        onResend={async () => {
          setLoadingDialogOtp(true);

          setLoadingDialogOtp(false);
          dialogRef.current?.resetCount();
          dialogRef.current?.startCount();
        }}
        onSend={handleSendOtp}
        ref={dialogRef}
      />
    </div>
  );
};

export default SignUpPage;

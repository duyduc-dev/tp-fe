import type { MessagePayload } from 'firebase/messaging';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import useUpdateDevice from '@/apis/updateDevice.ts';
import firebaseService from '@/configs/firebase.ts';
import useAuthDetail from '@/hooks/useAuthDetail.ts';
import { PaymentCoursePushNotification } from '@/types/course.ts';
import EventHepler from '@/utils/EventHepler.ts';
import PermissionHelper from '@/utils/PermissionHelper.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

export const UPDATE_FCM_KEYS = 'fcm:update-device';

const usePushNotification = () => {
  const { mutateAsync: updateDevice } = useUpdateDevice();
  const { authDetail } = useAuthDetail();

  const updateFCMToken = async () => {
    const permit = await PermissionHelper.requestNotification();
    if (permit === 'granted') {
      const fcmToken = await firebaseService.getFCMToken();
      console.log(`updateFCMToken ~ fcmToken:`, fcmToken);
      if (fcmToken) {
        await updateDevice({
          data: { fcmToken: fcmToken },
        });
      }
    }
  };

  const handleMessageFromFCM = () => {
    const auth = StorageHelper.getAuthToken();
    if (!auth || !auth.accessToken) return;
    return firebaseService.onMessageFCM((value) => {
      console.log('FCM arrived', value);
      notificationHandler(value);
      toast.success(value.notification?.title ?? '', {});
    });
  };

  const notificationHandler = (value: MessagePayload) => {
    if (value.data?.type === 'PAYMENT_COURSE') {
      EventHepler.dispatch<PaymentCoursePushNotification>(
        'dialog:handleDataPayment',
        value.data as any,
      );
    }
  };

  useEffect(() => {
    const auth = StorageHelper.getAuthToken();
    if (!auth || !auth.accessToken) return;
    updateFCMToken();
    const remove = handleMessageFromFCM();
    return () => {
      remove?.();
    };
  }, [authDetail]);

  useEffect(() => {
    EventHepler.subscriber(UPDATE_FCM_KEYS, () => {
      updateFCMToken();
    });
    return () => {
      EventHepler.remove(UPDATE_FCM_KEYS, updateFCMToken);
    };
  }, []);

  useEffect(() => {}, []);
};

export default usePushNotification;

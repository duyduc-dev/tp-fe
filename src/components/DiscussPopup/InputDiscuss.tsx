import { useUpdateEffect } from 'hooks-react-custom';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAuthInfo from '@/apis/getAuthInfo.ts';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';

type Props = {
  onChangeText: (text: string) => void;
};

export type InputDiscussRef = {
  clear(): void;
  setModeAdvanced: (bo: boolean) => void;
};

const InputDiscuss = forwardRef<InputDiscussRef, Props>(({ onChangeText }, ref) => {
  const { t } = useTranslation();
  const { data: userDetail } = useAuthInfo();

  const [value, setValue] = useState('');

  const [isDiscussAdvanced, setIsDiscussAdvanced] = useState(false);

  useUpdateEffect(() => {
    onChangeText(value);
  }, [value]);

  useImperativeHandle(ref, () => ({
    clear() {
      setValue('');
    },
    setModeAdvanced: (bo) => {
      setIsDiscussAdvanced(bo);
    },
  }));

  return (
    <div>
      <div className="flex items-center gap-4">
        <Avatar containerClassName="border border-neutral-100" src={userDetail?.profileImage} />
        <div className="flex-1">
          {!isDiscussAdvanced ? (
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              containerClassName="flex-1"
              placeholder={t`discuss`}
              rightIcon={
                <Button
                  onClick={() => setIsDiscussAdvanced(true)}
                  className="!h-auto !py-0 !px-1 text-[13px] hover:underline text-neutral-500"
                >{t`advanced`}</Button>
              }
            />
          ) : (
            <Button
              variant="secondary"
              onClick={() => setIsDiscussAdvanced(false)}
              className="!h-auto !py-0 !px-1 text-[13px] "
            >{t`basic`}</Button>
          )}
        </div>
      </div>
      {isDiscussAdvanced && (
        <TextEditor
          maxHeight={200}
          value={value}
          onChange={(text) => setValue(text ?? '')}
          containerClassName="mt-4"
        />
      )}
    </div>
  );
});
InputDiscuss.displayName = 'InputDiscuss';
export default InputDiscuss;

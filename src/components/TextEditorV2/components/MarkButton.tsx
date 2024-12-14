import { FC, ReactNode } from 'react';
import { Text } from 'slate';

import { cn } from '@/utils/helper';

// import TextEditorHelper from '../TextEditorHelper';

type Props = {
  type: keyof Omit<Text, 'text'>;
  icon: ReactNode;
};
const MarkButton: FC<Props> = ({ icon }) => {
  // const isActive = TextEditorHelper.isMarkActive(editor, type);

  const handleClick = () => {
    // TextEditorHelper.toggleMark(editor, type);
  };

  return (
    <button type="button" onClick={handleClick} className={cn(' px-2 py-1 rounded-md')}>
      {icon}
    </button>
  );
};

export default MarkButton;

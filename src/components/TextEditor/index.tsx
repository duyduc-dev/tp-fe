import { type MDEditorProps } from '@uiw/react-md-editor';
import { FC } from 'react';

type Props = {
  containerClassName?: string;
} & MDEditorProps;

const TextEditor: FC<Props> = (props) => {
  const { containerClassName, value, } = props;
  console.log(`value:`, value);

  return <div className={containerClassName}>{/* <AppTextEditorV2 initialValue={value} /> */}</div>;
};

export default TextEditor;

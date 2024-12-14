import { ReactNode } from 'react';

type Props = {
  title?: string;
  children?: ReactNode;
  contentClassName?: string;
};

const Widget = (props: Props) => {
  const { children, title, contentClassName } = props;
  return (
    <div>
      <h4 className="text-[20px] font-[900]">{title}</h4>
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

export default Widget;

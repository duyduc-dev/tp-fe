import { PropsWithChildren } from 'react';

const CourseContainer = ({ children }: PropsWithChildren) => {
  return <div className="pt-[74px] min-h-screen">{children}</div>;
};

export default CourseContainer;

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import useAppLayout from '@/hooks/useAppLayout';

import Button from '../Button';

function ToggleSidebar() {
  const { isSidebarOpen, setSidebarOpen } = useAppLayout();
  return (
    <Button onClick={() => setSidebarOpen(!isSidebarOpen)}>
      {isSidebarOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
    </Button>
  );
}

export default ToggleSidebar;

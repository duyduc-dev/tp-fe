import React, { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

import { cn } from '@/utils/helper';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
      onPageChange(pageNumber);
    }
  };

  const generatePageButtons = (): React.ReactNode => {
    const buttonCount = 6;
    const halfButtonCount = Math.floor(buttonCount / 2);

    const startIndex = Math.max(Math.min(page - halfButtonCount, totalPages - buttonCount + 1), 1);
    const endIndex = Math.min(startIndex + buttonCount - 1, totalPages);

    const buttons = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const isActive = i === page;
      buttons.push(
        <button
          key={i}
          className={cn(
            'w-7 h-7 rounded-[4px] flex items-center justify-center',
            isActive && 'bg-black text-white',
          )}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className="mt-5 flex justify-between items-center">
      <button
        className="w-7 h-7 rounded-[4px] flex items-center justify-center"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <FaAngleDoubleLeft />
      </button>
      <div className="flex justify-center items-center gap-1">{generatePageButtons()}</div>
      <button
        className="w-7 h-7 rounded-[4px] flex items-center justify-center"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;

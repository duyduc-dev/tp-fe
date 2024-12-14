import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';

import { cn } from '@/utils/helper.ts';

interface CollapseProps {
  data?: any[];
  renderLabel: (dataItem: any, index: number, isExpanded: boolean) => React.ReactNode;
  renderContent: (dataItem: any, index: number, isExpanded: boolean) => React.ReactNode;
  onChange?: (expandedIndexes: number[]) => void;
  containerClassName?: string;
  containItemClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  labelWrapperComponent?: any;
  onCustomClickLabel?: (item: any, index: number, isOpen: boolean) => void;
  lazy?: boolean;
}

export type CollapseRef = {
  expandAll: () => void;
  closeAll: () => void;
  expandIndex: (index: number) => void;
  closeIndex: (index: number) => void;
  toggleIndex: (index: number) => void;
  toggleAll: () => void;
};

const Collapse = forwardRef<CollapseRef, CollapseProps>(
  (
    {
      data = [],
      renderLabel,
      renderContent,
      onChange,
      containerClassName,
      containItemClassName,
      labelClassName,
      contentClassName,
      disabled,
      labelWrapperComponent: WrapperComponent = 'button',
      onCustomClickLabel,
      lazy,
    },
    ref,
  ) => {
    const [indexExpanded, setIndexExpanded] = useState<number[]>([]);

    const expandAll = () => {
      if (data.length > indexExpanded.length) {
        const _data = data.map((_, index) => index);
        onChange?.(_data);
        setIndexExpanded(_data);
      }
    };

    const closeAll = () => {
      onChange?.([]);
      setIndexExpanded([]);
    };

    const expandIndex = (index: number) => {
      const _data = [...indexExpanded, index];
      onChange?.(_data);
      setIndexExpanded(_data);
    };

    const closeIndex = (index: number) => {
      if (indexExpanded.includes(index)) {
        const filter = indexExpanded.filter((indexItem) => indexItem !== index);
        onChange?.(filter);
        setIndexExpanded(filter);
      }
    };

    const toggleIndex = (index: number) => {
      if (indexExpanded.includes(index)) {
        closeIndex(index);
      } else {
        expandIndex(index);
      }
    };

    const toggleAll = () => {
      if (indexExpanded.length < data.length) {
        expandAll();
      } else {
        closeAll();
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        expandAll,
        closeAll,
        expandIndex,
        closeIndex,
        toggleIndex,
        toggleAll,
      }),
      [indexExpanded],
    );

    return (
      <div className={containerClassName}>
        {data.map((dataItem, index) => (
          <div key={`${index}`} className={containItemClassName}>
            <WrapperComponent
              disabled={disabled}
              onClick={() =>
                onCustomClickLabel
                  ? onCustomClickLabel(dataItem, index, indexExpanded.includes(index))
                  : toggleIndex(index)
              }
              className={labelClassName}
            >
              {renderLabel(dataItem, index, indexExpanded.includes(index))}
            </WrapperComponent>
            {lazy ? (
              <div className={cn(!indexExpanded.includes(index) && 'hidden', contentClassName)}>
                {renderContent(dataItem, index, indexExpanded.includes(index))}
              </div>
            ) : (
              indexExpanded.includes(index) && (
                <div className={contentClassName}>
                  {renderContent(dataItem, index, indexExpanded.includes(index))}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    );
  },
);

Collapse.displayName = 'Collapse';

export default memo(Collapse);

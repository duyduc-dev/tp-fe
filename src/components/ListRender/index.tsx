import { ReactNode } from 'react';

type Props<T> = {
  data: Array<T>;
  renderItem: (item: T, index: number, thisData: Array<T>) => ReactNode;
  itemClassName?: string;
  containerClassName?: string;
  renderEmpty?: () => ReactNode;
};

const ListRender = <T,>(props: Props<T>) => {
  const { containerClassName, itemClassName, data, renderItem, renderEmpty } = props;

  return (
    <div className={containerClassName}>
      {data.map((item, index, thisData) => (
        <div key={`${index}-${thisData.length}-dev`} className={itemClassName}>
          {renderItem(item, index, thisData)}
        </div>
      ))}
      {data.length === 0 && renderEmpty?.()}
    </div>
  );
};

export default ListRender;

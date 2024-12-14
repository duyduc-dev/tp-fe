import Markdown from '@uiw/react-markdown-preview';

import Avatar from '@/components/Avatar';
import ListRender from '@/components/ListRender';
import { CommentResponse } from '@/types/comment.ts';

type Props = {
  item: CommentResponse;
};

const CommentItem = (props: Props) => {
  const { item } = props;

  return (
    <div className="mb-5">
      <div className="flex">
        <Avatar
          size={32}
          containerClassName="border border-neutral-100"
          src={item.user.profileImage}
        />
        <div className="pt-2 pb-3 px-3 mx-4 bg-neutral-50 flex-1 rounded-[8px]">
          <span className="font-[500] text-[14px]">
            {item.user.firstName ?? ''} {item.user.lastName ?? ''}
          </span>
          <Markdown
            wrapperElement={{ 'data-color-mode': 'light' }}
            className="!bg-neutral-50 !text-[14px] mt-4 ml-2 !font-RobotoRegular"
            source={item.content}
          />
          {/*<div className="flex justify-end mt-2">*/}
          {/*  <button className="text-[13px] hover:underline font-[500] text-blue-500">{t`reply`}</button>*/}
          {/*</div>*/}
        </div>
      </div>
      <ListRender
        containerClassName="ml-10 mt-5 "
        data={item.children ?? []}
        renderItem={(item) => <CommentItem item={item} />}
      />
    </div>
  );
};

export default CommentItem;

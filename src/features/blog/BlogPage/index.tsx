import { useEffect, useState } from 'react';

import BlogCard from '@/components/BlogCard';
import { SkeletonCard, SkeletonLargeCard } from '@/components/BlogCard/SkeletonCard';
import Pagination from '@/components/Pagination';
// import Image from '@/components/Image';
import Widget from '@/components/Widget';

const BlogPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handlePageChange = (pageNumber: number) => {
    // Fetch data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    console.log('change page: ' + pageNumber);
  };

  return (
    <div className="px-5">
      {/* <div className="flex items-center">
        <Image
          source="https://png.pngtree.com/png-clipart/20220103/original/pngtree-modern-n-tech-logo-png-image_7020757.png"
          alt="logo"
          containerClassName="w-20 h-20"
        />
        <h2 className="font-bold">Blog Tech</h2>
      </div> */}
      <div>
        <div className="flex gap-12 mt-5">
          {isLoading ? (
            <SkeletonLargeCard />
          ) : (
            <BlogCard
              thumbnail="https://files.fullstack.edu.vn/f8-prod/blog_posts/7924/64a2487459fe5.jpg"
              description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate temporibus error ea eligendi suscipit? Sint?"
              title="Tôi đã viết Chrome extension đầu tiên của mình bằng Github Copilot như thế nào?"
              type="large"
            />
          )}
          <div className="hidden xl:block">
            <h2 className="uppercase font-semibold text-neutral-500">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              <p className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full px-4 cursor-pointer font-medium">
                Front-end / Mobile apps
              </p>
              <p className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full px-4 cursor-pointer font-medium">
                Back-end / Devops
              </p>
              <p className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full px-4 cursor-pointer font-medium">
                UI / UX / Design
              </p>
              <p className="p-2 hover:bg-gray-200 bg-gray-100 rounded-full px-4 cursor-pointer font-medium">
                Others
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 py-3">
          <Widget
            title="Bài viết mới"
            contentClassName="mt-4 grid 2xl:grid-cols-4 grid-col-1 lg:grid-cols-3 md:grid-cols-2 gap-4 gap-x-8"
          >
            {isLoading ? (
              <SkeletonCard cards={6} />
            ) : (
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <BlogCard
                    key={index}
                    thumbnail="https://files.fullstack.edu.vn/f8-prod/blog_posts/7924/64a2487459fe5.jpg"
                    description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate temporibus error ea eligendi suscipit? Sint?"
                    title="Tôi đã viết Chrome extension đầu tiên của mình bằng Github Copilot như thế nào?"
                  />
                ))
            )}
          </Widget>
          <Pagination currentPage={7} totalPages={10} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

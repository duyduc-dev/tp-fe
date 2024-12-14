import { HtmlIcon, NodeJsIcon, ReactIcon, TailwindIcon } from '@/components/icons';
import BallBlurIcon from '@/components/icons/BallBlurIcon.tsx';
import Image from '@/components/Image';
import ListRender from '@/components/ListRender';
import AppTooltip from '@/components/Tooltip';
import Container from '@/layouts/partial/Container.tsx';
import { cn } from '@/utils/helper.ts';

import styles from './style.module.scss';

const HomePage = () => {
  const listIcon = [
    {
      icon: <ReactIcon width={24} height={24} />,
      title: 'React',
    },
    {
      icon: <HtmlIcon width={24} height={24} />,
      title: 'HTML',
    },
    {
      icon: <TailwindIcon width={24} height={24} />,
      title: 'TailwindCss',
    },
    {
      icon: <NodeJsIcon width={24} height={24} />,
      title: 'NodeJs',
    },
  ];

  const listCourse = [
    {
      general: [
        {
          title: 'Xây dựng layout 1 trang web',
          description: 'Xây dựng layout 1 trong web',
        },
        {
          title: 'Xây dựng layout 1 trang web',
          description: 'Xây dựng layout 1 trong web',
        },
        {
          title: 'Xây dựng layout 1 trang web',
          description: 'Xây dựng layout 1 trong web',
        },
      ],
      imageUrl: '/assets/banner-example-general.png',
      linearGradient: ['#2C5364', 'rgba(83, 105, 118, 0.93)', 'rgba(187, 210, 197, 0.85)'],
      courseName: 'Thiết kế web với HTML, CSS',
    },
    {
      general: [
        {
          title: 'Xây dựng layout 1 trang web',
          description: 'Xây dựng layout 1 trong web',
        },
        {
          title: 'Xây dựng layout 1 trang web',
          description: 'Xây dựng layout 1 trong web',
        },
        {
          title: 'Xây dựng layout 1 trang web',
          description: 'Xây dựng layout 1 trong web',
        },
      ],
      imageUrl: '/assets/banner-example-general.png',
      linearGradient: ['#10112B', '#474853'],
      courseName: 'Thiết kế web với HTML, CSS',
    },
  ];

  return (
    <div className="pt-[64px] lg:pt-0">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center z-[-1]">
          <Image src="/assets/bg-banner-home.png" className="object-cover" />
        </div>
        <Container className="flex flex-col-reverse lg:flex-row items-center  z-[10] min-h-screen">
          <div className="flex-1 ">
            <div>
              <p className={cn(styles.titleLarge, 'text-[48px] font-RobotoBold')}>
                Học Lập trình cùng TechPlatform
              </p>
            </div>
            <p className="max-w-[500px] text-[15px] mt-5">
              Đừng bỏ qua ứng dụng học lập trình trực tuyến hấp dẫn này. Tìm hiểu thêm về thiết kế,
              đoạn mã bằng cách xây dựng các ứng dụng thực tế với các ngôn ngữ lập trình. Hoàn thành
              các khoá học về các công cụ tốt nhất
            </p>
            <div className="mt-5 flex items-center gap-4 bg-white rounded-[12px] w-fit p-3 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
              <div className="bg-black w-[42px] h-[42px] flex items-center justify-center rounded-full">
                <HtmlIcon width={28} height={28} />
              </div>
              <div>
                <p className="text-[14px] font-RobotoMedium">Khóa học Thiết kế Web với HTML, CSS</p>
                <p className="text-[14px] text-neutral-500">Free</p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex-1 flex items-center justify-center z-[10]">
            <Image src="/assets/banner-home.png" className="max-w-[500px] z-[10]" />
          </div>
        </Container>
      </div>
      <div className="mt-[64px] lg:mt-5 relative">
        <Image
          src="/assets/ball-haft.png"
          containerClassName="absolute bottom-0 left-0 z-[-1]"
          className="max-h-[400px] object-cover w-fit"
        />
        <div className="absolute top-0 right-0 z-[-1]">
          <BallBlurIcon />
        </div>
        <Container className="flex flex-col lg:flex-row gap-4 lg:items-end">
          <div className="flex-1">
            <div className="max-w-[380px] ">
              <h2 className="font-RobotoBold text-[24px] mb-4 ">
                Tìm hiểu các công cụ và nền tảng tốt nhất
              </h2>
              <p className="text-[15px]">
                Chúng tôi tập trung vào các nền tảng hàng đầu trong ngành để bạn có thể chuẩn bị cho
                công việc, học tập tiếp theo của mình. Sau đó chúng tôi dạy tất cả những gì có thể
                về họ.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <ListRender
              containerClassName="flex items-center gap-4"
              data={listIcon}
              renderItem={(item) => (
                <div
                  data-tooltip-id="tooltip-icon"
                  data-tooltip-content={item.title}
                  className="w-[46px] h-[46px] rounded-full bg-[#1A204C] flex items-center justify-center"
                >
                  {item.icon}
                </div>
              )}
            />
            <AppTooltip id="tooltip-icon" />
          </div>
        </Container>

        <Container containerClassName="mt-[64px] mb-8">
          <div className="">
            <ListRender
              containerClassName="flex flex-col lg:flex-row items-center gap-4"
              itemClassName="flex-1"
              data={listCourse}
              renderItem={(item, parentIndex) => (
                <div
                  className={cn(
                    'flex-1 flex gap-4 backdrop-blur border border-neutral-100 p-4 rounded-[12px]',
                    parentIndex % 2 !== 0 && 'flex-row-reverse',
                  )}
                >
                  <div>
                    <h3 className="text-neutral-600 font-RobotoMedium mb-6">KHOÁ HỌC NỔI BẬT</h3>
                    <div>
                      {item.general.map((childItem, index) => (
                        <div
                          key={`${index}-${childItem.title}`}
                          className="flex items-center gap-5 mb-8"
                        >
                          <div className="min-w-[42px] h-[42px] bg-black text-white rounded-full flex items-center justify-center font-RobotoBold text-[24px]">
                            {index + 1}
                          </div>
                          <div>
                            <p className="mb-2.5 font-RobotoBold">{childItem.title}</p>
                            <p className="text-[13px] text-gray-950">{childItem.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div
                      className="p-4 rounded-[12px] h-full flex flex-col justify-center gap-4"
                      style={{
                        backgroundImage: `linear-gradient(${item.linearGradient.join(',')})`,
                      }}
                    >
                      <Image src={item.imageUrl} className="max-w-[240px]" />
                      <div>
                        <p className="text-white font-RobotoMedium text-[18px] text-center">
                          {item.courseName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;

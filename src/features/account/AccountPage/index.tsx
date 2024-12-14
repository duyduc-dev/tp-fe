import { FaUserGroup } from 'react-icons/fa6';

import useAuthInfo from '@/apis/getAuthInfo.ts';

import bg from './img/bg.jpg';
import course from './img/course.jpg';
import course2 from './img/course2.jpg';
import user from './img/user.jpg';

const AccountPage = () => {
  const { data: userDetail } = useAuthInfo();

  return (
    <div className="pb-[30px]">
      {/* Background */}
      <div className={'flex justify-center'}>
        <img
          src={bg}
          alt="background"
          className={'w-full h-[300px] bg-black object-cover rounded-b-[20px]'}
        />
      </div>

      {/* Avatar */}
      <div className={'flex justify-start ml-[40px]'}>
        <img
          src={userDetail?.profileImage ?? user}
          alt="avatar"
          className={
            'w-[150px] h-[150px] -mt-[80px] bg-white rounded-full border-solid border-white border-solid border-8'
          }
        />
        <p className={'text-[25px] mt-[10px] ml-5 font-bold'}>
          {userDetail?.firstName} {userDetail?.lastName}
        </p>
      </div>

      <div className={'flex flex-row justify-between'}>
        {/* General Infor */}
        <div className={'flex-1 ml-[40px] mr-[40px]'}>
          <div className={'bg-slate-50 shadow-md mt-[30px] pb-[30px] pl-[15px]'}>
            <h6 className={'text-[16px] font-bold pt-[20px] pl-[15px]'}>Giới thiệu</h6>

            <div className={'flex space-x-[10px]'}>
              <FaUserGroup className={'mt-[20px] ml-[15px] text-gray-400 flex-none'} />
              <p className={'text-gray-400 flex-1 pt-[15px]'}>
                Thành viên của F8 - Học lập trình để đi làm từ 2 năm trước
              </p>
            </div>
          </div>

          <div className={'bg-slate-50 shadow-md mt-[20px] pb-[30px] pl-[15px]'}>
            <h6 className={'text-[16px] font-bold pt-[20px] pl-[15px]'}>Hoạt động gần đây</h6>
            <p className={'text-gray-400 flex-1 pt-[10px] pl-[15px]'}>Chưa có hoạt động gần đây</p>
          </div>
        </div>

        {/* Course */}
        <div
          className={
            'bg-slate-50 shadow-md mt-[30px] mb-[10px] pl-[15px] flex-1 -ml-[20px] mr-[40px] pb-[25px]'
          }
        >
          <h6 className={'text-[16px] font-bold pt-[20px] pl-[15px]'}>Các khóa học đã tham gia</h6>
          <div className={'flex space-x-[10px]'}>
            <a href="/#">
              <img
                src={course}
                alt="Khóa học"
                className={
                  'flex-none w-[200px] h-[120px] mt-[20px] ml-[15px] object-cover rounded-[20px]'
                }
              />
            </a>
            <div className={'flex-1'}>
              <a href="/#">
                <p className={'pt-[15px] pl-[15px] pr-[15px] font-bold'}>
                  Lập trình C++ cơ bản, nâng cao
                </p>
              </a>
              <p className={'pt-[10px] pl-[15px] pr-[15px]'}>
                Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu.
              </p>
            </div>
          </div>
          <hr className={'mt-[40px]'} />

          <h6 className={'text-[16px] font-bold pt-[20px] pl-[15px]'}>Các khóa học đã tham gia</h6>
          <div className={'flex space-x-[10px]'}>
            <a href="/#">
              <img
                src={course2}
                alt="Khóa học"
                className={
                  'flex-none w-[200px] h-[120px] mt-[20px] ml-[15px] object-cover rounded-[20px]'
                }
              />
            </a>
            <div className={'flex-1'}>
              <a href="/#">
                <p className={'pt-[15px] pl-[15px] pr-[15px] font-bold'}>
                  Làm việc với Terminal & Ubuntu
                </p>
              </a>
              <p className={'pt-[10px] pl-[15px] pr-[15px]'}>
                Ubuntu là một bước quan trọng trên con đường trở thành một Web Developer
              </p>
            </div>
          </div>
          <hr className={'mt-[40px]'} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

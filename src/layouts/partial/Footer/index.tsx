import Container from '@/layouts/partial/Container.tsx';

const Footer = () => {
  return (
    <footer className="h-[46px] bg-neutral-50 ">
      <Container
        containerClassName="h-full flex items-center"
        className="text-[13px] font-RobotoBold  text-neutral-500"
      >
        &#169; COPYRIGHT
      </Container>
    </footer>
  );
};

export default Footer;

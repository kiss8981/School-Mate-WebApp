import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import usePreviousValue from "@/hooks/usePreviousValue";

const Wrapper = styled(motion.div)`
  flex-direction: column;
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);

  padding-right: 10px;
  padding-left: 10px;

  margin: 0 auto;

  overflow: auto;
`;

const HeaderWrapper = styled(motion.div)`
  height: 48px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: relative;
  padding-top: 16px;
  padding-bottom: 4px;
`;

const HandleBar = styled(motion.div)`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: #d0d0d0;
  margin: auto;
`;

const ContentWrapper = styled.div`
  padding: 10px;
`;

const Backdrop = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(0 0 0 / 50%);
`;

const BottomSheet = ({
  children,
  header,
  canClose = true,
  isOpened = true,
  className = "",
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  canClose?: boolean;
  isOpened: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(isOpened);
  const controls = useAnimation();
  const prevIsOpen = usePreviousValue(isOpen);

  useEffect(() => {
    if (isOpened) {
      controls.start("visible");
      setIsOpen(true);
    } else {
      controls.start("hidden");
      setIsOpen(false);
    }
  }, [controls, isOpened]);

  const onDragEnd = (info: any) => {
    const shouldClose = info?.y > 20 || (info?.y >= 0 && info.point.y > 45);

    if (shouldClose) {
      controls.start("hidden");
      setIsOpen(false);
    } else {
      controls.start("visible");
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start("hidden");

      setTimeout(() => {
        controls.set("closed");
      }, 300);
    } else if (!prevIsOpen && isOpen) {
      controls.start("visible");
    }
  }, [controls, isOpen, prevIsOpen]);

  return (
    <>
      {isOpen && <Backdrop />}
      <Wrapper
        className={className}
        drag={canClose ? "y" : undefined}
        onDragEnd={onDragEnd}
        initial="hidden"
        animate={controls}
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 15px)",
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 400,
        }}
        variants={{
          visible: { y: 0, visibility: "visible" },
          hidden: { y: "100vh" },
          closed: { visibility: "hidden" },
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
      >
        <HeaderWrapper>{header ? header : <HandleBar />}</HeaderWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    </>
  );
};

export default BottomSheet;

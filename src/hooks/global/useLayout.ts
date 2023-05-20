import { useEffect, useState } from "react";
import { create } from "zustand";

interface useLayoutStoreInterface {
  modalName: string;
  isMobile: boolean;
  isMobileNavOpen: boolean;
  setModalName: (name: string) => void;
  setIsMobile: (val: boolean) => void;
}

const useLayoutStore = create<useLayoutStoreInterface>((set) => ({
  modalName: "",
  isMobile: false,
  isMobileNavOpen: false,
  setModalName: (name: string) =>
    set({
      modalName: name,
    }),

  setIsMobile: (isMobile: boolean) =>
    set({
      isMobile: isMobile,
    }),
}));

const useLayout = () => {
  const { modalName, setModalName, isMobile, setIsMobile, isMobileNavOpen } =
    useLayoutStore();
  const [yScrollPosition, setYScrollPosition] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
    };
    if (window) {
      window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  useEffect(() => {
    const handleScrollEvent = () =>
      window ? setYScrollPosition(window.scrollY) : null;
    if (document) document.addEventListener("scroll", handleScrollEvent);
    return () => document.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return {
    modalName,
    setModalName,
    isMobile,
    setIsMobile,
    isMobileNavOpen,
    yScrollPosition,
  };
};
export default useLayout;

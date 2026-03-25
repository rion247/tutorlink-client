import Logo from "@/components/shared/Logo";
import TLContainer from "@/components/ui/core/TLContainer";
import React from "react";

const RegisterPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TLContainer className="mt-5 xl:mt-10 flex flex-col md:px-10 md:flex-row justify-between items-center h-full ">
      <Logo />
      {children}
    </TLContainer>
  );
};
export default RegisterPageLayout;

import { Navigator } from "@/src/components/navigator";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      {children}
      <Navigator />
    </div>
  );
};

export default AppLayout;

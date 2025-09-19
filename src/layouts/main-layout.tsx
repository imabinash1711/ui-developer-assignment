import Navbar from "../components/navbar";
import { RightSideBar } from "../components/right-sidebar";
import { Sidebar } from "../components/sidebar";
import { SIDEBAR_OPTIONS } from "../constants/sidebar-options";
import { SidebarProvider } from "../context/sidebar-provider";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-light-black transition-colors duration-200 flex">
      <SidebarProvider>
        <Sidebar
          name="ByeWind"
          icon="/assets/ByeWind.png"
          options={SIDEBAR_OPTIONS}
        />
        <div className="flex flex-1 flex-col w-full">
          <Navbar />
          <main className="text-gray-800 dark:text-gray-200 h-container overflow-auto">
            {children}
          </main>
        </div>
        <RightSideBar />
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;

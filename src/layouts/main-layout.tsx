import Navbar from "../components/navbar";
import { Sidebar, type SidebarOption } from "../components/sidebar";
import { SidebarProvider } from "../context/sidebar-provider";

interface LayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_OPTIONS: Record<string, SidebarOption[]> = {
  Dashboards: [
    {
      label: "Default",
      icon: "ChartPieSlice",
      path: "/",
    },
    {
      label: "eCommerce",
      icon: "ShoppingBagOpen",
      subOptions: [
        { label: "Item 1", path: "/dashboards/eCommerce/item1" },
        { label: "Item 2", path: "/dashboards/eCommerce/item2" },
      ],
    },
    {
      label: "Projects",
      icon: "FolderNotch",
      subOptions: [
        { label: "Item 1", path: "/dashboards/Projects/item1" },
        { label: "Item 2", path: "/dashboards/Projects/item2" },
      ],
    },
    {
      label: "Online Courses",
      icon: "BookOpen",
      subOptions: [
        { label: "Item 1", path: "/dashboards/OnlineCourses/item1" },
        { label: "Item 2", path: "/dashboards/OnlineCourses/item2" },
      ],
    },
  ],
  Pages: [
    {
      label: "User Profile",
      icon: "IdentificationBadge",
      subOptions: [
        { label: "Overview", path: "/dashboards/UserProfile/Overview" },
        { label: "Projects", path: "/dashboards/UserProfile/Projects" },
        { label: "Campaigns", path: "/dashboards/UserProfile/Campaigns" },
        { label: "Documents", path: "/dashboards/UserProfile/Documents" },
        { label: "Followers", path: "/dashboards/UserProfile/Followers" },
      ],
    },
    {
      label: "Account",
      icon: "IdentificationCard",
      subOptions: [
        { label: "Item 1", path: "/dashboards/Account/item1" },
        { label: "Item 2", path: "/dashboards/Account/item2" },
      ],
    },
    {
      label: "Blog",
      icon: "Notebook",
      subOptions: [
        { label: "Item 1", path: "/dashboards/Blog/item1" },
        { label: "Item 2", path: "/dashboards/Blog/item2" },
      ],
    },
    {
      label: "Social",
      icon: "ChatsTeardrop",
      subOptions: [
        { label: "Item 1", path: "/dashboards/Social/item1" },
        { label: "Item 2", path: "/dashboards/Social/item2" },
      ],
    },
  ],
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-light-black transition-colors duration-200 flex">
      <SidebarProvider defaultValue={true}>
        <Sidebar
          name="ByeWind"
          icon="/assets/ByeWind.png"
          options={SIDEBAR_OPTIONS}
        />
        <div className="flex flex-1 flex-col w-full">
          <Navbar />
          <main className="container text-gray-800 dark:text-gray-200">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;

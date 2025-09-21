import { useBreadcrumb } from "../hooks/use-breadcrumb";
import { useIsMobile } from "../hooks/use-is-mobile";
import Breadcrumbs, { type BreadcrumbItem } from "./breadcrumbs";

export const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMobile = useIsMobile();
  const breadcrumbs: BreadcrumbItem[] = useBreadcrumb().state;
  return (
    <div className="p-7 h-full">
      {isMobile && <Breadcrumbs items={breadcrumbs} />}
      {children}
    </div>
  );
};

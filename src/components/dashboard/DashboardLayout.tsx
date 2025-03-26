
import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar, { UserRole } from "./DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  role: UserRole;
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/20 flex w-full">
        <DashboardSidebar role={role} />
        <SidebarInset>
          <div className="p-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

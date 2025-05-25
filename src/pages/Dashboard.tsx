import { useEffect } from "react";
import { DashboardLayout } from "@/components/zentra/Dashboard/DashboardLayout";

const Dashboard = () => {
  // Add page title and meta info
  useEffect(() => {
    document.title = "Dashboard | Zentra";

    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Zentra AI dashboard - Manage your AI-powered solutions.",
    );
  }, []);

  return <DashboardLayout />;
};

export default Dashboard;


import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useMember } from "@/contexts/MemberContext";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { member } = useMember();
  const isAdmin = member?.role === "admin";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button asChild className="rounded-full shadow-lg">
            <Link to="/cms">
              <Edit className="h-5 w-5 mr-2" />
              Edit Content
            </Link>
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PageLayout;

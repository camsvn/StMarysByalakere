
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "../components/layout/PageLayout";
import ShapesBackground from "../components/ui/ShapesBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
        <ShapesBackground />
        <div className="text-center relative z-10 max-w-md mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</p>
          <p className="text-muted-foreground mb-8">
            We're sorry, the page you requested could not be found. Please check the URL or return to the homepage.
          </p>
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;

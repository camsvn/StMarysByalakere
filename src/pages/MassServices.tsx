
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";

const MassServices = () => {
  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading title="Mass & Services" />
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Mass Schedule</h2>
            <p className="mb-6">
              Regular schedule information for weekly masses and services.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Sacraments</h2>
            <p className="mb-6">
              Information about Baptism, First Communion, Confirmation, Marriage, and other sacraments.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Special Services</h2>
            <p>
              Details about Confession, Adoration, Anointing of the Sick, and other special services.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MassServices;

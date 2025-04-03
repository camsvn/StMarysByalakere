
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";

const Ministries = () => {
  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Ministries & Groups"
            subtitle="Discover how you can get involved and serve in our parish community."
          />
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Youth Ministry</h2>
            <p className="mb-6">
              Information about our youth ministry programs and activities.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Choir & Music</h2>
            <p className="mb-6">
              Details about our music ministry, choir rehearsals, and how to join.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Sunday School</h2>
            <p className="mb-6">
              Information about our religious education programs for children and youth.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Charity & Outreach</h2>
            <p>
              Learn about our charitable works and community outreach initiatives.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Ministries;


import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";

const About = () => {
  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading title="About Us" />
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Our History</h2>
            <p className="mb-6">
              St. Mary Malabar Catholic Church has a rich history serving our community since [founding year]. Our parish began with a small group of dedicated believers and has grown into a vibrant faith community.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Clergy & Leadership</h2>
            <p className="mb-6">
              Our parish is blessed with dedicated spiritual leaders who guide our community in faith and service. 
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Community & Faith</h2>
            <p>
              At St. Mary's, we are committed to fostering a welcoming community where all can grow in faith. Our diverse parish family celebrates our shared Catholic traditions while honoring our Malabar heritage.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;

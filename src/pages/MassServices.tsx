
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import { useCMS } from "@/contexts/CMSContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

const MassServices = () => {
  const { massSchedule } = useCMS();

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading title="Mass & Services" />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in mb-8">
              <h2 className="text-2xl font-bold mb-6">Weekly Mass Schedule</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {massSchedule.map((item, index) => (
                  <Card key={item.day} className={`card-hover animate-fade-in animate-delay-${index * 50}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{item.day}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <div className="space-y-1">
                            {item.times.map((time, idx) => (
                              <div key={idx} className="text-sm">{time}</div>
                            ))}
                          </div>
                        </div>
                        {item.location && (
                          <div className="flex items-start mt-2">
                            <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                            <div className="text-sm">{item.location}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in mb-8">
              <h2 className="text-2xl font-bold mb-4">Sacraments</h2>
              <p className="mb-6">
                Information about Baptism, First Communion, Confirmation, Marriage, and other sacraments.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">Special Services</h2>
              <p>
                Details about Confession, Adoration, Anointing of the Sick, and other special services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MassServices;

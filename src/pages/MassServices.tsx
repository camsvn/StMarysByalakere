
import PageLayout from "../components/layout/PageLayout";
import SectionHeading from "../components/ui/SectionHeading";
import ShapesBackground from "../components/ui/ShapesBackground";
import { useCMS } from "@/contexts/CMSContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, BookOpen, User, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

const MassServices = () => {
  const { massSchedule } = useCMS();
  const isMobile = useIsMobile();

  // Get current day of the week for highlighting
  const today = new Date().toLocaleString('en-us', {weekday: 'long'});

  return (
    <PageLayout>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <SectionHeading 
            title="Mass & Services" 
            subtitle="Join us in prayer and worship throughout the week."
          />
          
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="masses" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="masses" className="text-xs sm:text-sm px-2 sm:px-3">Masses</TabsTrigger>
                <TabsTrigger value="sacraments" className="text-xs sm:text-sm px-2 sm:px-3">Sacraments</TabsTrigger>
                <TabsTrigger value="special" className="text-xs sm:text-sm px-2 sm:px-3">Special Services</TabsTrigger>
              </TabsList>

              <TabsContent value="masses" className="space-y-8">
                <Card className="shadow-lg overflow-hidden border-t-4 border-t-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Clock className="h-6 w-6 text-primary mr-2" />
                      Weekly Mass Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {massSchedule.map((item, index) => (
                        <Card 
                          key={item.day} 
                          className={cn(
                            "card-hover", 
                            item.day === today && "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/10",
                            `animate-fade-in animate-delay-${index * 50}`
                          )}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className={cn("text-xl", item.day === today && "text-primary")}>
                              {item.day}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex items-start">
                                <Clock className={cn("h-5 w-5 mr-2 mt-0.5", item.day === today ? "text-primary" : "text-muted-foreground")} />
                                <div className="space-y-1">
                                  {item.times.map((time, idx) => (
                                    <div key={idx} className={cn("text-sm", item.day === today && "font-medium")}>{time}</div>
                                  ))}
                                </div>
                              </div>
                              {item.location && (
                                <div className="flex items-start mt-2">
                                  <MapPin className={cn("h-5 w-5 mr-2 mt-0.5", item.day === today ? "text-primary" : "text-muted-foreground")} />
                                  <div className="text-sm">{item.location}</div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sacraments">
                <Card className="shadow-lg overflow-hidden border-t-4 border-t-secondary">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <BookOpen className="h-6 w-6 text-secondary mr-2" />
                      Sacraments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Baptism", description: "Sundays after 10:30 AM Mass or by appointment" },
                      { title: "First Communion", description: "Preparation classes every Saturday at 9:00 AM" },
                      { title: "Confirmation", description: "Classes held on Wednesday evenings at 7:00 PM" },
                      { title: "Marriage", description: "Contact the parish office at least six months in advance" }
                    ].map((sacrament, index) => (
                      <Collapsible key={index} className="animate-fade-in" defaultOpen>
                        <Card className="card-hover">
                          <CollapsibleTrigger className="w-full text-left">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{sacrament.title}</CardTitle>
                            </CardHeader>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <CardContent>
                              <p>{sacrament.description}</p>
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="special">
                <Card className="shadow-lg overflow-hidden border-t-4 border-t-accent">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Heart className="h-6 w-6 text-accent mr-2" />
                      Special Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "Confession", description: "Saturday 4:00-4:45 PM or by appointment" },
                      { title: "Adoration", description: "First Friday of each month, 9:00 AM - 7:00 PM" },
                      { title: "Anointing of the Sick", description: "After weekday Masses or by appointment" },
                      { title: "Funeral Services", description: "Contact the parish office for arrangements" }
                    ].map((service, index) => (
                      <Collapsible key={index} className="animate-fade-in" defaultOpen>
                        <Card className="card-hover">
                          <CollapsibleTrigger className="w-full text-left">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{service.title}</CardTitle>
                            </CardHeader>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <CardContent>
                              <p>{service.description}</p>
                            </CardContent>
                          </CollapsibleContent>
                        </Card>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default MassServices;

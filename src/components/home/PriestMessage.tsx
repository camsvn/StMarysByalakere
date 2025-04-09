
import { MessageCircle } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import FluidDivider from "../ui/FluidDivider";

const PriestMessage = () => {
  return (
    <section className="relative py-12 md:py-20">
      <FluidDivider color="text-muted" className="-mt-12 md:-mt-20" />
      
      <div className="section-container">
        <SectionHeading 
          title="A Message From Our Pastor" 
          subtitle="Fr. Johnson Nellissery, ISP welcomes you to our parish community"
        />

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">FJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">Fr. Johnson Nellissery, ISP</h3>
              <p className="text-muted-foreground">Pastor</p>
            </div>
          </div>

          <div className="relative">
            <MessageCircle className="absolute -left-3 -top-3 h-8 w-8 text-primary/20" />
            <div className="space-y-4">
              <p className="text-lg font-medium">Welcome to St. Mary's!</p>
              <p>
                Thank you for your interest in our parish. Whether you're visiting for a short time, searching for a new parish to call home, returning to the practice of your Catholic faith, or simply curious about the Catholic Church—we're truly glad you're here.
              </p>
              <p>
                We believe that God has blessed each of us with unique gifts, meant to be used in service of His Kingdom here on earth. At St. Mary's, there are many ways to share those gifts and become an active part of our faith community.
              </p>
              <p>
                We invite you to explore our website and learn more about the life of our parish. We hope you'll discover where God may be calling you to get involved.
              </p>
              <p>
                We're so happy you've found us, and we look forward to welcoming you in person and getting to know you better.
              </p>
              <p className="font-medium">
                In Christ,
                <br />
                Fr. Johnson Nellissery, ISP
                <br />
                Pastor
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <FluidDivider color="text-accent" className="transform rotate-180" />
    </section>
  );
};

export default PriestMessage;

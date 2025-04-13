
import { MessageCircle } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const PriestMessage = () => {
  return (
    <section className="section-container bg-gradient-to-br from-accent/10 via-white to-primary/5 relative overflow-hidden">
      <SectionHeading 
        title="A Message From Our Vicar" 
        subtitle="Fr. Vijoy Kallingal, ISch welcomes you to our parish community"
      />

      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6">
            {/* Priest photo section */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 flex flex-col items-center justify-center text-center">
              <Avatar className="h-24 w-24 border-2 border-primary mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">VK</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">Fr. Vijoy Kallingal, ISch</h3>
              <p className="text-muted-foreground">Parish Priest</p>
              <div className="mt-4 pt-4 border-t border-primary/20 w-full text-center">
                <p className="italic text-sm">"Faith is taking the first step even when you can't see the whole staircase."</p>
              </div>
            </div>
            
            {/* Message content */}
            <div className="col-span-2 p-6 md:p-8">
              <CardContent className="p-0 relative">
                <MessageCircle className="absolute -left-3 -top-3 h-8 w-8 text-primary/20" />
                <div className="space-y-4 pl-2">
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
                  <div className="font-medium border-l-4 border-primary/30 pl-4 italic">
                    In Christ,
                    <br />
                    Fr. Vijoy Kallingal, ISch
                    <br />
                    Parish Priest
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
    </section>
  );
};

export default PriestMessage;

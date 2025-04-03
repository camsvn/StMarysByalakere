
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type DonationAmount = 10 | 25 | 50 | 100 | "custom";

const Donate = () => {
  const { t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<DonationAmount>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle donation submission
  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate the final amount
    const amount = selectedAmount === "custom" 
      ? parseFloat(customAmount) 
      : selectedAmount;
    
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      // In a real app, this would make an API call to a payment processor
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Thank you for your donation!",
        description: `Your donation of $${amount.toFixed(2)} has been processed successfully.`
      });
      
      // Reset form
      setSelectedAmount(25);
      setCustomAmount("");
    } catch (error) {
      toast({
        title: "Donation failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionHeading
          title={t("donateTitle")}
          subtitle={t("donateSubtitle")}
        />
        
        <div className="max-w-2xl mx-auto mt-8">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleDonate} className="space-y-6">
                <div>
                  <Label className="text-lg font-medium mb-4 block">Choose a donation amount</Label>
                  <RadioGroup
                    value={selectedAmount.toString()}
                    onValueChange={(value) => {
                      setSelectedAmount(value === "custom" ? "custom" : parseInt(value) as DonationAmount);
                    }}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                  >
                    {[10, 25, 50, 100].map((amount) => (
                      <div key={amount}>
                        <RadioGroupItem
                          value={amount.toString()}
                          id={`amount-${amount}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`amount-${amount}`}
                          className={cn(
                            "flex h-14 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-center text-base font-medium ring-offset-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary",
                            selectedAmount === amount && "border-primary bg-primary/10 text-primary"
                          )}
                        >
                          ${amount}
                        </Label>
                      </div>
                    ))}
                    
                    <div className="col-span-2 sm:col-span-4">
                      <RadioGroupItem
                        value="custom"
                        id="amount-custom"
                        className="peer sr-only"
                      />
                      <div className="grid grid-cols-6 gap-2">
                        <Label
                          htmlFor="amount-custom"
                          className={cn(
                            "col-span-2 flex h-14 cursor-pointer items-center justify-center rounded-l-md border border-input bg-background text-center text-sm font-medium ring-offset-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary",
                            selectedAmount === "custom" && "border-primary bg-primary/10 text-primary"
                          )}
                        >
                          {t("customAmount")}
                        </Label>
                        <div className="relative col-span-4">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount("custom");
                            }}
                            placeholder="0.00"
                            className="pl-6 h-14 rounded-l-none"
                            min="1"
                            step="0.01"
                          />
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="border-t pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : t("donateButton")}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    All donations are tax-deductible. You will receive a receipt by email.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-12 space-y-6">
            <h3 className="text-xl font-semibold">Other Ways to Give</h3>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">By Check</h4>
                <p className="text-muted-foreground mt-1">
                  Make checks payable to "St. Mary's Malabar Catholic Church" and mail to:<br />
                  123 Church Street, Your City, State 12345
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium">Planned Giving</h4>
                <p className="text-muted-foreground mt-1">
                  Consider including St. Mary's in your will or estate planning.
                  Contact us to learn more about legacy giving options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Donate;

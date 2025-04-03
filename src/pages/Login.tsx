
import { useState } from "react";
import { useMember } from "@/contexts/MemberContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";

const Login = () => {
  const { t } = useLanguage();
  const { login, register, isAuthenticated } = useMember();
  const navigate = useNavigate();
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate("/member-portal");
    return null;
  }

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    
    if (success) {
      navigate("/member-portal");
    }
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    
    setIsLoading(true);
    const success = await register(email, password, name);
    setIsLoading(false);
    
    if (success) {
      setActiveTab("login");
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionHeading
          title="Member Portal"
          subtitle="Login or register to access member features"
        />
        
        <div className="flex justify-center mt-8">
          <Card className="w-full max-w-md">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t("login")}</TabsTrigger>
                <TabsTrigger value="register">{t("register")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle>{t("login")}</CardTitle>
                    <CardDescription>
                      Enter your credentials to access the member portal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">{t("password")}</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Processing..." : t("login")}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <CardHeader>
                    <CardTitle>{t("register")}</CardTitle>
                    <CardDescription>
                      Create a new account to join our community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Name</Label>
                      <Input
                        id="register-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">{t("email")}</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">{t("password")}</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Processing..." : t("register")}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;

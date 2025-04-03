
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMember } from "@/contexts/MemberContext";
import { useLanguage } from "@/contexts/LanguageContext";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock upcoming events
const upcomingEvents = [
  { id: 1, title: "Parish Council Meeting", date: "2025-04-10", time: "7:00 PM" },
  { id: 2, title: "Youth Group Gathering", date: "2025-04-15", time: "6:30 PM" },
  { id: 3, title: "Bible Study", date: "2025-04-17", time: "8:00 PM" },
];

// Mock announcements
const announcements = [
  { 
    id: 1, 
    title: "Holy Week Schedule", 
    content: "Please note the special Mass schedule for Holy Week...",
    date: "2025-04-01" 
  },
  { 
    id: 2, 
    title: "First Communion Classes", 
    content: "Registration for First Communion classes is now open...",
    date: "2025-03-28" 
  },
];

const MemberPortal = () => {
  const { member, isAuthenticated, logout } = useMember();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!member) return null;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <SectionHeading
            title={`Welcome, ${member.name}`}
            subtitle="Access exclusive member resources and information"
            centered={false}
          />
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
        
        <Tabs defaultValue="dashboard">
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {upcomingEvents.map(event => (
                      <li key={event.id} className="border-b pb-3">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Latest Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {announcements.map(announcement => (
                      <li key={announcement.id} className="border-b pb-3">
                        <p className="font-medium">{announcement.title}</p>
                        <p className="text-sm">{announcement.content.substring(0, 80)}...</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Posted on {new Date(announcement.date).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>My Registered Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">You haven't registered for any upcoming events yet.</p>
                <Button onClick={() => navigate("/events")}>Browse Events</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Parish Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {announcements.map(announcement => (
                    <li key={announcement.id} className="border-b pb-4">
                      <h3 className="font-medium text-lg">{announcement.title}</h3>
                      <p className="my-2">{announcement.content}</p>
                      <p className="text-xs text-muted-foreground">
                        Posted on {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p>{member.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p>{member.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Member Role</p>
                    <p className="capitalize">{member.role}</p>
                  </div>
                  <Button variant="outline" className="mt-4">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default MemberPortal;

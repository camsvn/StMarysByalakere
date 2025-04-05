
import { useState } from "react";
import { useCMS, MassScheduleType } from "@/contexts/CMSContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash, Plus, Edit, Clock, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CMSMassSchedule = () => {
  const { massSchedule, addMassSchedule, updateMassSchedule, removeMassSchedule } = useCMS();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<MassScheduleType | null>(null);
  const [formData, setFormData] = useState<Omit<MassScheduleType, "id">>({
    day: "",
    times: [""],
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData((prev) => ({ ...prev, times: newTimes }));
  };

  const addTimeSlot = () => {
    setFormData((prev) => ({ ...prev, times: [...prev.times, ""] }));
  };

  const removeTimeSlot = (index: number) => {
    if (formData.times.length > 1) {
      const newTimes = [...formData.times];
      newTimes.splice(index, 1);
      setFormData((prev) => ({ ...prev, times: newTimes }));
    }
  };

  const openNewScheduleForm = () => {
    setCurrentSchedule(null);
    setFormData({
      day: "",
      times: [""],
      location: "",
    });
    setIsOpen(true);
  };

  const openEditScheduleForm = (schedule: MassScheduleType) => {
    setCurrentSchedule(schedule);
    setFormData({
      day: schedule.day,
      times: [...schedule.times],
      location: schedule.location || "",
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.day.trim() || formData.times.some(t => !t.trim()) || !formData.location?.trim()) {
      return; // Don't save incomplete data
    }

    setIsSubmitting(true);
    
    try {
      if (currentSchedule) {
        // Update existing schedule
        await updateMassSchedule(currentSchedule.id, formData);
      } else {
        // Add new schedule
        await addMassSchedule(formData);
      }
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    await removeMassSchedule(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mass Schedule</h2>
        <Button onClick={openNewScheduleForm}>
          <Plus className="h-4 w-4 mr-2" /> Add New Day
        </Button>
      </div>

      {massSchedule.length === 0 ? (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No mass schedules found. Create your first schedule!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {massSchedule.map((schedule) => (
            <Card key={schedule.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{schedule.day}</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEditScheduleForm(schedule)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(schedule.id)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div className="space-y-1">
                      {schedule.times.map((time, index) => (
                        <div key={index} className="text-sm">{time}</div>
                      ))}
                    </div>
                  </div>
                  {schedule.location && (
                    <p className="text-sm text-muted-foreground mt-2">Location: {schedule.location}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentSchedule ? "Edit Mass Schedule" : "Add New Mass Schedule"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Input
                id="day"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                placeholder="e.g., Sunday"
              />
            </div>
            <div className="space-y-2">
              <Label>Mass Times</Label>
              {formData.times.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    placeholder="e.g., 9:00 AM"
                  />
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeTimeSlot(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addTimeSlot}>
                <Plus className="h-4 w-4 mr-2" /> Add Time
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Main Church"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSMassSchedule;

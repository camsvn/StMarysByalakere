import { DateTime } from 'luxon';
import { stringify } from "qs-esm";
import MarqueeClient from '@/components/home/MarqueeClient';
import config from '@payload-config'
import { getPayload } from 'payload'

async function getEvents() {
  const payload = await getPayload({
        config
      });
  const istToday = DateTime.now().setZone("Asia/Kolkata").set({ 
    hour: 0, minute: 0, second: 0, millisecond: 0 
  });
  
  const displayedEvents = await payload.find({
    collection: 'events',
    sort: "date",
    limit: 10,
    where: {
      date: {
        greater_than_equal: istToday.toUTC().toISO()
      }
    }
  });
  
  return displayedEvents.docs;
}

export default async function EventsMarquee() {
  const events = await getEvents();
  
  if (events.length === 0) return null;
  
  return <MarqueeClient events={events} />;
}
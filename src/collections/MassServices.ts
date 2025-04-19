
import type { CollectionConfig } from 'payload'

export const MassServices: CollectionConfig = {
  slug: 'mass-services',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'day',
      type: 'select',
      options: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      required: true,
    },
    {
      name: 'language',
      type: 'text',
    },
  ],
}

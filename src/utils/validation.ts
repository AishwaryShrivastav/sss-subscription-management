import { z } from 'zod';

export const subscriberSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  subscriber_id: z.string().optional().nullable(),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
  email: z.string().email('Invalid email address').optional().nullable().or(z.literal('')),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(6, 'Pincode must be at least 6 digits'),
  number_of_copies: z.number().int().min(1, 'Number of copies must be at least 1').default(1),
  subscription_start_date: z.string().min(1, 'Subscription start date is required'),
  subscription_end_date: z.string().min(1, 'Subscription end date is required'),
  status: z.enum(['active', 'expired', 'inactive']).default('active'),
  bulk: z.boolean().default(false),
  samiti: z.string().optional().nullable(),
  delivery_method: z.enum(['registered', 'unregistered']),
  payment_method: z.string().optional().nullable(),
}).refine((data) => {
  if (data.subscription_start_date && data.subscription_end_date) {
    return new Date(data.subscription_end_date) >= new Date(data.subscription_start_date);
  }
  return true;
}, {
  message: 'Subscription end date must be after start date',
  path: ['subscription_end_date'],
});

export type SubscriberFormData = z.infer<typeof subscriberSchema>;


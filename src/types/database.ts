export type SubscriberStatus = 'active' | 'expired' | 'inactive';
export type DeliveryMethod = 'registered' | 'unregistered';

export interface Subscriber {
  id: string;
  first_name: string;
  last_name: string;
  subscriber_id?: string | null;
  mobile: string;
  email?: string | null;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  number_of_copies: number;
  subscription_start_date: string;
  subscription_end_date: string;
  status: SubscriberStatus;
  bulk: boolean;
  samiti?: string | null;
  delivery_method: DeliveryMethod;
  payment_method?: string | null;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
}

export interface SubscriptionHistory {
  id: string;
  subscriber_id: string;
  renewal_date: string;
  previous_end_date: string;
  new_end_date: string;
  amount_paid?: number | null;
  payment_method?: string | null;
  created_at: string;
}

export interface SubscriberInsert {
  first_name: string;
  last_name: string;
  subscriber_id?: string | null;
  mobile: string;
  email?: string | null;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  number_of_copies?: number;
  subscription_start_date: string;
  subscription_end_date: string;
  status?: SubscriberStatus;
  bulk?: boolean;
  samiti?: string | null;
  delivery_method: DeliveryMethod;
  payment_method?: string | null;
  created_by?: string | null;
}

export interface SubscriberUpdate {
  first_name?: string;
  last_name?: string;
  subscriber_id?: string | null;
  mobile?: string;
  email?: string | null;
  address?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  number_of_copies?: number;
  subscription_start_date?: string;
  subscription_end_date?: string;
  status?: SubscriberStatus;
  bulk?: boolean;
  samiti?: string | null;
  delivery_method?: DeliveryMethod;
  payment_method?: string | null;
}

export interface SubscriptionHistoryInsert {
  subscriber_id: string;
  renewal_date: string;
  previous_end_date: string;
  new_end_date: string;
  amount_paid?: number | null;
  payment_method?: string | null;
}


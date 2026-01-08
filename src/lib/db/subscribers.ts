import { createClient } from '@/lib/supabase/server'
import type { Subscriber, SubscriberInsert, SubscriberUpdate, SubscriptionHistory } from '@/types/database'

export async function getSubscribers(filters?: {
  first_name?: string
  last_name?: string
  subscriber_id?: string
  mobile?: string
  status?: string
  page?: number
  limit?: number
}) {
  const supabase = await createClient()
  const page = filters?.page || 1
  const limit = filters?.limit || 10
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from('subscribers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (filters?.first_name) {
    query = query.ilike('first_name', `%${filters.first_name}%`)
  }
  if (filters?.last_name) {
    query = query.ilike('last_name', `%${filters.last_name}%`)
  }
  if (filters?.subscriber_id) {
    query = query.eq('subscriber_id', filters.subscriber_id)
  }
  if (filters?.mobile) {
    query = query.ilike('mobile', `%${filters.mobile}%`)
  }
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  const { data, error, count } = await query

  if (error) {
    throw error
  }

  return {
    data: data as Subscriber[],
    count: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  }
}

export async function getSubscriberById(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw error
  }

  return data as Subscriber
}

export async function createSubscriber(subscriber: SubscriberInsert) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('subscribers')
    .insert({
      ...subscriber,
      created_by: user?.id || null,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Subscriber
}

export async function updateSubscriber(id: string, updates: SubscriberUpdate) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscribers')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Subscriber
}

export async function deleteSubscriber(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('subscribers').delete().eq('id', id)

  if (error) {
    throw error
  }

  return { success: true }
}

export async function getActiveSubscribersForLabels() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('status', 'active')
    .gte('subscription_end_date', today)
    .order('city', { ascending: true })
    .order('state', { ascending: true })

  if (error) {
    throw error
  }

  return data as Subscriber[]
}

export async function getSubscriptionHistory(subscriberId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscription_history')
    .select('*')
    .eq('subscriber_id', subscriberId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data as SubscriptionHistory[]
}

export async function createSubscriptionHistory(history: {
  subscriber_id: string
  renewal_date: string
  previous_end_date: string
  new_end_date: string
  amount_paid?: number | null
  payment_method?: string | null
}) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscription_history')
    .insert(history)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as SubscriptionHistory
}


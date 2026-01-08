import { notFound } from 'next/navigation'
import { SubscriberDetail } from '@/components/subscribers/SubscriberDetail'
import { getSubscriberById, getSubscriptionHistory } from '@/lib/db/subscribers'

export default async function SubscriberDetailPage({
  params,
}: {
  params: { id: string }
}) {
  try {
    const [subscriber, subscriptionHistory] = await Promise.all([
      getSubscriberById(params.id),
      getSubscriptionHistory(params.id),
    ])

    return (
      <div className="p-8">
        <SubscriberDetail subscriber={subscriber} subscriptionHistory={subscriptionHistory} />
      </div>
    )
  } catch (error) {
    notFound()
  }
}


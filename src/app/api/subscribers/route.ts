import { NextRequest, NextResponse } from 'next/server'
import {
  getSubscribers,
  createSubscriber,
} from '@/lib/db/subscribers'
import type { SubscriberInsert } from '@/types/database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filters = {
      first_name: searchParams.get('first_name') || undefined,
      last_name: searchParams.get('last_name') || undefined,
      subscriber_id: searchParams.get('subscriber_id') || undefined,
      mobile: searchParams.get('mobile') || undefined,
      status: searchParams.get('status') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
    }

    const result = await getSubscribers(filters)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const subscriber = await createSubscriber(body as SubscriberInsert)
    return NextResponse.json(subscriber, { status: 201 })
  } catch (error: any) {
    console.error('Error creating subscriber:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create subscriber' },
      { status: 500 }
    )
  }
}


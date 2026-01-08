import { NextRequest, NextResponse } from 'next/server'
import {
  getSubscriberById,
  updateSubscriber,
  deleteSubscriber,
} from '@/lib/db/subscribers'
import type { SubscriberUpdate } from '@/types/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscriber = await getSubscriberById(params.id)
    return NextResponse.json(subscriber)
  } catch (error: any) {
    console.error('Error fetching subscriber:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscriber' },
      { status: 404 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const subscriber = await updateSubscriber(params.id, body as SubscriberUpdate)
    return NextResponse.json(subscriber)
  } catch (error: any) {
    console.error('Error updating subscriber:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update subscriber' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteSubscriber(params.id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting subscriber:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete subscriber' },
      { status: 500 }
    )
  }
}


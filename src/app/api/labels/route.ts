import { NextResponse } from 'next/server'
import { getActiveSubscribersForLabels } from '@/lib/db/subscribers'
import { generateAvery3424PDF } from '@/lib/pdf/avery3424'

export async function GET() {
  try {
    const subscribers = await getActiveSubscribersForLabels()
    
    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found' },
        { status: 404 }
      )
    }

    // Generate PDF buffer
    const buffer = await generateAvery3424PDF(subscribers)

    // Return PDF as response
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="monthly-labels-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error('Error generating labels PDF:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate labels PDF' },
      { status: 500 }
    )
  }
}


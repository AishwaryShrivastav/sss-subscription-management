'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function PrintLabelsPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateLabels = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/labels')
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate labels')
      }

      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `monthly-labels-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err: any) {
      setError(err.message || 'Failed to generate labels')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Print Monthly Labels</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Generate Avery 3424 Labels
          </h2>
          <p className="text-sm text-gray-600">
            This will generate a PDF file with mailing labels for all active subscribers.
            The labels are formatted for Avery 3424 label sheets (3 columns × 7 rows).
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Button onClick={handleGenerateLabels} disabled={loading}>
            {loading ? 'Generating PDF...' : 'Generate Labels PDF'}
          </Button>
          {loading && (
            <span className="text-sm text-gray-600">
              Please wait while we generate your labels...
            </span>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Printing Instructions:</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>Download the PDF file</li>
            <li>Open the PDF in your PDF viewer</li>
            <li>Set print settings to 100% scale (do not fit to page)</li>
            <li>Use Avery 3424 label sheets</li>
            <li>Print and verify alignment on a test sheet first</li>
          </ol>
        </div>
      </div>
    </div>
  )
}


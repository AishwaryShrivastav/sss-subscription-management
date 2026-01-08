import React from 'react'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import type { Subscriber } from '@/types/database'

// Avery 3424 specifications:
// - Sheet size: 8.5" × 11" (US Letter)
// - Labels per sheet: 21 labels (3 columns × 7 rows)
// - Label size: 1" × 2-5/8" (1" × 2.625")
// - Top margin: 0.5"
// - Left margin: 0.1875" (3/16")
// - Horizontal gap: 0.125" (1/8")
// - Vertical gap: 0" (labels are continuous)

const LABEL_WIDTH = 72 // 1 inch in points
const LABEL_HEIGHT = 189 // 2.625 inches in points
const TOP_MARGIN = 36 // 0.5 inches
const LEFT_MARGIN = 13.5 // 0.1875 inches
const HORIZONTAL_GAP = 9 // 0.125 inches
const COLUMNS = 3
const ROWS = 7
const LABELS_PER_PAGE = COLUMNS * ROWS

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    paddingTop: TOP_MARGIN,
    paddingLeft: LEFT_MARGIN,
  },
  label: {
    width: LABEL_WIDTH,
    height: LABEL_HEIGHT,
    padding: 4,
    marginRight: HORIZONTAL_GAP,
    marginBottom: 0,
    fontSize: 9,
    fontFamily: 'Helvetica',
  },
  labelContent: {
    flexDirection: 'column',
    height: '100%',
  },
  name: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  address: {
    fontSize: 9,
    lineHeight: 1.3,
    marginBottom: 1,
  },
  cityState: {
    fontSize: 9,
    lineHeight: 1.3,
  },
  pincode: {
    fontSize: 9,
    marginTop: 2,
  },
})

interface LabelProps {
  subscriber: Subscriber
}

const Label = ({ subscriber }: LabelProps) => {
  const fullName = `${subscriber.first_name} ${subscriber.last_name}`.trim()
  const addressLines = subscriber.address.split('\n').filter((line) => line.trim())
  const cityStateDistrict = `${subscriber.city}, ${subscriber.district}, ${subscriber.state}`.trim()

  return (
    <View style={styles.label}>
      <View style={styles.labelContent}>
        <Text style={styles.name}>{fullName}</Text>
        {addressLines.map((line, index) => (
          <Text key={index} style={styles.address}>
            {line.trim()}
          </Text>
        ))}
        <Text style={styles.cityState}>{cityStateDistrict}</Text>
        <Text style={styles.pincode}>{subscriber.pincode}</Text>
      </View>
    </View>
  )
}

interface LabelsDocumentProps {
  subscribers: Subscriber[]
}

const LabelsDocument = ({ subscribers }: LabelsDocumentProps) => {
  // Group subscribers into pages
  const pages: Subscriber[][] = []
  for (let i = 0; i < subscribers.length; i += LABELS_PER_PAGE) {
    pages.push(subscribers.slice(i, i + LABELS_PER_PAGE))
  }

  return (
    <Document>
      {pages.map((pageSubscribers, pageIndex) => (
        <Page key={pageIndex} size="LETTER" style={styles.page}>
          {pageSubscribers.map((subscriber, index) => (
            <Label key={subscriber.id || index} subscriber={subscriber} />
          ))}
          {/* Fill remaining slots with empty labels if needed */}
          {Array.from({ length: LABELS_PER_PAGE - pageSubscribers.length }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.label} />
          ))}
        </Page>
      ))}
    </Document>
  )
}

export async function generateAvery3424PDF(subscribers: Subscriber[]): Promise<Buffer> {
  const doc = React.createElement(LabelsDocument, { subscribers })
  const pdfDoc = pdf(doc)
  const blob = await pdfDoc.toBlob()
  const arrayBuffer = await blob.arrayBuffer()
  return Buffer.from(arrayBuffer)
}


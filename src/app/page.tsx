import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/images/sai-baba.jpg"
              alt="Bhagwan Sri Sathya Sai Baba"
              className="mx-auto rounded-lg shadow-lg max-w-md w-full h-auto"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sanathana Sarathi Hindi
          </h1>
          <div className="text-lg md:text-xl text-gray-700 space-y-4 max-w-2xl mx-auto">
            <p>
              Welcome to Sanathana Sarathi Hindi, a divine publication dedicated to spreading
              the teachings and message of Bhagwan Sri Sathya Sai Baba.
            </p>
            <p>
              This monthly magazine serves as a spiritual guide, bringing wisdom, love, and
              service to readers across India and beyond.
            </p>
            <p>
              Published from Indore, Madhya Pradesh, Sanathana Sarathi Hindi continues the
              legacy of service and devotion, inspiring countless souls on their spiritual journey.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
        <Link href="/login" className="text-gray-400 hover:text-gray-600">
          Admin Login
        </Link>
      </footer>
    </div>
  )
}


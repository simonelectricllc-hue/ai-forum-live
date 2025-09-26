import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Forum',
  description: 'Minimal, crawlable forum MVP',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold">AI Forum</a>
            <nav className="text-sm space-x-4">
              <a className="hover:underline" href="/submit">Create post</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 py-10 text-xs text-gray-500">
          <p>Public & crawlable. Be kind. © {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  )
}

import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              JobPulse
            </span>
          </Link>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} JobPulse. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-500">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-500">
            Privacy
          </Link>
          <Link href="/about" className="text-sm text-gray-500 hover:text-primary-500">
            About
          </Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-primary-500">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
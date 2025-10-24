'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-20 px-4">
      {/* Header */}
      <div className="max-w-5xl w-full mb-10 text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Contact Us
        </h1>
        <p className="text-gray-500 text-sm">
          Questions, feedback, or wholesale inquiries — we’d love to hear from you.
          Fill out the form and we’ll get back within 1–2 business days.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 max-w-5xl w-full items-start">
        {/* Left: Contact Form */}
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Send a message
          </h2>

          {/* External Contact Form component */}
          <ContactForm />
        </div>

        {/* Right: Visit or Call */}
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8 self-start">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Visit or call
          </h2>

          <div className="space-y-6 text-sm text-gray-700">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Warehouse & Office</h3>
                <p>12th Lane, Mumbai, India</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p>hello@milletglow.example</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p>+91 94505 43210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

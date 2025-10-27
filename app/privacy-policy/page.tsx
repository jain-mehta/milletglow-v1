import { Metadata } from 'next'
import { Shield, Mail, Phone, Calendar, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - MilletGlow',
  description: 'Read our privacy policy to understand how MilletGlow protects and handles your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 to-white">
      {/* Header Section */}
      <div className="bg-primary-900 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-primary-100 max-w-2xl">
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="flex items-center gap-2 mt-4 text-primary-200">
            <Calendar className="w-4 h-4" />
            <span>Last Updated: October 27, 2025</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">

          {/* Privacy Policy Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-primary-900">Privacy Policy</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p>
                  Millet Glow ("we", "our", or "us") protects your personal information. This Privacy Policy
                  explains how we collect and use your data when you shop with us or access our services.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Information We Collect</h3>
                  <ul className="space-y-2">
                    <li>• Name, phone number, email, delivery address</li>
                    <li>• Payment data via secure gateways</li>
                    <li>• Device info, browser type, IP, cookies</li>
                    <li>• Chat or email communication</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">How We Use Personal Data</h3>
                  <ul className="space-y-2">
                    <li>• To process orders</li>
                    <li>• To support and communicate with customers</li>
                    <li>• To improve services and product offerings</li>
                    <li>• To share updates or offers only with consent</li>
                  </ul>
                  <p className="mt-4 font-semibold text-primary-700">We never sell personal data.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Data Sharing</h3>
                  <p className="mb-3">Shared only with:</p>
                  <ul className="space-y-2">
                    <li>• Delivery partners</li>
                    <li>• Payment gateways</li>
                    <li>• Legal authorities if required</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Data Security</h3>
                  <p>We use standard protection measures but no system is completely risk-free.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Cookies</h3>
                  <p>Used for performance and experience enhancements. Can be disabled in browser.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Your Rights</h3>
                  <ul className="space-y-2">
                    <li>• Access your data</li>
                    <li>• Request corrections</li>
                    <li>• Request deletion where legally permitted</li>
                    <li>• Opt out of marketing communications</li>
                  </ul>
                  <p className="mt-4 text-primary-700">Data of children below 13 is not knowingly collected.</p>
                </div>

                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Contact for Privacy Requests</h3>
                  <div className="flex items-center gap-2 text-primary-700">
                    <Mail className="w-4 h-4" />
                    <span>Email: webinfo@milletglow.com</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Terms & Conditions Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-primary-900">Terms & Conditions</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="font-medium">
                  Using our website or placing an order means you accept these terms.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Website Use</h3>
                  <p>Use the site lawfully and without causing harm.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Product Information</h3>
                  <p>We aim for accuracy but variations may occur.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Orders and Payments</h3>
                  <ul className="space-y-2">
                    <li>• Orders accepted on availability</li>
                    <li>• Payments through secure channels only</li>
                    <li>• Cancellation/modification rights reserved</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Pricing</h3>
                  <p>Prices in INR and may change without notice.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Health Advisory</h3>
                  <p>Consult a doctor if you have dietary or medical concerns.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Intellectual Property</h3>
                  <p>All content belongs to Millet Glow.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Jurisdiction</h3>
                  <p>Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping & Delivery Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-primary-900">Shipping & Delivery Policy</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Delivery Coverage</h3>
                  <p>Across India through trusted couriers.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Delivery Timeline</h3>
                  <p>3 to 7 business days depending on location.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Shipping Charges</h3>
                  <p>Shown during checkout or before order confirmation.</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Order Updates</h3>
                  <p>We share confirmation and delivery details where available.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Refund & Cancellation Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-primary-900">Refund & Cancellation Policy</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="font-medium text-orange-700">
                  Due to consumable nature, refunds are limited.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Refund Eligibility</h3>
                  <ul className="space-y-2">
                    <li>• Damaged or leaked bottles</li>
                    <li>• Wrong item delivered</li>
                    <li>• Quality issues with proof within 24 hours</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Not Eligible</h3>
                  <ul className="space-y-2">
                    <li>• Changed mind</li>
                    <li>• Incorrect address</li>
                    <li>• Delays due to courier</li>
                    <li>• Already opened or consumed products</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Cancellations</h3>
                  <p>Allowed only before dispatch.</p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-800 mb-4">Refund Support</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary-700">
                      <Mail className="w-4 h-4" />
                      <span>Email: webinfo@milletglow.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-700">
                      <Phone className="w-4 h-4" />
                      <span>WhatsApp: +91 91601 81982</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer Section */}
          <section className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-primary-900">Disclaimer</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p className="font-medium text-red-700">
                  Millet Glow drinks support health but do not replace medical treatment.
                </p>
                <p>
                  Consult a doctor for allergies, pregnancy, or medical concerns.
                </p>
                <p>
                  We are not liable for misuse or excessive consumption.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="bg-primary-900 text-white rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-6">Need Help?</h2>
              <p className="text-primary-100 mb-6">
                If you have any questions about our policies, please don't hesitate to contact us.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>webinfo@milletglow.com</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>+91 84488 07923</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
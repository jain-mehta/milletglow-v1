'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { trackWhatsAppClick } from '@/lib/gtag'

interface WhatsAppFloatProps {
  phoneNumber?: string
  message?: string
}

export default function WhatsAppFloat({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210',
  message = 'Hi! I need help with your millet products.'
}: WhatsAppFloatProps) {
  const handleWhatsAppClick = () => {
    // Track WhatsApp click in Google Analytics
    trackWhatsAppClick()

    const encodedMessage = encodeURIComponent(message)
    const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '')
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            onClick={handleWhatsAppClick}
            className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, type: 'spring' }}
            aria-label="Contact us on WhatsApp"
          >
            <FaWhatsapp className="w-8 h-8" />
          </motion.button>
        </TooltipTrigger>

        <TooltipContent
          side="left"
          className="bg-green-600 text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-lg"
        >
          I want to order Millet Glow
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  productName: string
}

export function ShareButtons({ productName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleWhatsAppShare = () => {
    const text = `Check out ${productName}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`, '_blank')
  }

  const handleEmailShare = () => {
    const subject = `Check out ${productName}`
    const body = `I thought you might be interested in this: ${shareUrl}`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWhatsAppShare}
          className="cursor-pointer h-9 px-3"
          title="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEmailShare}
          className="cursor-pointer h-9 px-3"
          title="Share via Email"
        >
          <Mail className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="cursor-pointer h-9 px-3"
          title={copied ? 'Link copied!' : 'Copy link'}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

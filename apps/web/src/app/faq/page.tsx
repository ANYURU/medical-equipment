import { client } from '@/lib/sanity'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQ } from '@/types/sanity'

async function getFAQs(): Promise<FAQ[]> {
  return client.fetch(
    `*[_type == "faq"] | order(order asc, _createdAt asc) {
      _id,
      question,
      answer,
      category,
      order
    }`
  )
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-muted-foreground">
            Find answers to common questions about our products and services
          </p>
        </div>

        {faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground">
            No FAQs available at the moment
          </p>
        )}
      </div>
    </div>
  )
}

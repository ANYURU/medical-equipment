import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            About Us
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your trusted partner in medical equipment supply
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              We are committed to providing high-quality medical equipment and supplies to healthcare facilities across Uganda. Our mission is to ensure that every healthcare provider has access to reliable, affordable, and cutting-edge medical technology.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Quality Assurance</h3>
              <p className="text-sm text-muted-foreground">
                All our products meet international quality standards and are sourced from reputable manufacturers.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Expert Support</h3>
              <p className="text-sm text-muted-foreground">
                Our team of experts provides technical support and training to ensure optimal equipment usage.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                We maintain local inventory to ensure quick delivery and minimize downtime for your facility.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 text-xl font-semibold">Competitive Pricing</h3>
              <p className="text-sm text-muted-foreground">
                We offer competitive pricing without compromising on quality or service excellence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

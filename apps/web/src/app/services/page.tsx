import Image from 'next/image';
import { client, urlFor } from '@/lib/sanity';
import type { Service } from '@/types/sanity';

async function getServices(): Promise<Service[]> {
  return client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      image
    }
  `);
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-linear-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive healthcare solutions tailored to your facility's needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="container px-4 py-12 md:px-6 md:py-16">
        {services.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service._id} className="group rounded-lg border bg-card p-6 transition-all hover:border-blue-600 hover:shadow-lg md:p-8">
                {service.image && (
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-blue-100">
                    <Image
                      src={urlFor(service.image).width(64).height(64).url()}
                      alt={service.image.alt || service.title}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-3 text-xl font-bold md:text-2xl">{service.title}</h3>
                {service.description && (
                  <p className="leading-relaxed text-muted-foreground">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No services available at the moment</p>
          </div>
        )}
      </div>
    </>
  );
}

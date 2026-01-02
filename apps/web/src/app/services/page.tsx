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
    <div className="container px-4 py-12 md:px-6 md:py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Our Services
        </h1>
        <p className="mt-2 text-gray-600">
          Comprehensive healthcare solutions tailored to your needs
        </p>
      </div>
      {services.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="rounded-lg border bg-white p-6">
              {service.image && (
                <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-blue-100">
                  <Image
                    src={urlFor(service.image).width(64).height(64).url()}
                    alt={service.image.alt || service.title}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              {service.description && (
                <p className="text-gray-600">{service.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No services available</p>
      )}
    </div>
  );
}

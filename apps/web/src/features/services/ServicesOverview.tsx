import Image from 'next/image';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanity';
import type { Service } from '@/types/sanity';

async function getServices(): Promise<Service[]> {
  return client.fetch(`
    *[_type == "service"] | order(order asc) [0...3] {
      _id,
      title,
      slug,
      description,
      image
    }
  `);
}

export async function ServicesOverview() {
  const services = await getServices();

  if (!services.length) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Services
          </h2>
          <p className="mt-2 text-gray-600">
            Comprehensive solutions for your healthcare facility
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="text-center">
              {service.image && (
                <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full bg-blue-100">
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
        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

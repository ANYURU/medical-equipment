import { Truck, Award, Clock, ShieldCheck } from 'lucide-react'

const guarantees = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in Kampala & reliable countrywide shipping.'
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Products',
    description: 'Authorized distributor for global brands with full warranty.'
  },
  {
    icon: Award,
    title: 'Expert Installation',
    description: 'Professional setup and user training by certified biomedical engineers.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock technical support and maintenance services.'
  }
]

export function ServiceGuarantees() {
  return (
    <section className="bg-white border-b border-border/50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x border-x border-border/50">
          {guarantees.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-6 lg:p-8 hover:bg-slate-50 transition-colors">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

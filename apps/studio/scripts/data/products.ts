export const productsData = [
  {
    _id: 'product-ak-98-dialysis-machine',
    _type: 'product',
    name: 'AK 98 Dialysis Machine',
    slug: {current: 'ak-98-dialysis-machine'},
    description: 'Designed to be an optimal platform for chronic dialysis, skilled nursing and hospital care environments.',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Its unique features and innovative design help simplify treatment with fewer steps, protect patient safety by helping to potentially reduce programming errors, and minimize disruptions and downtime.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-baxter'},
    categories: [{_type: 'reference', _ref: 'category-dialysis-solutions'}],
    featured: true,
  },
  {
    _id: 'product-prismaflex-system',
    _type: 'product',
    name: 'Prismaflex System',
    slug: {current: 'prismaflex-system'},
    description: 'The innovative Prismaflex System is designed to support the recovery of critically ill patients with acute kidney injury (AKI).',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'The flexible system delivers multiple therapies with a versatile platform that can be customized to specific patient needs.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-baxter'},
    categories: [{_type: 'reference', _ref: 'category-icu-or-equipment'}],
    featured: false,
  },
  {
    _id: 'product-artis-physio',
    _type: 'product',
    name: 'Artis Physio',
    slug: {current: 'artis-physio'},
    description: 'Because Every Patient is Different. The Artis Physio system gives you the ability to adapt therapies to your patients\' needs.',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Take advantage of monitoring functions designed to consistently deliver treatment to clinical targets.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-baxter'},
    categories: [{_type: 'reference', _ref: 'category-dialysis-solutions'}],
    featured: false,
  },
  {
    _id: 'product-artis-physio-plus',
    _type: 'product',
    name: 'Artis Physio Plus',
    slug: {current: 'artis-physio-plus'},
    description: 'New Possibilities, Simple Delivery. The Artis Physio Plus multi-therapy system offers a unique combination of efficient HD, effective HDF and innovative HDx therapies.',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Providing you total control over the delivery of personalized hemodialysis treatments.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-baxter'},
    categories: [{_type: 'reference', _ref: 'category-dialysis-solutions'}],
    featured: false,
  },
  {
    _id: 'product-icu-bed',
    _type: 'product',
    name: 'ICU Bed',
    slug: {current: 'icu-bed'},
    description: 'Advanced bed for intensive care designed for patient comfort and safety.',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Ergonomic design with advanced positioning capabilities for optimal patient care.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-linet'},
    categories: [{_type: 'reference', _ref: 'category-medical-furniture'}],
    featured: true,
  },
  {
    _id: 'product-ultrasound-machine',
    _type: 'product',
    name: 'Ultrasound Machine',
    slug: {current: 'ultrasound-machine'},
    description: 'High-resolution imaging device portable and user-friendly for diagnostics.',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Advanced imaging technology for accurate diagnostics in various medical settings.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-fujifilm'},
    categories: [{_type: 'reference', _ref: 'category-imaging-solutions'}],
    featured: false,
  },
  {
    _id: 'product-dental-unit',
    _type: 'product',
    name: 'Dental Unit',
    slug: {current: 'dental-unit'},
    description: 'Complete dental workstation with ergonomic design for efficient procedures.',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Comprehensive dental solution with integrated tools and equipment.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-cami'},
    categories: [{_type: 'reference', _ref: 'category-dental-solutions'}],
    featured: false,
  },
  {
    _id: 'product-centrifuge',
    _type: 'product',
    name: 'Centrifuge',
    slug: {current: 'centrifuge'},
    description: 'High-speed lab centrifuge reliable for sample separation.',
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Precision equipment for laboratory sample processing and analysis.'}],
      },
    ],
    brand: {_type: 'reference', _ref: 'brand-medwish'},
    categories: [{_type: 'reference', _ref: 'category-lab-solutions'}],
    featured: false,
  },
]

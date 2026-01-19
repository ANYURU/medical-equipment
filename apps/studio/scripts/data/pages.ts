export const pagesData = [
  {
    _id: 'page-about-us',
    _type: 'page',
    title: 'About Us',
    slug: {current: 'about-us'},
    content: [
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Gombaland Uganda Limted is a registered company incorporated under the laws of the Republic of Uganda in 2011, with our head office located at Block 29, Plot 1521 Mawanda Road, Kampala.'}],
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'We are a growing company with a vision of becoming the leading distributor of medical equipment, sundries, consumables and technical services provider in the East Africa region.'}],
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'We are proud to be among the leading distributors of medical equipment, supplies and consumables in Uganda, especially imaging and radiology, critical care, surgical, and medical furniture.'}],
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'Our medium-term plan for the Ugandan market is to venture more into the medical laboratory equipment and reagents while our expansion plan is to focus on East African market.'}],
      },
      {
        _type: 'block',
        children: [{_type: 'span', text: 'We are dedicated to provide our clients with high standard and quality medical equipment with dedicated, committed and professional services support.'}],
      },
    ],
  },
  {
    _id: 'page-privacy',
    _type: 'page',
    title: 'Privacy Policy',
    slug: {current: 'privacy'},
    content: `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

At Gombaland Uganda Limited, we are committed to protecting your privacy and ensuring the security of your personal information.

1. Information We Collect
We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support.

2. How We Use Your Information
We use the information we collect to process orders, provide customer service, and improve our services.

3. Information Sharing
We do not sell, trade, or rent your personal information to third parties.

4. Data Security
We implement appropriate security measures to protect your personal information.

5. Your Rights
You have the right to access, correct, or delete your personal information.

6. Contact Us
If you have questions about this Privacy Policy, please contact us at info@biomedengsug.org`,
    seo: {
      metaTitle: 'Privacy Policy - Gombaland Uganda Limited',
      metaDescription: 'Learn how Gombaland Uganda Limited collects, uses, and protects your personal information.',
    },
  },
  {
    _id: 'page-terms',
    _type: 'page',
    title: 'Terms of Service',
    slug: {current: 'terms'},
    content: `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Welcome to Gombaland Uganda Limited. By accessing our website and services, you agree to these Terms of Service.

1. Use of Services
You agree to use our services only for lawful purposes and in accordance with these Terms.

2. Product Information
We strive to provide accurate product information, but we do not warrant that descriptions or pricing are error-free.

3. Orders and Payments
All orders are subject to acceptance and availability. Payment terms will be specified at checkout.

4. Warranties
Products are covered by manufacturer warranties. Please refer to individual product documentation.

5. Limitation of Liability
Gombaland Uganda Limited shall not be liable for any indirect, incidental, or consequential damages.

6. Governing Law
These Terms are governed by the laws of the Republic of Uganda.

7. Contact Information
For questions about these Terms, contact us at info@biomedengsug.org`,
    seo: {
      metaTitle: 'Terms of Service - Gombaland Uganda Limited',
      metaDescription: 'Read the terms and conditions for using Gombaland Uganda Limited services.',
    },
  },
]

import seo from '../schemas/objects/seo';
import hero from '../schemas/objects/hero';
import portableText from '../schemas/objects/portableText';
import categoryReference from '../schemas/objects/categoryReference';
import brandReference from '../schemas/objects/brandReference';

import category from '../schemas/documents/category';
import product from '../schemas/documents/product';
import brand from '../schemas/documents/brand';

export const schemaTypes = [
  // Objects
  seo,
  hero,
  portableText,
  categoryReference,
  brandReference,
  // Documents
  category,
  product,
  brand,
];

import { photoSchema } from './photo'
import { gallerySchema } from './gallery'
import { siteSettingsSchema } from './siteSettings'
import { serviceCategorySchema } from './serviceCategory'
import { seoSchema } from './seo'

// seoSchema is an object type (not a document) — registered first so gallery
// and other schemas can reference it by name ('seo').
export const schemas = [seoSchema, photoSchema, gallerySchema, siteSettingsSchema, serviceCategorySchema]

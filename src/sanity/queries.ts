import { groq } from 'next-sanity'

export const ARTICLES_LIST_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    "slugEn": slugEn.current,
    "categories": coalesce(categories, [category]),
    premium,
    excerpt,
    excerptEn,
    author,
    publishedAt,
    readTimeMinutes,
    coverImage,
  }
`

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && (slug.current == $slug || slugEn.current == $slug)][0] {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    "slugEn": slugEn.current,
    "categories": coalesce(categories, [category]),
    premium,
    excerpt,
    excerptEn,
    author,
    publishedAt,
    readTimeMinutes,
    coverImage,
    content,
    contentEn,
  }
`

export const ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article"] { "slug": slug.current }
`

export const ARTICLE_SLUGS_EN_QUERY = groq`
  *[_type == "article" && defined(titleEn) && defined(contentEn)] {
    "slug": coalesce(slugEn.current, slug.current)
  }
`

export const REPORTS_LIST_QUERY = groq`
  *[_type == "report"] | order(publishedAt desc) {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    "slugEn": slugEn.current,
    topic,
    premium,
    excerpt,
    excerptEn,
    author,
    publishedAt,
    readTimeMinutes,
    pageCount,
    coverImage,
  }
`

export const REPORT_BY_SLUG_QUERY = groq`
  *[_type == "report" && (slug.current == $slug || slugEn.current == $slug)][0] {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    "slugEn": slugEn.current,
    topic,
    premium,
    excerpt,
    excerptEn,
    author,
    publishedAt,
    readTimeMinutes,
    pageCount,
    coverImage,
    content,
    contentEn,
  }
`

export const REPORT_SLUGS_QUERY = groq`
  *[_type == "report"] { "slug": slug.current }
`

export const VENTURES_LIST_QUERY = groq`
  *[_type == "venture"] | order(_createdAt asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    taglineEn,
    description,
    descriptionEn,
    vertical,
    status,
    logo,
    url,
    foundedYear,
  }
`

export const VENTURE_BY_SLUG_QUERY = groq`
  *[_type == "venture" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    taglineEn,
    description,
    descriptionEn,
    vertical,
    status,
    logo,
    url,
    foundedYear,
  }
`

export const VENTURE_SLUGS_QUERY = groq`
  *[_type == "venture"] { "slug": slug.current }
`

export const PRODUCTS_LIST_QUERY = groq`
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    name,
    "slug": slug.current,
    productType,
    price,
    image,
  }
`

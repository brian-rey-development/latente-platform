import { groq } from 'next-sanity'

export const ARTICLES_LIST_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    category,
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
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    titleEn,
    "slug": slug.current,
    category,
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
  *[_type == "article" && defined(titleEn) && defined(contentEn)] { "slug": slug.current }
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

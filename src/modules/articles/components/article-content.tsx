import { getTranslations } from 'next-intl/server'
import { PortableText } from '@portabletext/react'
import type { Article } from '../domain/types'
import { portableTextComponents } from './content-block'

interface ArticleContentProps {
  readonly article: Article
}

export async function ArticleContent({ article }: ArticleContentProps) {
  const t = await getTranslations('article')

  return (
    <div className="w-full lg:w-3/4 p-6 md:p-12 lg:px-24 lg:py-16 bg-surface">
      <div className="max-w-2xl font-serif text-xl text-ink leading-[1.8] space-y-8">
        <PortableText value={article.content} components={portableTextComponents} />
      </div>
      <div className="max-w-3xl mt-24 pt-10 border-t-4 border-ink flex justify-between items-center font-mono font-bold uppercase tracking-widest text-ink">
        <span>{t('end')}</span>
        <span className="text-brand text-xl animate-pulse">{'///'}</span>
      </div>
    </div>
  )
}

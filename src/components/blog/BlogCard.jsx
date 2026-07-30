import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Reveal from '../ui/Reveal'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function BlogCard({ post, index = 0 }) {
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-none border border-charcoal-100 bg-white shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-soft-lg">
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="flex flex-1 flex-col p-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">{post.category}</span>
          <h3 className="mt-2 font-heading text-lg font-medium leading-snug text-charcoal-900 group-hover:text-blue-700">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-600">{post.excerpt}</p>
          <div className="mt-5 flex items-center justify-between border-t border-charcoal-100 pt-4 text-xs text-charcoal-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {dateFormatter.format(new Date(post.date))}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-700 transition-transform duration-200 ease-premium group-hover:translate-x-1">
            Read article
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

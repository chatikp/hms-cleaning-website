import { useParams, Navigate, Link } from 'react-router-dom'
import { Calendar, Clock, User } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import BlogCard from '../components/blog/BlogCard'
import { blogPosts, getPostBySlug } from '../data/blog'

const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { '@type': 'Organization', name: post.author },
          publisher: { '@type': 'Organization', name: 'Harrell Maintenance Solutions' },
        }}
      />

      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumbs={[{ label: 'Blog', to: '/blog' }, { label: post.title }]}
        image={post.image}
        blur
        eyebrowVariant="sand"
      />

      <Section bg="white">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <img
              src={post.image}
              alt=""
              className="mb-10 aspect-[16/9] w-full rounded-none object-cover"
            />
          </Reveal>

          <Reveal className="mb-10 flex flex-wrap items-center gap-6 border-b border-charcoal-800 pb-8 text-sm text-charcoal-400">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" aria-hidden="true" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {dateFormatter.format(new Date(post.date))}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </Reveal>

          <Reveal className="prose prose-invert max-w-none prose-headings:font-heading prose-a:text-blue-300">
            {post.content.map((paragraph, i) => (
              <p key={i} className="mb-5 leading-relaxed text-charcoal-200">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className="mt-12 text-center">
            <h2 className="font-heading text-xl font-medium text-white">Ready for a spotless space?</h2>
            <p className="mt-2 text-sm text-charcoal-200">Get an instant quote or book your next cleaning today.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/booking" variant="primary">Book a Cleaning</Button>
              <Button to="/quote" variant="outline">Get a Quote</Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section bg="cream">
        <Reveal>
          <h2 className="font-heading text-2xl font-medium text-white">More from the blog</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <BlogCard key={p.slug} post={p} index={i} />
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/blog" className="text-sm font-semibold text-blue-700 hover:underline">
            ← Back to all articles
          </Link>
        </Reveal>
      </Section>
    </>
  )
}

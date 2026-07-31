import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Section from '../components/ui/Section'
import BlogCard from '../components/blog/BlogCard'
import { blogPosts } from '../data/blog'
import blogHeroImage from '../assets/images/blog-cleaning-notes-flatlay.webp'

export default function Blog() {
  return (
    <>
      <Seo
        title="Cleaning Tips & Resources Blog"
        description="Practical cleaning tips, move out checklists, and home care guides from the Harrell Maintenance Solution team."
        path="/blog"
      />

      <PageHero
        eyebrow="Blog"
        title="Cleaning tips & resources"
        subtitle="Practical, straightforward guidance for keeping your home or workplace spotless between visits."
        breadcrumbs={[{ label: 'Blog' }]}
        image={blogHeroImage}
        blur
      />

      <Section bg="white">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </Section>
    </>
  )
}

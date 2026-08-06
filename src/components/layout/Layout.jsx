import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import StickyMobileCta from './StickyMobileCta'
import ScrollToTop from '../../lib/ScrollToTop'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream/10">
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}

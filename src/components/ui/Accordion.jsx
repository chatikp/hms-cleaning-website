import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function AccordionItem({ question, answer, isOpen, onToggle }) {
  const id = useId()

  return (
    <div className={`relative border-b border-white/10 pl-4 transition-colors duration-300 ${isOpen ? 'border-l-[3px] border-l-blue-400' : 'border-l-[3px] border-l-transparent'}`}>
      <h3>
        <button
          type="button"
          id={`accordion-trigger-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-panel-${id}`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-heading text-base font-medium text-white transition-colors hover:text-blue-300 sm:text-lg"
        >
          <span>{question}</span>
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 text-blue-300 transition-transform duration-300 ease-premium ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 leading-relaxed text-charcoal-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Accordion({ items, allowMultiple = false, defaultOpenIndex = null }) {
  const [openIndexes, setOpenIndexes] = useState(defaultOpenIndex === null ? [] : [defaultOpenIndex])

  const toggle = (index) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index)
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index]
      }
      return isOpen ? [] : [index]
    })
  }

  return (
    <div className="divide-y-0">
      {items.map((item, index) => (
        <AccordionItem
          key={item.q || index}
          question={item.q}
          answer={item.a}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  )
}

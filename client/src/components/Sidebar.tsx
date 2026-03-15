import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'LIVING' },
  { name: 'BEDROOM' },
  { name: 'DINING' },
  { name: 'OFFICE' },
  { name: 'OUTDOOR' },
  { name: 'DECOR' },
];

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');

  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-neutral-50 border-r border-neutral-100 pt-8 pb-12 sticky top-[104px] h-[calc(100vh-104px)]">
      <div className="px-6 mb-8">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">
          Categories
        </h2>
        <nav className="space-y-1">
          <Link
            to="/"
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="block"
          >
            <motion.span
              className={`group flex items-center justify-between py-3 px-4 -mx-4 text-sm uppercase tracking-widest transition-all duration-200 rounded ${
                !activeCategory ? 'bg-amber-500 text-white' : 'text-neutral-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
              whileHover={{ x: !activeCategory ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">All</span>
              <ChevronRight size={14} className={!activeCategory ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} />
            </motion.span>
          </Link>
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/?category=${encodeURIComponent(category.name)}`}
              onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
              className="block"
            >
              <motion.span
                className={`group flex items-center justify-between py-3 px-4 -mx-4 text-sm uppercase tracking-widest transition-all duration-200 rounded ${
                  activeCategory === category.name
                    ? 'bg-amber-500 text-white'
                    : 'text-neutral-600 hover:bg-amber-50 hover:text-amber-600'
                }`}
                whileHover={{ x: activeCategory === category.name ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">{category.name}</span>
                <ChevronRight
                  size={14}
                  className={`transition-transform ${
                    activeCategory === category.name
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-50'
                  }`}
                />
              </motion.span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

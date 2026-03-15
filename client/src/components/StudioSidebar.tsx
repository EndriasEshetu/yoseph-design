import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudioCategory, STUDIO_CATEGORIES } from '../context/StudioCategoryContext';

export const StudioSidebar = () => {
  const { selectedCategory, setSelectedCategory } = useStudioCategory();

  return (
    <aside className="hidden lg:flex flex-col w-56 min-h-screen bg-neutral-50 border-r border-neutral-100 pt-8 pb-12 sticky top-[104px] h-[calc(100vh-104px)]">
      <div className="px-6 mb-8">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">
          Categories
        </h2>
        <nav className="space-y-1">
          {STUDIO_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`group flex items-center justify-between w-full py-3 px-4 -mx-4 text-sm uppercase tracking-widest transition-all duration-200 text-left ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white'
                  : 'text-neutral-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
              whileHover={{ x: selectedCategory === category.id ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">{category.name}</span>
              <ChevronRight
                size={14}
                className={`transition-transform ${
                  selectedCategory === category.id
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-50'
                }`}
              />
            </motion.button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

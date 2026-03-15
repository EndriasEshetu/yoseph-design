import { StudioModelGrid } from '../components/StudioModelGrid';
import { useStudioCategory, STUDIO_CATEGORIES } from '../context/StudioCategoryContext';

export const StudioPage = () => {
  const { selectedCategory, setSelectedCategory } = useStudioCategory();

  return (
    <>
      {/* Mobile categories - visible only below lg */}
      <div className="lg:hidden border-b border-neutral-100 bg-neutral-50/80 px-4 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3">Categories</p>
        <div className="flex flex-wrap gap-2">
          {STUDIO_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors rounded ${
                selectedCategory === category.id
                  ? 'bg-amber-500 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-amber-400 hover:text-amber-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <StudioModelGrid />

      {/* Philosophy Section - Studio */}
      <section className="py-24 bg-neutral-50 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 block mb-8">
            Studio
          </span>
          <blockquote
            className="text-3xl md:text-4xl lg:text-5xl font-light italic leading-snug text-neutral-800"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            "Precision 3D assets for every pipeline from concept to construction. Your format, your workflow. 3D models, CAD files, and more."
          </blockquote>
          <p className="mt-10 text-sm font-medium uppercase tracking-widest text-neutral-600">
            Yoseph Design Studio
          </p>
        </div>
      </section>
    </>
  );
};

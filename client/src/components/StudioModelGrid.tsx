import { useState, useMemo } from 'react';
import { StudioModelCard } from './StudioModelCard';
import { StudioModelDetail } from './StudioModelDetail';
import { useStudioCategory } from '../context/StudioCategoryContext';
import { useStudio } from '../context/StudioContext';
import type { StudioCategoryId } from '../context/StudioCategoryContext';
import type { StudioModel } from '../data/studioModels';

function filterModelsByCategory(models: StudioModel[], categoryId: StudioCategoryId) {
  if (categoryId === 'logo-design' || categoryId === 'branding') return models;
  if (categoryId === 'architectural') return models.filter((m) => m.category === 'Architectural');
  if (categoryId === 'product') return models.filter((m) => ['Furniture', 'Lighting', 'Decor'].includes(m.category));
  return models;
}

export const StudioModelGrid = () => {
  const { studioModels, loading } = useStudio();
  const { selectedCategory } = useStudioCategory();
  const [selectedModel, setSelectedModel] = useState<StudioModel | null>(null);

  const filteredModels = useMemo(
    () => filterModelsByCategory(studioModels, selectedCategory),
    [studioModels, selectedCategory]
  );

  return (
    <section className="py-12 px-4 md:px-6" id="studio-collection">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-neutral-200 rounded mb-4" />
              <div className="h-4 bg-neutral-200 w-3/4 mb-2 rounded" />
              <div className="h-4 bg-neutral-200 w-1/4 rounded" />
            </div>
          ))}
        </div>
      ) : filteredModels.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-lg">No 3D models in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className="cursor-pointer"
            >
              <StudioModelCard model={model} onViewDetails={() => setSelectedModel(model)} />
            </div>
          ))}
        </div>
      )}

      <StudioModelDetail
        model={selectedModel}
        isOpen={!!selectedModel}
        onClose={() => setSelectedModel(null)}
      />
    </section>
  );
};

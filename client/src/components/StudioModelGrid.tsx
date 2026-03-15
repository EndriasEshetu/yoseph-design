import { useState, useMemo } from 'react';
import { StudioModelCard } from './StudioModelCard';
import { StudioModelDetail } from './StudioModelDetail';
import { STUDIO_MODELS } from '../data/studioModels';
import { useStudioCategory } from '../context/StudioCategoryContext';
import type { StudioCategoryId } from '../context/StudioCategoryContext';

function filterModelsByCategory(models: typeof STUDIO_MODELS, categoryId: StudioCategoryId) {
  if (categoryId === 'logo-design' || categoryId === 'branding') return models;
  if (categoryId === 'architectural') return models.filter((m) => m.category === 'Architectural');
  if (categoryId === 'product') return models.filter((m) => ['Furniture', 'Lighting', 'Decor'].includes(m.category));
  return models;
}

export const StudioModelGrid = () => {
  const { selectedCategory } = useStudioCategory();
  const [selectedModel, setSelectedModel] = useState<typeof STUDIO_MODELS[0] | null>(null);

  const filteredModels = useMemo(
    () => filterModelsByCategory(STUDIO_MODELS, selectedCategory),
    [selectedCategory]
  );

  return (
    <section className="py-12 px-4 md:px-6" id="studio-collection">
      {filteredModels.length === 0 ? (
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

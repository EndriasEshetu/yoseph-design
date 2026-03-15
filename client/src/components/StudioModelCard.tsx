import { useState, useRef, useCallback } from 'react';
import { Plus, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '../context/CartContext';
import { Product } from '../data/products';
import { StudioModel } from '../data/studioModels';

const ZOOM_SCALE = 1.8;

interface StudioModelCardProps {
  model: StudioModel;
  onViewDetails: () => void;
}

function modelToCartProduct(model: StudioModel): Product {
  return {
    id: model.id,
    name: model.name,
    description: model.description,
    price: model.price,
    category: model.format,
    image: model.image,
    featured: model.featured,
  };
}

export const StudioModelCard = ({ model, onViewDetails }: StudioModelCardProps) => {
  const { addItem } = useCart();
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(modelToCartProduct(model));
    toast.success(`${model.name} added to cart`, {
      description: `Format: ${model.format}. You can view it in your shopping bag.`,
      duration: 2000,
    });
  };

  return (
    <div className="group relative">
      <div
        ref={containerRef}
        className="aspect-[4/5] overflow-hidden bg-neutral-100 mb-4 relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transform: isHovering ? `scale(${ZOOM_SCALE})` : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none [&_button]:pointer-events-auto">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="bg-white text-black p-3 hover:bg-neutral-900 hover:text-white transition-colors"
              title="Add to Cart"
            >
              <Plus size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
              className="bg-white text-black p-3 hover:bg-neutral-900 hover:text-white transition-colors"
              title="View Details"
            >
              <Info size={20} />
            </button>
          </div>
        </div>
        {model.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-800 line-clamp-1">
            {model.name}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">{model.format}</p>
        </div>
        <span className="text-sm font-semibold whitespace-nowrap">${model.price.toLocaleString()}</span>
      </div>
    </div>
  );
};

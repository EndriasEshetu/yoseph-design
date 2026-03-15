import React, { useState, useRef, useCallback } from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Plus, Info, Box } from 'lucide-react';
import { toast } from 'sonner';

const ZOOM_SCALE = 1.8;

interface ProductCardProps {
  product: Product;
  onGet3DModel?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onGet3DModel }) => {
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
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: "You can view it in your shopping bag.",
      duration: 2000,
    });
  };

  const handleGet3DModel = (e: React.MouseEvent) => {
    e.stopPropagation();
    onGet3DModel?.(product);
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
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transform: isHovering ? `scale(${ZOOM_SCALE})` : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none [&_button]:pointer-events-auto">
           <div className="flex flex-wrap gap-2 justify-center p-2">
             <button 
               onClick={handleAddToCart}
               className="bg-white text-black p-3 hover:bg-neutral-900 hover:text-white transition-colors"
               title="Add to Cart"
             >
               <Plus size={20} />
             </button>
             <button className="bg-white text-black p-3 hover:bg-neutral-900 hover:text-white transition-colors" title="View Details">
               <Info size={20} />
             </button>
             <button 
               onClick={handleGet3DModel}
               className="bg-white text-black p-3 hover:bg-neutral-900 hover:text-white transition-colors flex items-center gap-1.5"
               title="Get 3D model"
             >
               <Box size={20} />
               <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">3D</span>
             </button>
           </div>
        </div>
        {product.featured && (
          <div className="absolute top-4 left-4">
             <span className="bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
               Featured
             </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-800 line-clamp-1">{product.name}</h3>
          <p className="text-xs text-neutral-500 mt-1">{product.category}</p>
        </div>
        <span className="text-sm font-semibold whitespace-nowrap">${product.price.toLocaleString()}</span>
      </div>
    </div>
  );
};
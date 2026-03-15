import * as Dialog from '@radix-ui/react-dialog';
import { X, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudioModel } from '../data/studioModels';
import { Product } from '../data/products';

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

interface StudioModelDetailProps {
  model: StudioModel | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudioModelDetail = ({ model, isOpen, onClose }: StudioModelDetailProps) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!model) return null;

  const handleAddToCart = () => {
    const product = modelToCartProduct(model);
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} × ${model.name} added to cart`);
    setQuantity(1);
    onClose();
  };

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) { setQuantity(1); onClose(); } }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120]" />
        <AnimatePresence>
          {isOpen && (
            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-4xl bg-white z-[121] shadow-2xl focus:outline-none rounded-xl sm:rounded-none overflow-hidden"
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg sm:hidden"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col sm:flex-row h-full sm:h-auto sm:max-h-[90vh]">
                  <div className="relative w-full sm:flex-1 h-56 sm:h-auto sm:min-h-[500px] bg-neutral-100 shrink-0">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest rounded-full sm:hidden">
                      {model.format}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="p-5 sm:p-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <div>
                          <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-1">
                            {model.format} · {model.category}
                          </span>
                          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{model.name}</h2>
                          <p className="text-xl sm:text-2xl font-light mt-1">${model.price.toLocaleString()}</p>
                        </div>
                        <Dialog.Close className="hidden sm:flex p-2 hover:bg-neutral-100 rounded-full transition-colors">
                          <X size={20} />
                        </Dialog.Close>
                      </div>

                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                        {model.description}
                      </p>

                      {/* File format */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3">File format</p>
                        <span className="inline-block px-4 py-2 bg-neutral-100 text-neutral-800 font-medium rounded-lg">
                          .{model.format.toLowerCase()}
                        </span>
                      </div>

                      <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wider mb-3">Quantity</p>
                        <div className="inline-flex items-center border border-neutral-200 rounded-lg">
                          <button
                            onClick={decrementQuantity}
                            className="p-3 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                            disabled={quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-medium">{quantity}</span>
                          <button
                            onClick={incrementQuantity}
                            className="p-3 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                            disabled={quantity >= 10}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 min-h-4" />

                      <button
                        onClick={handleAddToCart}
                        className="w-full bg-amber-500 text-white py-4 text-sm font-semibold uppercase tracking-wider hover:bg-amber-600 transition-all flex items-center justify-center gap-3 rounded-lg shadow-lg hover:shadow-xl"
                      >
                        <ShoppingBag size={18} />
                        Add to Bag — ${(model.price * quantity).toLocaleString()}
                      </button>

                      <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Format</h4>
                          <p className="text-xs text-neutral-600">{model.format}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">License</h4>
                          <p className="text-xs text-neutral-600">Commercial use</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

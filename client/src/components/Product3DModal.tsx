import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

interface Product3DModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Product3DModal = ({ product, isOpen, onClose }: Product3DModalProps) => {
  if (!product) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
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
                className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg bg-white z-[121] shadow-2xl focus:outline-none rounded-xl overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold tracking-tight">View 3D model</h2>
                    <Dialog.Close className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                      <X size={20} />
                    </Dialog.Close>
                  </div>
                  <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-neutral-800 mb-1">{product.name}</p>
                  <p className="text-xs text-neutral-500 mb-4">{product.category}</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    Browse and download 3D models of our furniture in multiple formats (RVT, FBX, OBJ) in our Studio.
                  </p>
                  <Link
                    to="/studio"
                    onClick={onClose}
                    className="block w-full text-center bg-amber-500 text-white py-3 text-sm font-semibold uppercase tracking-wider hover:bg-amber-600 transition-colors rounded-lg"
                  >
                    Open Studio
                  </Link>
                </div>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const OG_KEYS = ['og:image', 'og:title', 'og:description', 'og:url'] as const;

function setMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function clearProductMeta() {
  OG_KEYS.forEach((key) => {
    const el = document.querySelector(`meta[property="${key}"]`);
    if (el) el.remove();
  });
}

export function ProductShareMeta() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const { products, loading } = useShop();

  useEffect(() => {
    if (!productId || loading) {
      if (!productId) clearProductMeta();
      return;
    }
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const url = typeof window !== 'undefined' ? window.location.href : '';
    setMeta('og:image', product.image);
    setMeta('og:title', product.name);
    setMeta('og:description', product.description);
    setMeta('og:url', url);

    return () => clearProductMeta();
  }, [productId, loading, products]);

  return null;
}

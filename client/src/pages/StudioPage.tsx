import { StudioModelGrid } from '../components/StudioModelGrid';

export const StudioPage = () => {
  return (
    <>
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

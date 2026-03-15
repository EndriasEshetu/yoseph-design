import { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend API (e.g. POST /api/contact) when ready
    toast.success('Message sent!', {
      description: "We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 block mb-4">
            Get in touch
          </span>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Contact Us
          </h1>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto">
            Have a question or want to work together? Send us a message and we’ll respond as soon as we can.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-600">Name</label>
              <input
                required
                type="text"
                className="w-full border-b border-neutral-200 py-2 focus:border-amber-500 outline-none text-sm transition-colors"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-600">Email</label>
              <input
                required
                type="email"
                className="w-full border-b border-neutral-200 py-2 focus:border-amber-500 outline-none text-sm transition-colors"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-600">Subject</label>
              <input
                type="text"
                className="w-full border-b border-neutral-200 py-2 focus:border-amber-500 outline-none text-sm transition-colors"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-neutral-600">Message</label>
              <textarea
                required
                rows={5}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:border-amber-500 outline-none text-sm resize-y transition-colors"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-amber-500 text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-amber-600 transition-colors rounded-lg"
            >
              Send message
            </button>
          </form>

          {/* Contact info */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">
              Other ways to reach us
            </h2>
            <ul className="space-y-6 text-neutral-700">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Address</span>
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={20} className="shrink-0 text-amber-600" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Phone</span>
                  <a href="tel:+251911000000" className="hover:text-amber-600 transition-colors">
                    +251 911 000 000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="shrink-0 text-amber-600" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">Email</span>
                  <a href="mailto:yosephteferi@gmail.com" className="hover:text-amber-600 transition-colors">
                    yosephteferi@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

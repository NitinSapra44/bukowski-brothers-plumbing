import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Clock, MapPin, Mail, X, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { z } from "zod";

import hero from "@/assets/hero.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bukowski Brothers Plumbing — Trusted Plumbers, 24/7 Service" },
      {
        name: "description",
        content:
          "Family-owned plumbers serving Springfield for 30+ years. Emergency repairs, installations, water heaters, drain cleaning. Licensed & insured.",
      },
      { property: "og:title", content: "Bukowski Brothers Plumbing" },
      {
        property: "og:description",
        content:
          "Trusted family plumbers. 24/7 emergency service. Quality work, fair prices.",
      },
      { property: "og:image", content: hero },
    ],
  }),
  component: Home,
});

const services = [
  {
    title: "Repairs & Maintenance",
    desc: "Leaky faucets, broken pipes, running toilets — we diagnose it fast, fix it right, and leave the job site cleaner than we found it. No patch jobs, no callbacks.",
    img: gallery3,
    alt: "Plumber fitting a copper pipe joint",
  },
  {
    title: "Drain Cleaning",
    desc: "Hydro-jetting and camera inspection for stubborn clogs, root intrusions, and slow-draining lines. We clear the problem at the source — not just push it further down.",
    img: gallery1,
    alt: "Clean bathroom fixture after drain service",
  },
  {
    title: "Water Heater Service",
    desc: "Tank and tankless installation, repair, and annual flush. Most jobs are same-day. We pull the permits, handle the inspection, and haul away the old unit.",
    img: gallery2,
    alt: "Tankless water heater installation",
  },
  {
    title: "Bathroom & Kitchen Remodels",
    desc: "Gut reno or targeted upgrade, we rough in and finish the plumbing on schedule so your tile crew and countertop guys can follow right behind.",
    img: gallery4,
    alt: "Completed luxury bathroom remodel",
  },
  {
    title: "24/7 Emergency Service",
    desc: "Burst pipe at 2 a.m.? Sewage backup on a holiday? We answer every call and aim to be on-site within 60 minutes anywhere in our service area.",
    img: hero,
    alt: "Plumber responding to an emergency call",
  },
];

const galleryImages = [
  { src: gallery1, alt: "Newly installed chrome bathroom faucet" },
  { src: gallery2, alt: "Tankless water heater installation" },
  { src: gallery3, alt: "Plumber fitting a copper pipe joint" },
  { src: gallery4, alt: "Completed luxury bathroom remodel" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about the job")
    .max(1000),
});

function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success("Thanks! We'll get back to you within the hour.");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-center" />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            aria-label="Close photo"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightbox}
            alt="Gallery photo enlarged"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-primary border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a
            href="#top"
            className="font-display font-black text-lg text-primary-foreground leading-none"
          >
            Bukowski <span className="text-secondary">Brothers</span> Plumbing
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#services" className="hover:text-white transition">
              Services
            </a>
            <a href="#gallery" className="hover:text-white transition">
              Gallery
            </a>
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a href="#contact" className="hover:text-white transition">
              Contact
            </a>
          </nav>
          <a
            href="tel:+15551234567"
            className="inline-flex items-center gap-2 rounded bg-accent text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            <Phone className="h-4 w-4" /> (555) 123-4567
          </a>
        </div>
      </header>

      {/* Hero — left text, full-bleed photo right */}
      <section
        id="top"
        className="pt-16 grid lg:grid-cols-2 min-h-[660px]"
      >
        <div className="flex items-center bg-background py-20 px-6 md:px-12 lg:px-16">
          <div className="max-w-lg">
            <h1 className="font-display font-black text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-primary">
              Plumbing done right.{" "}
              <span className="text-accent">Family-trusted</span> since 1992.
            </h1>
            <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
              From a dripping tap to a full re-pipe, Bukowski Brothers brings
              honest pricing, fast response, and craftsmanship you can count on.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-2 rounded bg-accent text-white px-6 py-3 text-base font-semibold hover:opacity-90 transition shadow"
              >
                <Phone className="h-5 w-5" /> Call Now
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded border-2 border-primary text-primary px-6 py-3 text-base font-semibold hover:bg-primary hover:text-primary-foreground transition"
              >
                Get a Free Quote <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <img
            src={hero}
            alt="Bukowski Brothers plumber at work"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Trust strip */}
      <div className="bg-primary text-primary-foreground/90">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap justify-center items-center gap-x-0 gap-y-2 text-sm font-medium tracking-wide">
          <span className="px-4">Licensed &amp; Insured</span>
          <span className="text-secondary/60 hidden sm:inline select-none" aria-hidden="true">·</span>
          <span className="px-4">24/7 Emergency Service</span>
          <span className="text-secondary/60 hidden sm:inline select-none" aria-hidden="true">·</span>
          <span className="px-4">30+ Years in Business</span>
          <span className="text-secondary/60 hidden sm:inline select-none" aria-hidden="true">·</span>
          <span className="px-4">Locally Owned</span>
        </div>
      </div>

      {/* Blueprint divider */}
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-t-2 border-dashed border-secondary/35" />
        </div>
      </div>

      {/* Services — alternating image/text rows */}
      <section id="services" className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              What we do
            </span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl text-primary leading-tight">
              Plumbing services, handled with care
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Residential and light commercial work — one trusted team from
              start to finish.
            </p>
          </div>

          <div className="space-y-20">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`flex flex-col gap-10 lg:gap-16 items-center ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-1/2">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className="w-full h-72 md:h-96 object-cover rounded shadow-md"
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="font-display font-black text-3xl text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-foreground/80 leading-relaxed text-lg">
                    {s.desc}
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1 text-secondary font-semibold hover:text-accent transition text-sm"
                  >
                    Request this service{" "}
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery with lightbox */}
      <section id="gallery" className="py-24 md:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Our work
            </span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl text-primary leading-tight">
              Recent jobs we're proud of
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Every install and repair, finished to a standard we'd want in our
              own homes. Click any photo to enlarge.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((g, i) => (
              <button
                key={i}
                className={`overflow-hidden rounded group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
                  i === 0 ? "lg:row-span-2 lg:col-span-2" : ""
                }`}
                onClick={() => setLightbox(g.src)}
                aria-label={`View full size: ${g.alt}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i === 0
                      ? "h-full min-h-[300px] lg:min-h-[620px]"
                      : "h-48 md:h-72"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Mark and Tom Bukowski in front of their service van"
              loading="lazy"
              className="rounded shadow-lg w-full object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:flex flex-col bg-primary text-primary-foreground rounded p-6 shadow-xl">
              <div className="text-4xl font-display font-black">30+</div>
              <div className="text-sm opacity-80 mt-1">Years in business</div>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              About us
            </span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl text-primary leading-tight">
              Two brothers, one promise: do the job right.
            </h2>
            <p className="mt-6 text-foreground/80 leading-relaxed">
              Mark and Tom Bukowski grew up around plumbing — their father
              started the family trade in 1992. Today, they lead a small team
              of licensed pros who treat your home like their own. No hidden
              fees, no rushed work, no surprises on the invoice.
            </p>
            <p className="mt-3 text-foreground/80 leading-relaxed">
              We serve Springfield and the surrounding counties, and we're small
              enough that you'll get one of us — or someone we've personally
              trained — on every job.
            </p>
            <p className="mt-5 text-sm text-muted-foreground font-medium">
              State Plumbing License #: IL-PLB-2847193 &nbsp;·&nbsp; Fully
              Bonded &amp; Insured
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "Upfront pricing — quoted before we start",
                "100% satisfaction guarantee on every job",
                "Background-checked, drug-tested technicians",
                "We pull all required permits",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground/90">
                  <span
                    className="mt-1.5 h-3 w-3 rounded-full bg-accent flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" className="py-24 md:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Get in touch
            </span>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl text-primary leading-tight">
              Request a quote or book a visit
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Fill in the form and we'll call you back within the hour during
              business hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <form
              onSubmit={handleSubmit}
              className="rounded bg-card border border-border p-8 md:p-10 shadow-sm space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    maxLength={80}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    maxLength={40}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  maxLength={160}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service needed</Label>
                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  <option value="repairs">Repairs &amp; Maintenance</option>
                  <option value="drains">Drain Cleaning</option>
                  <option value="water-heater">Water Heater Service</option>
                  <option value="remodel">Bathroom / Kitchen Remodel</option>
                  <option value="emergency">Emergency Service</option>
                  <option value="other">Other / Not sure</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">What's the issue?</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={1000}
                  placeholder="Describe the problem — leak, slow drain, no hot water…"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 text-base font-semibold rounded bg-accent text-white hover:opacity-90 transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send request"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. We'll never share your details.
              </p>
            </form>

            <div className="space-y-6">
              <div className="rounded bg-card border border-border p-8 shadow-sm space-y-5">
                <InfoRow
                  icon={MapPin}
                  title="Visit us"
                  lines={["1240 Riverside Ave", "Springfield, IL 62704"]}
                />
                <InfoRow
                  icon={Phone}
                  title="Call us"
                  lines={["(555) 123-4567", "24/7 emergency line"]}
                  phoneHref="tel:+15551234567"
                />
                <InfoRow
                  icon={Mail}
                  title="Email"
                  lines={["hello@bukowskibros.com"]}
                />
                <InfoRow
                  icon={Clock}
                  title="Hours"
                  lines={["Mon–Fri: 7am – 7pm", "Sat–Sun: Emergency only"]}
                />
              </div>
              <div className="rounded overflow-hidden border border-border shadow-sm h-[320px]">
                <iframe
                  title="Bukowski Brothers Plumbing location"
                  src="https://www.google.com/maps?q=1240+Riverside+Ave+Springfield+IL&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
          <div className="font-display font-black text-white text-lg">
            Bukowski Brothers Plumbing
          </div>
          <p>
            © {new Date().getFullYear()} Bukowski Brothers Plumbing. Licensed
            &amp; insured. Lic #IL-PLB-2847193
          </p>
        </div>
      </footer>

      {/* Sticky mobile call button — hidden on md+ */}
      <a
        href="tel:+15551234567"
        className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-center gap-2 bg-accent text-white py-4 text-base font-semibold md:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.18)]"
      >
        <Phone className="h-5 w-5" /> Call Now — (555) 123-4567
      </a>

      {/* Spacer so footer content isn't hidden behind sticky button on mobile */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  title,
  lines,
  phoneHref,
}: {
  icon: typeof MapPin;
  title: string;
  lines: string[];
  phoneHref?: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-secondary/10 text-secondary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-semibold text-foreground">{title}</div>
        {lines.map((l, i) =>
          phoneHref && i === 0 ? (
            <a
              key={l}
              href={phoneHref}
              className="block text-sm text-accent font-semibold hover:opacity-80 transition"
            >
              {l}
            </a>
          ) : (
            <div key={l} className="text-sm text-muted-foreground">
              {l}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

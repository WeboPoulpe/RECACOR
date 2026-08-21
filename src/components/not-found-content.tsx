import Link from "next/link";
import { ArrowRight, Car, Home, MapPin, Phone, Truck, Wrench } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";

const recoveryLinks = [
  {
    href: "/pneus-voiture",
    label: "Pneus voiture",
    description: "Montage et pneus VL au Crès",
    icon: Car,
  },
  {
    href: "/mecanique",
    label: "Mécanique rapide",
    description: "Vidange, freinage et géométrie",
    icon: Wrench,
  },
  {
    href: "/pneus-utilitaires-pl",
    label: "Pneus poids lourd",
    description: "Solutions pour flottes et transporteurs",
    icon: Truck,
  },
];

export function NotFoundContent() {
  return (
    <main className="relative isolate overflow-hidden bg-[var(--recacor-paper)] text-[var(--recacor-ink)]">
      <section className="relative overflow-hidden bg-[var(--recacor-night)] text-white">
        <div className="absolute -right-32 -top-36 h-[28rem] w-[28rem] rounded-full border-[3rem] border-blue-600/20 sm:h-[38rem] sm:w-[38rem]" />
        <div className="absolute -bottom-48 left-[8%] h-72 w-72 rounded-full border-[2rem] border-yellow-400/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(27,79,216,0.42),transparent_36%),linear-gradient(135deg,transparent,rgba(6,26,49,0.42))]" />

        <div className="recacor-shell relative grid min-h-[min(680px,calc(100vh-5rem))] items-center gap-10 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div className="max-w-2xl">
            <p className="recacor-eyebrow text-yellow-400">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              Atelier Recacor · Le Crès
            </p>
            <h1 className="mt-5 font-heading text-[clamp(7rem,23vw,15rem)] font-black leading-[0.72] tracking-[-0.08em] text-white">
              404
            </h1>
            <div className="mt-10 max-w-xl border-l-4 border-yellow-400 pl-5">
              <h2 className="font-heading text-4xl font-black uppercase leading-none sm:text-5xl">
                Cette route n&apos;est plus sur le pont.
              </h2>
              <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
                La page demandée n&apos;existe pas ou a changé d&apos;adresse. Retrouvez directement
                votre besoin pneus, mécanique ou poids lourd.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="recacor-btn-primary">
                <Home className="h-4 w-4" />
                Retour à l&apos;accueil
              </Link>
              <PhoneLink location="page" className="recacor-btn-secondary" showIcon>
                Appeler le garage
              </PhoneLink>
            </div>
          </div>

          <div className="relative lg:justify-self-end">
            <div className="relative max-w-md border-t-8 border-yellow-400 bg-white p-6 text-[var(--recacor-ink)] shadow-[0_28px_72px_rgba(0,0,0,0.28)] sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">
                On vous remet sur la bonne voie
              </p>
              <p className="mt-4 font-heading text-4xl font-black uppercase leading-[0.9] sm:text-5xl">
                Besoin d&apos;un pneu ou d&apos;un conseil ?
              </p>
              <p className="mt-5 text-sm leading-6 text-slate-600">
                Le garage Recacor vous accueille au 1240 RN 113, 34920 Le Crès.
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5 text-sm font-bold">
                <MapPin className="h-5 w-5 shrink-0 text-blue-700" />
                <span>Montpellier Est · Hérault</span>
              </div>
              <a
                href="tel:+33499533390"
                className="phone-link mt-5 flex items-center gap-3 bg-[var(--recacor-night)] px-4 py-3 font-black text-white transition hover:bg-[var(--recacor-indigo)]"
              >
                <Phone className="h-4 w-4 text-yellow-400" />
                04 99 53 33 90
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="recacor-shell py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="recacor-eyebrow">Par où repartir ?</p>
            <h2 className="recacor-title mt-3 text-4xl sm:text-5xl">Choisir un service</h2>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-black uppercase text-blue-700 hover:text-blue-900">
            Nous contacter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {recoveryLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group recacor-card flex items-start gap-4 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_42px_rgba(27,79,216,0.14)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <strong className="block font-heading text-2xl font-black leading-none">{item.label}</strong>
                  <span className="mt-2 block text-sm leading-5 text-muted-foreground">{item.description}</span>
                </span>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-blue-700 transition group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

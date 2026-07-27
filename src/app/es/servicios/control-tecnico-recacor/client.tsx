"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DevisCtaLink } from "@/components/devis-cta-link";
import { DevisControleTechniqueFormEs } from "@/components/forms/devis-controle-technique-es";
import { PhoneLink } from "@/components/phone-link";
import { PHONE_DISPLAY } from "@/lib/tracking";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  CircleAlert,
  ClipboardList,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const pricingCards = [
  {
    title: "Pack ITV turismo",
    price: "87,22€",
    desc: "Precontrol gratuito, gestión del paso por el control técnico en Francia y devolución del vehículo.",
  },
  {
    title: "Pack ITV utilitario",
    price: "97,02€",
    desc: "La misma gestión con precontrol gratuito para utilitarios ligeros.",
  },
];

const correctiveItems = [
  "Neumáticos desgastados o no conformes",
  "Pastillas y puntos de frenado",
  "Alineación y comportamiento en carretera",
  "Cambio de aceite y mantenimiento corriente",
  "Pequeña mecánica según diagnóstico del taller",
];

const faqs = [
  {
    q: "¿Qué incluye el precontrol de la ITV?",
    a: "El taller revisa los puntos que más suelen bloquear antes del control técnico, equivalente a la ITV española: neumáticos, frenado, iluminación, comportamiento en carretera y mantenimiento corriente. Este precontrol no sustituye al control técnico reglamentario realizado en un centro autorizado.",
  },
  {
    q: "¿Puede Recacor reparar antes de la ITV?",
    a: "Sí. Si hay un punto bloqueante, el taller puede proponer un presupuesto sobre los servicios realmente realizados en Le Crès: neumáticos, frenado, cambio de aceite, alineación y pequeña mecánica. No se realiza ninguna reparación sin la validación del cliente.",
  },
  {
    q: "¿Está incluido el precio de la ITV?",
    a: "Sí. El servicio incluye el precontrol gratuito, la organización del paso por el centro colaborador y la devolución del vehículo. Las reparaciones eventuales siempre van aparte y solo se realizan tras validación.",
  },
  {
    q: "¿Qué ocurre si el vehículo no está listo para la ITV?",
    a: "El taller te llama antes de cualquier intervención. Recibes un presupuesto y después decides si quieres reparar o no el vehículo antes del paso al control técnico.",
  },
  {
    q: "¿Hay que pedir cita para la ITV?",
    a: "Es preferible contactar antes para organizar la gestión del vehículo, sobre todo si la fecha de la ITV está cerca. El taller confirmará después el mejor hueco según su carga de trabajo.",
  },
];

const processSteps = [
  {
    title: "Precontrol del vehículo",
    desc: "Recacor revisa gratuitamente los puntos que más a menudo bloquean el paso al control técnico.",
    icon: ClipboardList,
  },
  {
    title: "Llamada si hay un punto bloqueante",
    desc: "Si algo impide el paso, se te llama antes de cualquier reparación.",
    icon: CircleAlert,
  },
  {
    title: "Presupuesto y reparación validada",
    desc: "Neumáticos, frenos, cambio de aceite o alineación pueden corregirse en Le Crès después de tu acuerdo.",
    icon: Wrench,
  },
  {
    title: "Paso por la ITV y devolución",
    desc: "Después, el vehículo puede presentarse en el centro colaborador y devolverse con su informe.",
    icon: ShieldCheck,
  },
];

export function ControlTecnicoEsClient() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 text-white">
        <Image
          src="/illustrations/services/controle-technique-passage-hero-20260723.png"
          alt="Vehículo en un centro de control técnico, equivalente a la ITV"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,11,18,0.88)_0%,rgba(18,25,35,0.74)_52%,rgba(26,37,49,0.54)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,201,40,0.10),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(27,79,216,0.12),transparent_20%)]" />
        <div className="pointer-events-none absolute right-4 top-[248px] z-10 hidden lg:block xl:right-8 xl:top-[244px]">
          <div className="relative w-[280px] overflow-hidden rounded-[4px] border-[5px] border-[#4f96ff] bg-[#bcd6ff] px-4 py-3 text-slate-950 shadow-[0_24px_60px_rgba(0,0,0,0.30)] xl:w-[300px]">
            <div className="absolute inset-[10px] border border-white/45" />
            <div className="absolute inset-0 opacity-[0.14]">
              <div className="absolute left-4 top-3 text-[6.2rem] font-black leading-none text-[#2f7ff3] xl:text-[6.8rem]">CT</div>
            </div>
            <div className="relative">
              <div className="text-center text-[1.3rem] font-black tracking-tight xl:text-[1.45rem]">AB-482-CT</div>
              <div className="mt-2.5 flex items-end justify-center gap-2">
                <span className="mb-1 text-[0.82rem] font-black xl:text-[0.92rem]">01/08/2028</span>
                <ShieldCheck className="mb-1 h-5 w-5 text-emerald-700 xl:h-6 xl:w-6" />
                <div className="text-[1.95rem] font-black leading-none xl:text-[2.2rem]">ITV</div>
                <span className="mb-1 rounded-[4px] bg-emerald-200 px-2 py-1 text-[0.62rem] font-black uppercase text-emerald-900 xl:text-[0.68rem]">
                  VÁLIDO
                </span>
              </div>
              <div className="mt-1 text-center text-[0.72rem] font-black uppercase tracking-[0.08em] xl:text-[0.8rem]">
                Evitar la segunda visita
              </div>

              <div className="mt-3.5 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-[0.67rem] font-bold leading-tight xl:text-[0.74rem]">
                <span>N.° de homologación:</span>
                <span>Le Crès 34920</span>
                <span>N.° de serie:</span>
                <span>VF1RECACORCT</span>
                <span>Precontrol:</span>
                <span>Gratuito</span>
                <span>Servicio:</span>
                <span>Turismo o utilitario</span>
                <span>Paso ITV:</span>
                <span>Gestionado por Recacor</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl xl:max-w-4xl">
            <Badge className="mb-6 border-white/20 bg-white/10 text-white">
              <CarFront className="mr-1 h-3 w-3" /> ITV / control técnico
            </Badge>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              ITV / control técnico
              <br />
              <span className="text-purple-glow">en Le Crès cerca de Montpellier</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              La ITV (Inspección Técnica de Vehículos) es el equivalente español del control técnico. Recacor prepara y gestiona el paso por el control técnico en Francia desde Le Crès.
            </p>
            <div className="mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3">
              {["Precontrol gratuito", "Turismo desde 87,22€", "Utilitario desde 97,02€"].map(
                (item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-[4px] border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-white"
                  >
                    <BadgeCheck className="h-4 w-4 shrink-0 text-purple-glow" />
                    {item}
                  </div>
                ),
              )}
            </div>
            <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
              <PhoneLink
                location="hero"
                serviceType="mecanique"
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[4px] bg-yellow-400 px-5 text-center text-sm font-black uppercase text-slate-950 shadow-[0_10px_30px_rgba(255,201,40,0.24)] transition hover:bg-yellow-300 whitespace-nowrap"
                showIcon
              >
                Llamar: {PHONE_DISPLAY}
              </PhoneLink>
              <DevisCtaLink
                desktopHref="#devis"
                mobileHref="#devis"
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-[4px] border border-slate-200 bg-white px-5 text-center text-sm font-black uppercase text-slate-950 shadow-[0_10px_30px_rgba(7,27,51,0.22)] transition hover:bg-slate-100 whitespace-nowrap"
              >
                <span className="text-slate-950">Solicitar mi presupuesto CT</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-950" />
              </DevisCtaLink>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="bg-background py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[4px] border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                  ITV / control técnico <span className="text-gradient-purple">con taller en el mismo sitio</span>
                </h2>
                <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    En Le Crès, Recacor puede revisar el vehículo antes del control técnico francés, equivalente a la ITV española, e identificar los puntos que suelen bloquear el paso.
                  </p>
                  <p>
                    Si detectamos un problema, el taller puede preparar un presupuesto y realizar en el mismo sitio las intervenciones habituales para turismos y utilitarios ligeros: neumáticos, frenos, cambio de aceite, alineación y pequeña mecánica según el diagnóstico del taller.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-[4px] border border-border bg-muted/30">
                <Image
                  src="/illustrations/services/controle-technique-hero-20260723.png"
                  alt="Cliente y técnico delante de un vehículo antes del control técnico"
                  width={1400}
                  height={875}
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-[4px] border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Lo que el cliente entiende rápido</p>
                <p className="mt-2 text-sm font-semibold text-foreground">El vehículo se revisa primero en el taller y, si todo está listo, se organiza después el paso por la ITV.</p>
              </div>
              <div className="rounded-[4px] border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Lo que queda claro</p>
                <p className="mt-2 text-sm font-semibold text-foreground">El precontrol es gratuito, pero no se realiza ninguna reparación sin la validación del cliente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">Tarifas <span className="text-gradient-purple">de la ITV</span></h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {pricingCards.map((card) => (
              <div key={card.title} className="rounded-[4px] border border-border bg-white p-8 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-purple-bright">{card.title}</p>
                <p className="mt-4 text-4xl font-black tracking-tight">{card.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-4xl rounded-[4px] border border-border bg-white p-6 text-center text-sm text-muted-foreground">
            El precontrol está incluido en el servicio. Si es necesaria una reparación antes del paso por la ITV, se envía un presupuesto para validación antes de cualquier intervención.
          </div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">Cómo <span className="text-gradient-purple">funciona</span></h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.title} className="rounded-[4px] border border-border bg-white p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid"><step.icon className="h-7 w-7 text-white" /></div>
                <h3 className="text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-4xl font-black tracking-tight">Lo que el taller puede <span className="text-gradient-purple">hacer antes del CT</span></h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">Si el vehículo no está listo, el taller puede orientarte enseguida sobre los puntos a corregir. Las intervenciones propuestas aquí corresponden a lo que el taller de Le Crès ya hace a diario.</p>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <ul className="space-y-4">
                {correctiveItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground"><Wrench className="mt-0.5 h-4 w-4 text-purple-bright" /><span>{item}</span></li>
                ))}
              </ul>
              <div className="mt-8 rounded-[4px] border border-border bg-muted/40 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-purple-bright">Importante</p>
                <p className="mt-2 text-sm text-muted-foreground">Si un punto impide el paso a la ITV, el taller te llama y envía un presupuesto antes de cualquier intervención.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="devis" className="scroll-mt-24 bg-muted py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight">Solicitar la <span className="text-gradient-purple">gestión del vehículo</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Indica el vehículo, la fecha límite de la ITV y los puntos ya conocidos antes de la llamada del taller.</p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 shadow-xl sm:p-8"><DevisControleTechniqueFormEs /></div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-4xl font-black tracking-tight">Preguntas <span className="text-gradient-purple">frecuentes</span></h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="group cursor-pointer rounded-[4px] border border-border bg-white p-5">
                <summary className="flex list-none items-center justify-between text-sm font-bold">{faq.q}<span className="ml-3 text-xl leading-none text-purple-bright transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

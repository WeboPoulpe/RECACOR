"use client";

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin, Globe, ShieldCheck, PhoneCall, ArrowRight, MessageCircle } from "lucide-react";
import { PhoneLink } from "@/components/phone-link";
import { DevisPlForm } from "@/components/forms/devis-pl";
import { BgParticles } from "@/components/bg-particles";
import { AvisSection } from "@/components/avis-section";
import { BreadcrumbJsonLd, ServiceJsonLd, FaqJsonLd } from "@/components/schema-jsonld";
import { PHONE_WHATSAPP_PL_ETRANGER } from "@/lib/tracking";
import Link from "next/link";

const villesCorridor = [
  "Perpignan",
  "Narbonne",
  "Béziers",
  "Montpellier",
  "Nîmes",
  "Marseille",
  "Millau",
];

const casCourante = [
  { icon: AlertTriangle, title: "Cauciuc spart pe autostradă", desc: "Pneu spart sau găurit pe A9, A75 sau pe o parcare de odihnă: venim să montăm roata de rezervă sau reparăm pe loc, dacă starea cauciucului permite." },
  { icon: Clock, title: "Pană noaptea sau în weekend", desc: "Echipa de gardă lucrează la prânz, seara, noaptea și în weekend, inclusiv pentru un șofer pe care nu l-am mai văzut niciodată." },
  { icon: MapPin, title: "Camion blocat departe de atelier", desc: "Un mecanic vulcanizator vine direct la dumneavoastră, fără să așteptați ca vehiculul să ajungă la un atelier." },
];

const etapeInterventie = [
  { title: "Sunați", desc: "Un singur număr, la care răspunde direct echipa. Spuneți poziția (kilometrul, parcarea, numele ieșirii) și tipul de vehicul." },
  { title: "Confirmăm intervenția", desc: "În funcție de oră și de tipul de pană, vă spunem cine pleacă, cu ce echipament și cât va costa, înainte de a începe." },
  { title: "Echipa intervine la fața locului", desc: "Montaj, reparație sau schimb de roată, în funcție de ce este posibil pe loc. Dacă anvelopa trebuie recanelată sau înlocuită în atelier, vă explicăm clar." },
  { title: "Plecați la drum", desc: "Factură și prestație clare, fără surprize față de prețul anunțat la telefon." },
];

const tarifeDeplasare = [
  { label: "Deplasare atelier 1-30 km", prix: "30 € fără TVA" },
  { label: "Deplasare atelier 30-60 km", prix: "50 € fără TVA" },
  { label: "Deplasare atelier 61-100 km", prix: "85 € fără TVA" },
  { label: "Peste 100 km", prix: "85 € + 1,80 €/km fără TVA" },
];

const gardaTarife = [
  { label: "Gardă prânz (12h-14h)", prix: "90 € fără TVA" },
  { label: "Gardă seara (19h-22h)", prix: "180 € fără TVA" },
  { label: "Gardă noaptea (22h-6h)", prix: "380 € fără TVA" },
  { label: "Gardă weekend", prix: "650 € fără TVA" },
];

const faqs = [
  { q: "Interveniți și noaptea sau în weekend?", a: "Da. O echipă de gardă este organizată la prânz, seara, noaptea și în weekend pentru pene de cauciuc la camioane pe traseu. Tariful de gardă depinde de intervalul orar și vă este comunicat înainte de deplasare." },
  { q: "Echipa vorbește și alte limbi în afară de română?", a: "Da. Putem prelua apelul și în franceză, engleză, italiană, poloneză sau portugheză, pentru a organiza asistența rutieră pe axa Perpignan-Montpellier-Marseille." },
  { q: "Sunt departe de un atelier Recacor, veniți totuși?", a: "Echipa se deplasează pe axa Perpignan-Narbonne-Béziers-Montpellier-Nîmes-Marseille, precum și spre Millau. Tariful de deplasare depinde de distanța reală față de atelierul cel mai apropiat; îl confirmăm la telefon după poziția dumneavoastră exactă." },
  { q: "Cât costă o intervenție?", a: "Prețul are două componente: deplasarea (30 până la 85 € fără TVA, în funcție de distanță, plus 1,80 €/km peste 100 km) și garda, dacă sunați în afara orelor normale (90 până la 650 € fără TVA, în funcție de interval). Prestația în sine (montaj, reparație) se adaugă separat, în funcție de cauciuc." },
  { q: "Anvelopa poate fi reparată pe loc sau trebuie înlocuită?", a: "Depinde de locul și mărimea găurii, precum și de starea carcasei. Echipa verifică pe loc ce este posibil: reparație, montarea roții de rezervă sau înlocuire, dacă anvelopa este prea deteriorată." },
  { q: "Nu știu exact unde mă aflu pe autostradă, ce fac?", a: "Spuneți cel mai apropiat kilometru, numele ultimei ieșiri sau parcări pe care ați trecut-o, și sensul de mers. Este suficient pentru a organiza intervenția." },
  { q: "Faceți și recanelare direct pe traseu?", a: "Recanelarea se face în atelier, nu pe marginea autostrăzii. Pe loc, echipa montează o roată sau repară pentru a vă repune în mișcare; recanelarea poate fi propusă ulterior, dacă anvelopa este eligibilă." },
  { q: "Ce trebuie să fac până sosește echipa?", a: "Porniți avariile, scoateți triunghiul și vesta dacă puteți în siguranță, și îndepărtați-vă de trafic. Țineți telefonul aproape: vă sunăm înapoi pentru a confirma ora sosirii." },
];

export function DepannageRoClient() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Acasă", url: "https://www.recacor.fr" },
        { name: "Vulcanizare camion, asistență rutieră", url: "https://www.recacor.fr/ro/depannage-poids-lourd-urgence" },
      ]} />
      <ServiceJsonLd
        name="Vulcanizare camion pe traseu și asistență rutieră"
        serviceType="Asistență cauciucuri camion pe traseu"
        description="Vulcanizare camion și asistență rutieră 24/7 pe axa Perpignan-Montpellier-Marseille: cauciuc spart, pană, intervenție la fața locului."
        url="https://www.recacor.fr/ro/depannage-poids-lourd-urgence"
      />
      <FaqJsonLd items={faqs} id="depannage-urgence-ro" />

      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-20 overflow-hidden">
        <img
          src="/hero-generated/depannage-pl-master.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[62%_68%]"
        />
        <div className="absolute inset-0 hero-overlay-image-strong" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge className="bg-white/10 text-white border-white/20 mb-4 sm:mb-6">
            <AlertTriangle className="h-3 w-3 mr-1" /> Asistență pe traseu
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] sm:leading-[1.1] max-w-3xl">
            Vulcanizare camion{" "}
            <span className="text-purple-glow">24h/24, 7/7</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-white/90 max-w-xl text-base sm:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            O echipă vine direct la dumneavoastră pentru un cauciuc spart sau
            defect, între Perpignan, Marseille și Millau.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-2xl">
            <a
              href={`https://wa.me/${PHONE_WHATSAPP_PL_ETRANGER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 sm:py-3 text-sm font-bold text-white transition-colors hover:bg-[#1ebe5d] whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <PhoneLink location="hero" serviceType="pl" className="flex-1 recacor-btn-primary whitespace-nowrap py-2.5 sm:py-3" showIcon>
              Sunați acum
            </PhoneLink>
          </div>
          <p className="mt-2.5 text-xs sm:text-sm text-white/60">
            Pe WhatsApp vă răspunde Rubén; la telefon, atelierul Recacor din Le Crès.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            {villesCorridor.map((ville) => (
              <span key={ville} className="rounded-[4px] border border-white/15 bg-white/10 px-3 py-1.5">
                {ville}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/80">
            <Globe className="h-4 w-4 text-purple-glow" />
            Română · Français · English · Italiano · Polski · Português
          </div>
          <a href="#devis" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white">
            Cerere neurgentă <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight text-center mb-4">
            Penele pe care le rezolvăm <span className="text-gradient-purple">cel mai des</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Un camion care pierde o cauciuc blochează toată cursa. Ideea este simplă:
            mai mulți mecanici vulcanizatori intervin direct la fața locului, fiecare
            cu camionul lui echipat.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {casCourante.map((c) => (
              <div key={c.title} className="rounded-[4px] border border-border bg-white p-8">
                <div className="w-14 h-14 rounded-[4px] bg-gradient-to-br from-purple-bright to-purple-mid flex items-center justify-center mb-5">
                  <c.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black tracking-tight mb-4">
            Ce se întâmplă <span className="text-gradient-purple">când sunați</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10">
            Fără centrală telefonică, fără așteptare: persoana care răspunde
            organizează direct intervenția.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {etapeInterventie.map((e, i) => (
              <div key={e.title} className="rounded-[4px] border border-border bg-white p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-purple-bright text-white font-black text-sm">{i + 1}</span>
                  <h3 className="text-lg font-black">{e.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black tracking-tight">
              O echipă organizată pentru <span className="text-gradient-purple">axa Perpignan-Marseille</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Recacor se bazează pe atelierele din Le Crès, Servian și Vergèze
              pentru a acoperi autostrada dintre Perpignan și Marseille, precum
              și legătura spre Millau. Mai mulți mecanici vulcanizatori sunt
              repartizați pe acest traseu, fiecare cu camionul lui echipat,
              gata să intervină fără ca un singur vehicul să facă tot drumul.
              Este unul dintre cele mai circulate puncte de trecere pentru
              camioane spre Spania, iar o pană de cauciuc acolo nu poate
              aștepta până a doua zi.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              În funcție de poziția dumneavoastră în momentul apelului, echipa
              cea mai apropiată se deplasează direct. Spuneți pur și simplu
              orașul cel mai apropiat sau kilometrul pentru a organiza
              intervenția.
            </p>
          </div>

          <div className="mt-10 rounded-[4px] border border-border bg-white p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="h-5 w-5 text-purple-bright" />
              <h2 className="text-2xl font-black tracking-tight">Tarife de deplasare</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Prețuri fără TVA, la ore normale, calculate de la atelierul cel
              mai apropiat de poziția dumneavoastră. TVA se adaugă la cota în
              vigoare. Tariful exact vă este confirmat la telefon înainte de
              intervenție, după poziția reală.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tarifeDeplasare.map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-[4px] border border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="text-sm font-black text-purple-bright">{t.prix}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Gardă în afara orelor normale (fără km și prețul cauciucurilor)
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {gardaTarife.map((t) => (
                <div key={t.label} className="flex items-center justify-between rounded-[4px] border border-border bg-muted/30 px-4 py-3">
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span className="text-sm font-black text-purple-bright">{t.prix}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-[4px] border border-border bg-white p-8">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-purple-bright" />
                <h2 className="text-xl font-black tracking-tight">Vorbim mai multe limbi</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mulți șoferi care trec pe acest traseu vin din străinătate.
                Echipa noastră poate vorbi română, franceză, engleză, italiană,
                poloneză sau portugheză pentru a organiza o intervenție, fără
                să întârzie preluarea.
              </p>
            </div>
            <div className="rounded-[4px] border border-border bg-white p-8">
              <h2 className="text-xl font-black tracking-tight mb-4">După intervenție</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dacă anvelopa reparată pe traseu mai poate fi recanelată în loc
                să fie înlocuită cu una nouă, echipa vă propune asta la
                următoarea trecere prin atelier. Recanelarea se decide
                întotdeauna în atelier, niciodată pe marginea autostrăzii.
              </p>
              <Link href="/services/recreusage" className="mt-4 inline-flex text-sm font-bold text-purple-bright hover:underline">
                Vezi serviciul de recanelare
              </Link>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/pneus-utilitaires-pl" className="text-purple-bright hover:underline">Cauciucuri camion</Link>
            <Link href="/services/recreusage" className="text-purple-bright hover:underline">Recanelare</Link>
            <Link href="/depannage-poids-lourd-urgence" className="text-purple-bright hover:underline">Page en français</Link>
            <Link href="/contact" className="text-purple-bright hover:underline">Contact Recacor</Link>
          </div>
        </div>
      </section>

      <section id="devis" className="relative py-24 bg-muted overflow-hidden scroll-mt-24">
        <BgParticles />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-[4px] border border-purple-bright/30 bg-purple-bright/10 px-4 py-2 text-sm font-bold text-purple-deep mb-4">
              <PhoneCall className="h-4 w-4" />
              Pană în curs? Sunați direct
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Cerere <span className="text-gradient-purple">neurgentă</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Un expert vă recontactează în 2h, în zilele lucrătoare</p>
          </div>
          <div className="rounded-[4px] border border-border bg-white p-6 sm:p-8 shadow-xl">
            <DevisPlForm />
          </div>
        </div>
      </section>

      <AvisSection />

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-black tracking-tight mb-12">Întrebări frecvente</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-[4px] border border-border bg-white p-5 cursor-pointer">
                <summary className="font-bold text-sm list-none flex items-center justify-between">
                  {faq.q}
                  <span className="text-purple-bright ml-3 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solicitud recibida | Recacor",
  description: "Confirmación de solicitud de control técnico Recacor.",
  robots: { index: false, follow: false },
};

export default function GraciasControlTecnicoEsPage() {
  return (
    <section className="min-h-[70vh] bg-[linear-gradient(180deg,#061A31_0%,#2E2D8A_55%,#F6F7FB_100%)] px-4 pb-24 pt-36 text-center text-white">
      <div className="mx-auto max-w-2xl rounded-[4px] bg-white p-8 text-slate-950 shadow-xl sm:p-12">
        <p className="text-sm font-black uppercase tracking-[0.12em] text-purple-bright">Recacor Le Crès</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">Solicitud recibida</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Gracias. El taller revisará tu solicitud y te contactará para confirmar la gestión del control técnico.</p>
        <Link href="/es/servicios/control-tecnico-recacor" className="mt-8 inline-flex rounded-[4px] bg-yellow-400 px-6 py-3 text-sm font-black uppercase text-slate-950 transition hover:bg-yellow-300">Volver a la página</Link>
      </div>
    </section>
  );
}

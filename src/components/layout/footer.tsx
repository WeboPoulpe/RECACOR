import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-purple-deep">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">RECACOR</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Spécialiste pneumatiques VL, poids lourd, agricole et recreusage à
              Montpellier — Le Crès. 60 ans d&apos;expertise.
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              {Array.from({ length: SITE_CONFIG.rating.stars }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-purple-glow text-purple-glow" />
              ))}
              <span className="ml-2 text-sm font-bold text-white">{SITE_CONFIG.rating.value}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Accueil", href: "/" },
                { name: "Notre garage", href: "/contact" },
                { name: "Pneus VL & mécanique", href: "/particulier" },
                { name: "Pneus PL", href: "/pneus-utilitaires-pl" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-white/50">Pneus VL & mécanique</li>
              <li className="text-sm text-white/50">Pneus PL, agricole & industriel</li>
              <li className="text-sm text-white/50">Recreusage</li>
              <li className="text-sm text-white/50">Assistance PL Hérault</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href={SITE_CONFIG.phone.href}
                className="phone-link flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 text-purple-glow shrink-0" />
                {SITE_CONFIG.phone.display}
              </a>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Mail className="h-4 w-4 text-purple-glow shrink-0" />
                {SITE_CONFIG.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-purple-glow shrink-0" />
                {SITE_CONFIG.garage.city}
              </div>
              <div className="flex items-start gap-3 text-sm text-white/50">
                <Clock className="h-4 w-4 text-purple-glow shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.hours.weekday}
                  <br />
                  {SITE_CONFIG.hours.saturday}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} RECACOR. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="#"
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-white/30">
            Maquette générée par{" "}
            <a
              href="https://webomax.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-glow hover:text-white transition-colors font-medium"
            >
              WeboMax
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

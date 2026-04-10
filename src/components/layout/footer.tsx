import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-purple-deep">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">RECACOR</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Leader en maintenance de pneumatiques pour flottes et particuliers
              depuis 1989.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Accueil", href: "/" },
                { name: "Nos centres", href: "/nos-centres" },
                { name: "Poids lourd", href: "/poids-lourd" },
                { name: "Particulier", href: "/particulier" },
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
              <li className="text-sm text-white/50">Maintenance pneumatiques</li>
              <li className="text-sm text-white/50">Gestion de flottes</li>
              <li className="text-sm text-white/50">Dépannage sur site</li>
              <li className="text-sm text-white/50">Contrôle & expertise</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Phone className="h-4 w-4 text-purple-glow shrink-0" />
                05 XX XX XX XX
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <Mail className="h-4 w-4 text-purple-glow shrink-0" />
                contact@recacor.fr
              </div>
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-purple-glow shrink-0" />
                France & Europe
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
      </div>
    </footer>
  );
}

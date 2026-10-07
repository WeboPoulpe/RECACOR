import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PL_JEROME_CONTACT, type PlCommercialContact } from "@/lib/pl-commercial-contact";

export function PlWhatsappButton({ className, id, contact = PL_JEROME_CONTACT }: { className?: string; id?: string; contact?: PlCommercialContact }) {
  return (
    <a
      id={id}
      href={contact.whatsappUrl}
      aria-label={`Contacter ${contact.name} sur WhatsApp`}
      className={cn("inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#087d3e] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#066332] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600", className)}
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
      WhatsApp
    </a>
  );
}

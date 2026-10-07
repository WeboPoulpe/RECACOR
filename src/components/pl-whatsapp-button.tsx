import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PL_JEROME_CONTACT } from "@/lib/pl-commercial-contact";

export function PlWhatsappButton({ className, id }: { className?: string; id?: string }) {
  return (
    <a
      id={id}
      href={PL_JEROME_CONTACT.whatsappUrl}
      aria-label="Contacter Jérôme sur WhatsApp"
      className={cn("inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#087d3e] px-5 py-3 text-sm font-black text-white transition-colors hover:bg-[#066332] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600", className)}
    >
      <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
      WhatsApp
    </a>
  );
}

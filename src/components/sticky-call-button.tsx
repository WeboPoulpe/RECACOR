"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { PHONE_NUMBER, pushPhoneClick } from "@/lib/tracking";

export function StickyCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          id="sticky-call-btn"
          href={`tel:${PHONE_NUMBER}`}
          onClick={() => pushPhoneClick("sticky")}
          className="phone-link lg:hidden fixed bottom-4 left-4 right-4 z-[100] flex items-center justify-center gap-2 rounded-full bg-purple-bright text-white font-bold py-4 shadow-[0_8px_30px_rgba(109,40,217,0.4)]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Phone className="h-5 w-5" />
          Appeler maintenant
        </motion.a>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, Car, ChevronDown, Snowflake, Truck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOME_FAQ_CATEGORIES } from "@/data/home-faq";

const ICONS = { car: Car, wrench: Wrench, snowflake: Snowflake, truck: Truck } as const;

export function HomeFaqSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "0-0": true });

  return (
    <section className="bg-[var(--recacor-paper)] py-20">
      <div className="recacor-shell">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="recacor-eyebrow">Questions fréquentes</p>
            <h2 className="recacor-title mt-4">Les réponses utiles avant d&apos;appeler.</h2>
            <div className="mt-8 grid gap-2">
              {HOME_FAQ_CATEGORIES.map((cat, index) => {
                const Icon = ICONS[cat.icon];
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      "flex items-center justify-between border p-4 text-left transition",
                      activeTab === index
                        ? "border-[var(--recacor-night)] bg-[var(--recacor-night)] text-white"
                        : "border-border bg-white text-[var(--recacor-ink)] hover:border-blue-700",
                    )}
                  >
                    <span className="flex items-center gap-3 text-sm font-black uppercase">
                      <Icon className={cn("h-5 w-5", activeTab === index ? "text-yellow-400" : "text-blue-700")} />
                      {cat.label}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {HOME_FAQ_CATEGORIES[activeTab].items.map((item, index) => {
              const key = `${activeTab}-${index}`;
              const isOpen = !!openItems[key];
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpenItems((prev) => ({ ...prev, [key]: !isOpen }))}
                  className="w-full border border-border bg-white p-5 text-left transition hover:border-blue-700"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-black leading-snug text-[var(--recacor-ink)]">{item.q}</span>
                    <ChevronDown className={cn("mt-0.5 h-5 w-5 shrink-0 text-blue-700 transition", isOpen && "rotate-180")} />
                  </span>
                  {isOpen && <span className="mt-4 block text-sm leading-7 text-muted-foreground">{item.a}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

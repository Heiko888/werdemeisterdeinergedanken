"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Plus } from "@/components/ui/Icon";
import { faqs as defaultFaqs, type Faq as FaqType } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Faq({
  items = defaultFaqs,
  eyebrow = "FAQ",
  title = "Noch Fragen? Hier ein paar Antworten",
}: {
  items?: FaqType[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 sm:py-28">
      <Container size="narrow">
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className="mt-12 flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors",
                  isOpen
                    ? "border-brand-400/40 bg-navy-800/60"
                    : "border-white/10 bg-navy-800/30",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg text-brand-200 transition-transform duration-300",
                      isOpen && "rotate-45 border-brand-400/50 text-cosmic-cyan",
                    )}
                  >
                    <Plus />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-mist-200/75">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

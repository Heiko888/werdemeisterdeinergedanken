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
    <section className="relative border-t border-ink/10 py-16 sm:py-32">
      <Container size="narrow">
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className="mt-12 flex flex-col">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className="border-t border-ink/10 last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "font-display text-lg transition-colors",
                      isOpen ? "text-ink" : "text-ink/80",
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-accent/50 text-accent"
                        : "border-ink/15 text-ink-muted",
                    )}
                  >
                    <Plus />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-ink-mid">
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

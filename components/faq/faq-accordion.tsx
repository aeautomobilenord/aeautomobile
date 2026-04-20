"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={cn(
              "border-b border-slate-200 last:border-b-0",
              isOpen && "bg-slate-50"
            )}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
            >
              <span className="pr-3 text-sm font-bold leading-6 text-slate-950 md:text-base">
                {item.question}
              </span>

              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200",
                  isOpen && "rotate-180 text-sky-600"
                )}
              />
            </button>

            {isOpen ? (
              <div className="px-5 pb-5">
                <p className="max-w-3xl text-sm leading-7 text-slate-600">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}

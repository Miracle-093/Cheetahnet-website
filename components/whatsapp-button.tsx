"use client";

import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/lib/contact";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with CheetahNet on WhatsApp (${WHATSAPP_DISPLAY})`}
      onClick={() => track("whatsapp_clicked", { source: "floating_widget" })}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-[#0e0c08]/90 py-2.5 pl-3 pr-5 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,0,0,.55)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="relative grid size-10 place-items-center rounded-full bg-[#25D366] text-black">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" aria-hidden="true" />
        <MessageCircle className="relative size-5 fill-current" />
      </span>
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-[.16em] text-[#ffb200]">24/7 Support</span>
        <span>Chat on WhatsApp</span>
      </span>
    </a>
  );
}

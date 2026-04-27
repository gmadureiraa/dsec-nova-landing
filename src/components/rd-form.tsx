"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   RD STATION FORM — embed nativo (sem UI custom)
   Snippet oficial do RD:
     <div id="forms-curso-gratis-...">
     <script src="https://...rdstation-forms.min.js">
     new RDStationForms('forms-...', 'null').createForm()
   ═══════════════════════════════════════════════════════════════════ */

const RD_FORM_ID = "forms-curso-gratis-9520162929ac4a559ebb";
const RD_SCRIPT_SRC =
  "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";

declare global {
  interface Window {
    RDStationForms?: new (
      formId: string,
      token: string,
    ) => { createForm: () => void };
  }
}

function ensureRdForm() {
  if (typeof window === "undefined") return;
  if (!window.RDStationForms) return;
  const host = document.getElementById(RD_FORM_ID);
  if (!host) return;
  if (host.querySelector("form, iframe")) return;
  try {
    new window.RDStationForms(RD_FORM_ID, "null").createForm();
  } catch (err) {
    console.error("[RD] createForm threw", err);
  }
}

export function RDForm({ className }: { className?: string }) {
  const created = useRef(false);

  useEffect(() => {
    if (created.current) return;
    created.current = true;
    // Tenta criar imediato (caso o script já esteja carregado por outra
    // instância). Se não estiver, o onLoad do <Script> chama de novo.
    ensureRdForm();
  }, []);

  return (
    <>
      <Script
        src={RD_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={ensureRdForm}
      />
      <div role="main" id={RD_FORM_ID} className={className} />
    </>
  );
}

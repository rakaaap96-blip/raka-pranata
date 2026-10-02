import { useCallback, useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { LEGAL_CONTACT, LEGAL_DOCS } from '../../content/legal';

interface LegalModalProps {
  open: boolean;
  initialDocId: string;
  onClose: () => void;
}

export default function LegalModal({ open, initialDocId, onClose }: LegalModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState(initialDocId);

  const activeIndex = Math.max(0, LEGAL_DOCS.findIndex((d) => d.id === activeId));
  const doc = LEGAL_DOCS[activeIndex];

  useEffect(() => {
    setActiveId(initialDocId);
  }, [initialDocId]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      restoreFocusRef.current = document.activeElement as HTMLElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // The <dialog> element gives focus trapping, Escape handling and an inert
  // background for free, but it does not stop the page behind it from
  // scrolling, and it does not hand focus back to the trigger.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Focus has to be restored after the dialog has actually closed. Doing it in
  // the effect cleanup above runs while showModal() is still active, and the
  // browser's modal focus trap swallows the call.
  const handleNativeClose = () => {
    restoreFocusRef.current?.focus();
    onClose();
  };

  const focusTab = useCallback((index: number) => {
    const next = (index + LEGAL_DOCS.length) % LEGAL_DOCS.length;
    setActiveId(LEGAL_DOCS[next].id);
    tabRefs.current[next]?.focus();
  }, []);

  const handleTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTab(index + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(LEGAL_DOCS.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleNativeClose}
      onClick={(event) => {
        // Clicking the backdrop lands on the dialog element itself, because the
        // dialog fills the viewport but its children do not.
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby="legal-modal-title"
      className="legal-dialog w-[min(56rem,calc(100vw-2rem))] max-h-[min(85dvh,48rem)] m-auto p-0 bg-transparent border-0 text-[#ffffea] backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="cyber-card flex max-h-[min(85dvh,48rem)] flex-col rounded-lg border border-[#d4af37]/30 bg-[#0a0a0a] shadow-2xl shadow-black/60">
        <div className="flex items-start justify-between gap-4 border-b border-[#d4af37]/20 p-5 md:p-6">
          <div>
            <h2 id="legal-modal-title" className="font-display text-lg tracking-[0.15em] text-[#d4af37] md:text-xl">
              {doc.title.toUpperCase()}
            </h2>
            <p className="mt-1 text-xs text-[#ffffea]/50">Terakhir diperbarui {doc.updated}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded border border-[#d4af37]/30 text-[#ffffea]/70 transition-colors duration-300 hover:border-[#d4af37]/60 hover:text-[#d4af37]"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div role="tablist" aria-label="Dokumen hukum" className="flex gap-1 border-b border-[#d4af37]/20 p-3 md:p-4">
          {LEGAL_DOCS.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`legal-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="legal-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`min-h-11 flex-1 rounded px-3 text-xs transition-colors duration-300 md:text-sm ${
                  isActive
                    ? 'bg-[#d4af37]/15 text-[#d4af37] font-semibold'
                    : 'text-[#ffffea]/60 hover:bg-[#d4af37]/5 hover:text-[#ffffea]/90'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          ref={panelRef}
          id="legal-panel"
          role="tabpanel"
          aria-labelledby={`legal-tab-${doc.id}`}
          tabIndex={0}
          className="flex-1 overflow-y-auto overscroll-contain p-5 text-sm leading-relaxed text-[#ffffea]/75 md:p-6"
        >
          <p className="mb-6 border-l-2 border-[#d4af37]/50 pl-4 text-[#ffffea]/85 italic">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.heading} className="mb-6 last:mb-0">
              <h3 className="mb-2 font-display text-sm tracking-[0.12em] text-[#d4af37] uppercase">{section.heading}</h3>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-8 rounded border border-[#d4af37]/20 bg-[#d4af37]/5 p-4 text-xs">
            <p className="text-[#ffffea]/85">
              Ada pertanyaan? Hubungi{' '}
              <a href={'mailto:' + LEGAL_CONTACT.email} className="text-[#d4af37] underline hover:text-[#e6c65a]">
                {LEGAL_CONTACT.email}
              </a>{' '}
              atau {LEGAL_CONTACT.phone}.
            </p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
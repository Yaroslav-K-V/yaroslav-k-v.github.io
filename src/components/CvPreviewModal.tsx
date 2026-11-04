import React, { useEffect, useRef, useState } from "react";
import { contactsData } from "../data/contacts";
import { useLanguage } from "../i18n/LanguageContext";

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvPreviewModal: React.FC<CvPreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // Sync imperative <dialog> showModal() / close() with React state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Fallback for browsers that do not yet support closedby="any"
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleLightDismissFallback = (event: MouseEvent) => {
      if (!("closedBy" in HTMLDialogElement.prototype)) {
        if (event.target === dialog) {
          const rect = dialog.getBoundingClientRect();
          const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!isInDialog) {
            dialog.close();
          }
        }
      }
    };

    dialog.addEventListener("click", handleLightDismissFallback);
    return () => {
      dialog.removeEventListener("click", handleLightDismissFallback);
    };
  }, []);

  const handleCopyCvLink = async () => {
    const url = `${window.location.origin}${contactsData.resumeUrl}`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cv-modal-title"
      {...({ closedby: "any" } as React.HTMLAttributes<HTMLDialogElement>)}
      onClose={onClose}
      className="m-auto w-[calc(100%-1.5rem)] max-w-4xl h-[88vh] rounded-panel bg-surface text-bone border border-stroke shadow-2xl p-0 backdrop:bg-canvas/80 backdrop:backdrop-blur-md open:flex open:flex-col overflow-hidden"
    >
      {/* Top Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-stroke bg-canvas/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-signal" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
              {t.cvModal.eyebrow}
            </span>
            <span className="px-2 py-0.5 rounded-control bg-surface border border-stroke font-mono text-[10px] text-granite">
              {t.cvModal.updatedBadge}
            </span>
          </div>
          <h2
            id="cv-modal-title"
            className="text-base sm:text-lg font-bold text-chalk tracking-tight mt-0.5"
          >
            {t.cvModal.title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCvLink}
            data-umami-event="modal-copy-cv-link"
            className="px-3 py-1.5 rounded-control border border-stroke bg-surface/80 hover:border-graphite text-xs font-mono text-stone hover:text-bone transition-colors"
          >
            {linkCopied ? t.cvModal.linkCopied : t.cvModal.copyLink}
          </button>
          <a
            href={contactsData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="modal-open-cv-tab"
            className="px-3 py-1.5 rounded-control border border-stroke bg-surface/80 hover:border-graphite text-xs font-mono text-stone hover:text-bone transition-colors"
          >
            {t.cvModal.openNewTab} ↗
          </a>
          <a
            href={contactsData.resumeUrl}
            download="Yaroslav_Krupoder_CV.pdf"
            data-umami-event="modal-download-cv"
            className="px-3.5 py-1.5 rounded-control bg-bone hover:bg-chalk text-canvas text-xs font-semibold transition-colors"
          >
            {t.cvModal.downloadPdf}
          </a>
          <form method="dialog">
            <button
              type="submit"
              autoFocus
              className="px-2.5 py-1.5 rounded-control border border-stroke bg-canvas hover:border-graphite font-mono text-xs text-stone hover:text-bone transition-colors"
              aria-label={t.cvModal.close}
            >
              [Esc]
            </button>
          </form>
        </div>
      </div>

      {/* Executive Quick-Facts Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-4 sm:px-6 py-2.5 border-b border-stroke bg-surface/60 text-xs font-mono text-stone">
        <div className="truncate">
          <span className="text-granite">01 · </span>
          {t.cvModal.summaryExperience}
        </div>
        <div className="truncate">
          <span className="text-granite">02 · </span>
          {t.cvModal.summaryEducation}
        </div>
        <div className="truncate">
          <span className="text-granite">03 · </span>
          {t.cvModal.summaryStack}
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="flex-1 bg-canvas p-2 sm:p-3 overflow-hidden flex flex-col">
        {isOpen && (
          <iframe
            src={`${contactsData.resumeUrl}#view=FitH`}
            title={t.cvModal.title}
            className="w-full flex-1 rounded-control border border-stroke bg-canvas"
          />
        )}
      </div>
    </dialog>
  );
};

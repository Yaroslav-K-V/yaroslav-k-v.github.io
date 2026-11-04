import React, { useEffect, useMemo, useRef, useState } from "react";
import { PageRoute, Project } from "../types";
import { contactsData } from "../data/contacts";
import { getLocalizedProjects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/translations";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
  onSelectProject: (project: Project) => void;
  onOpenCvPreview: () => void;
  animationsEnabled: boolean;
  onToggleAnimations: () => void;
}

interface CommandItem {
  id: string;
  group: "actions" | "projects" | "navigation" | "preferences";
  title: string;
  subtitle?: string;
  badge?: string;
  shortcut?: string;
  keywords: string;
  onSelect: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectProject,
  onOpenCvPreview,
  animationsEnabled,
  onToggleAnimations,
}) => {
  const { locale, setLocale, t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  const localizedProjects = useMemo(
    () => getLocalizedProjects(locale),
    [locale],
  );

  // Sync imperative <dialog> showModal() / close() with React state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
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

  const items: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      {
        id: "action-preview-cv",
        group: "actions",
        title: t.cmdPalette.actionPreviewCv,
        subtitle: t.cmdPalette.actionPreviewCvSub,
        badge: "PDF",
        shortcut: "↵",
        keywords: "cv resume pdf preview quick look резюме автобиография",
        onSelect: () => {
          onClose();
          onOpenCvPreview();
        },
      },
      {
        id: "action-download-cv",
        group: "actions",
        title: t.cmdPalette.actionDownloadCv,
        subtitle: t.cmdPalette.actionDownloadCvSub,
        badge: "166 KB",
        keywords: "download cv resume pdf save завантажити изтегли",
        onSelect: () => {
          const link = document.createElement("a");
          link.href = contactsData.resumeUrl;
          link.download = "Yaroslav_Krupoder_CV.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          onClose();
        },
      },
    ];

    if (contactsData.bookingUrl) {
      list.push({
        id: "action-book-call",
        group: "actions",
        title: t.cmdPalette.actionBookCall,
        subtitle: t.cmdPalette.actionBookCallSub,
        badge: "15m",
        keywords: "book call calendar meet zoom interview дзвінок разговор",
        onSelect: () => {
          window.open(contactsData.bookingUrl, "_blank", "noopener,noreferrer");
          onClose();
        },
      });
    }

    list.push(
      {
        id: "action-copy-email",
        group: "actions",
        title: emailCopied
          ? t.cmdPalette.actionEmailCopied
          : t.cmdPalette.actionCopyEmail,
        subtitle: contactsData.email,
        badge: emailCopied ? "✓" : "Copy",
        keywords: `email copy mail ${contactsData.email} пошта имейл`,
        onSelect: () => {
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(contactsData.email).catch(() => {});
          }
          setEmailCopied(true);
          window.setTimeout(() => {
            setEmailCopied(false);
            onClose();
          }, 550);
        },
      },
      {
        id: "action-telegram",
        group: "actions",
        title: t.cmdPalette.actionOpenTelegram,
        subtitle: contactsData.telegramDisplay,
        badge: "TG",
        keywords: "telegram chat message телеграм",
        onSelect: () => {
          window.open(contactsData.telegram, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "action-github",
        group: "actions",
        title: t.cmdPalette.actionOpenGithub,
        subtitle: contactsData.githubDisplay,
        badge: "Code",
        keywords: "github git code repo репозиторій",
        onSelect: () => {
          window.open(contactsData.github, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "action-linkedin",
        group: "actions",
        title: t.cmdPalette.actionOpenLinkedin,
        subtitle: contactsData.linkedinDisplay,
        badge: "IN",
        keywords: "linkedin network profile профіль",
        onSelect: () => {
          window.open(contactsData.linkedin, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
    );

    localizedProjects.forEach((project, idx) => {
      list.push({
        id: `project-${project.slug}`,
        group: "projects",
        title: project.title,
        subtitle: project.subtitle,
        badge: String(idx + 1).padStart(2, "0"),
        keywords: `${project.title} ${project.subtitle} ${project.tech.join(" ")} project dossier`,
        onSelect: () => {
          onClose();
          onSelectProject(project);
        },
      });
    });

    const navRoutes: { route: PageRoute; label: string; sub: string }[] = [
      { route: "welcome", label: t.nav.welcome, sub: "/" },
      { route: "about", label: t.nav.about, sub: "/about" },
      { route: "projects", label: t.nav.projects, sub: "/projects" },
      { route: "contacts", label: t.nav.contacts, sub: "/contacts" },
    ];

    navRoutes.forEach((item) => {
      list.push({
        id: `nav-${item.route}`,
        group: "navigation",
        title: item.label,
        subtitle: item.sub,
        badge: "Go",
        keywords: `navigate page ${item.label} ${item.route}`,
        onSelect: () => {
          onClose();
          onNavigate(item.route);
        },
      });
    });

    (["en", "ua", "bg"] as Locale[]).forEach((loc) => {
      if (loc !== locale) {
        list.push({
          id: `pref-lang-${loc}`,
          group: "preferences",
          title: `${t.cmdPalette.prefLanguage}: ${loc.toUpperCase()}`,
          subtitle:
            loc === "en"
              ? "English"
              : loc === "ua"
                ? "Українська"
                : "Български",
          badge: loc.toUpperCase(),
          keywords: `language locale translate ${loc} мова език`,
          onSelect: () => {
            setLocale(loc);
            onClose();
          },
        });
      }
    });

    list.push({
      id: "pref-animations",
      group: "preferences",
      title: animationsEnabled ? t.nav.animationsOn : t.nav.animationsOff,
      subtitle: "Toggle UI motion & background canvas",
      badge: animationsEnabled ? "ON" : "OFF",
      keywords: "animations motion toggle ефекти анімації",
      onSelect: () => {
        onToggleAnimations();
        onClose();
      },
    });

    return list;
  }, [
    t,
    localizedProjects,
    locale,
    setLocale,
    animationsEnabled,
    onToggleAnimations,
    onClose,
    onNavigate,
    onSelectProject,
    onOpenCvPreview,
    emailCopied,
  ]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.keywords.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredItems.length > 0) {
        setActiveIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
        );
      }
    } else if (e.key === "Enter" && filteredItems[activeIndex]) {
      e.preventDefault();
      filteredItems[activeIndex].onSelect();
    }
  };

  const groupLabels: Record<CommandItem["group"], string> = {
    actions: t.cmdPalette.groupActions,
    projects: t.cmdPalette.groupProjects,
    navigation: t.cmdPalette.groupNavigation,
    preferences: t.cmdPalette.groupPreferences,
  };

  const groupsOrder: CommandItem["group"][] = [
    "actions",
    "projects",
    "navigation",
    "preferences",
  ];

  // Build flat index lookup for keyboard highlight
  let runningIdx = -1;

  return (
    <dialog
      ref={dialogRef}
      aria-label={t.nav.commandMenu}
      {...({ closedby: "any" } as React.HTMLAttributes<HTMLDialogElement>)}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      className="m-auto mt-[10vh] w-[calc(100%-1.5rem)] max-w-xl rounded-panel bg-surface text-bone border border-stroke shadow-2xl p-0 backdrop:bg-canvas/75 backdrop:backdrop-blur-md open:flex open:flex-col overflow-hidden"
    >
      {/* Search Bar Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stroke bg-canvas/60">
        <svg
          className="w-4 h-4 text-granite shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.cmdPalette.placeholder}
          autoFocus
          className="w-full bg-transparent text-sm text-bone placeholder:text-granite focus:outline-none"
        />
        <form method="dialog">
          <button
            type="submit"
            className="px-2 py-0.5 rounded-control bg-surface border border-stroke font-mono text-[11px] text-granite hover:text-bone hover:border-graphite transition-colors"
          >
            Esc
          </button>
        </form>
      </div>

      {/* Results List */}
      <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="py-10 text-center text-sm text-granite font-mono">
            {t.cmdPalette.noResults}
          </div>
        ) : (
          groupsOrder.map((groupKey) => {
            const groupItems = filteredItems.filter(
              (item) => item.group === groupKey,
            );
            if (groupItems.length === 0) return null;

            return (
              <div key={groupKey} className="space-y-1">
                <div className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-granite">
                  {groupLabels[groupKey]}
                </div>
                {groupItems.map((item) => {
                  runningIdx += 1;
                  const itemIndex = runningIdx;
                  const isSelected = itemIndex === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(itemIndex)}
                      onClick={item.onSelect}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-control text-left transition-colors ${
                        isSelected
                          ? "bg-bone/[0.08] text-chalk border border-bone/20"
                          : "text-bone hover:bg-bone/[0.04] border border-transparent"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-xs text-stone truncate mt-0.5">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                      {item.badge && (
                        <span
                          className={`shrink-0 px-2 py-0.5 rounded-control font-mono text-[11px] border ${
                            isSelected
                              ? "bg-signal/15 text-signal border-signal/35"
                              : "bg-canvas/70 text-granite border-stroke"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Hint */}
      <div className="px-4 py-2.5 border-t border-stroke bg-canvas/70 flex items-center justify-between text-[11px] font-mono text-granite">
        <span>{t.cmdPalette.footerHint}</span>
        <span className="text-stone">⌘K</span>
      </div>
    </dialog>
  );
};

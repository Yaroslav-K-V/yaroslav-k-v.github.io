import React, { useState, useEffect, useRef } from "react";
import { PageRoute } from "../types";
import { contactsData } from "../data/contacts";
import {
  FileText,
  Menu,
  X,
  ExternalLink,
  Eye,
  EyeOff,
  Mail,
  Check,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Locale } from "../i18n/translations";

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  animationsEnabled?: boolean;
  onToggleAnimations?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenCvPreview?: () => void;
}

const LANGUAGES: { code: Locale; label: string; full: string }[] = [
  { code: "en", label: "EN", full: "English" },
  { code: "ua", label: "UA", full: "Українська" },
  { code: "bg", label: "BG", full: "Български" },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  animationsEnabled = true,
  onToggleAnimations,
  onOpenCommandPalette,
  onOpenCvPreview,
}) => {
  const { locale, setLocale, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const prevOpenRef = useRef(false);

  useEffect(() => {
    if (!langOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [langOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactsData.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback in case clipboard API fails
      const textarea = document.createElement("textarea");
      textarea.value = contactsData.email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // Overlay mode: lock background scroll + focus trap + close on Escape.
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";

      // Move focus to first navigation item on open
      const timer = requestAnimationFrame(() => {
        const menuEl = mobileMenuRef.current;
        if (!menuEl) return;
        const focusable = menuEl.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      });

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
          return;
        }

        if (e.key === "Tab") {
          const menuEl = mobileMenuRef.current;
          if (!menuEl) return;
          const focusable = Array.from(
            menuEl.querySelectorAll<HTMLElement>(
              'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          );
          if (focusable.length === 0) return;

          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (
              document.activeElement === firstElement ||
              !menuEl.contains(document.activeElement)
            ) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (
              document.activeElement === lastElement ||
              !menuEl.contains(document.activeElement)
            ) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        cancelAnimationFrame(timer);
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (prevOpenRef.current) {
      // Return focus to menu toggle button when closing
      menuButtonRef.current?.focus();
    }
    prevOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  const navItems: { route: PageRoute; label: string }[] = [
    { route: "welcome", label: t.nav.welcome },
    { route: "about", label: t.nav.about },
    { route: "projects", label: t.nav.projects },
    { route: "contacts", label: t.nav.contacts },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      data-assemble="0"
      className="sticky top-0 z-40 w-full backdrop-blur-xl bg-canvas/80 border-b border-stroke transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Monogram & Live Status */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => handleNavClick("welcome")}
            className="group flex items-center gap-2 text-left font-mono hover:opacity-80 transition-opacity shrink-0 whitespace-nowrap"
          >
            <span className="font-bold tracking-widest text-sm sm:text-base text-chalk whitespace-nowrap shrink-0">
              YK // 01
            </span>
            <span className="hidden xl:inline-block text-stroke">|</span>
            <span className="hidden xl:inline-block text-[11px] uppercase tracking-widest text-granite whitespace-nowrap">
              YAROSLAV KRUPODER
            </span>
          </button>

          <div className="hidden 2xl:flex items-center gap-1.5 px-2 py-0.5 rounded-control border border-stroke text-[10px] font-mono text-granite shrink-0">
            <span className="tracking-wide">Varna · UTC+2</span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-control border border-stroke bg-surface/60 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`px-3 py-1 text-xs font-mono whitespace-nowrap transition-all rounded-control ${
                  isActive
                    ? "bg-bone text-canvas font-semibold"
                    : "text-granite hover:text-bone hover:bg-stroke/40"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Resume & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Dropdown */}
          <div ref={langDropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-control border border-stroke bg-surface/80 hover:bg-stroke text-stone hover:text-bone text-xs font-mono transition-all shrink-0"
              aria-label="Select language"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <Globe className="w-3.5 h-3.5 text-signal" />
              <span className="font-semibold uppercase tracking-wider">
                {locale}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-granite transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div
                role="listbox"
                aria-label="Languages"
                className="absolute right-0 mt-1.5 w-40 py-1 rounded-control bg-canvas border border-stroke shadow-2xl z-50"
              >
                {LANGUAGES.map((item) => {
                  const isSelected = locale === item.code;
                  return (
                    <button
                      key={item.code}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setLocale(item.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between transition-colors ${
                        isSelected
                          ? "bg-signal/15 text-signal font-bold"
                          : "text-stone hover:bg-stroke/40 hover:text-bone"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-granite">
                          {item.label}
                        </span>
                        <span>{item.full}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-signal" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {onOpenCommandPalette && (
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-control border border-stroke bg-surface/80 hover:border-graphite hover:bg-stroke/40 text-stone hover:text-bone text-xs font-mono transition-all shrink-0"
              aria-label={t.nav.commandMenu}
              title={`${t.nav.commandMenu} (⌘K)`}
            >
              <span className="text-[11px] font-semibold text-bone">⌘K</span>
            </button>
          )}

          {onToggleAnimations && (
            <button
              onClick={onToggleAnimations}
              className="inline-flex items-center justify-center w-8 h-8 rounded-control border border-stroke text-stone hover:text-bone hover:border-graphite hover:bg-stroke/40 transition-all shrink-0"
              aria-label={
                animationsEnabled ? t.nav.animationsOff : t.nav.animationsOn
              }
              title={
                animationsEnabled ? t.nav.animationsOff : t.nav.animationsOn
              }
            >
              {animationsEnabled ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <button
            onClick={handleCopyEmail}
            data-umami-event="copy-email"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-control border border-stroke text-stone hover:text-bone hover:border-signal/50 hover:bg-signal/10 transition-all shrink-0 whitespace-nowrap"
            title={`Copy email (${contactsData.email})`}
            aria-label="Copy email address"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-signal" />
                <span className="text-signal font-semibold">
                  {t.nav.emailCopied}
                </span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-signal" />
                <span>{t.nav.copyEmail}</span>
              </>
            )}
          </button>

          {onOpenCvPreview ? (
            <button
              type="button"
              onClick={onOpenCvPreview}
              data-umami-event="nav-resume"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-control border border-stroke text-stone hover:text-bone hover:border-graphite hover:bg-stroke/40 transition-all shrink-0 whitespace-nowrap"
              title={t.nav.resume}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.nav.resume}</span>
            </button>
          ) : (
            <a
              href={contactsData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Yaroslav_Krupoder_CV.pdf"
              data-umami-event="nav-resume"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-control border border-stroke text-stone hover:text-bone hover:border-graphite hover:bg-stroke/40 transition-all shrink-0 whitespace-nowrap"
              title="Download Yaroslav Krupoder CV"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.nav.resume}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}

          {/* Mobile menu trigger */}
          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-control border border-stroke text-granite hover:text-bone hover:bg-stroke/40 transition-colors shrink-0"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — overlay: floats above content, never pushes it */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-16 z-30 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-menu"
            ref={mobileMenuRef}
            className="md:hidden fixed top-16 left-0 right-0 z-40 px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] space-y-3 bg-[#101010] border-b border-[#3d3a39]"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`w-full text-left px-3 py-2 rounded-[3px] text-xs font-mono transition-colors ${
                      isActive
                        ? "bg-[#eeeeee] text-black font-semibold"
                        : "text-zinc-300 hover:bg-[#eeeeee]/5"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#ee6018]" />
                <div className="inline-flex items-center p-0.5 rounded-[3px] border border-white/15 bg-[#1d1a18]/70 text-[10px] font-mono">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLocale(l.code)}
                      className={`px-2 py-0.5 rounded-[2px] uppercase transition-colors ${
                        locale === l.code
                          ? "bg-[#ee6018] text-white font-bold"
                          : "text-[#8a8380] hover:text-white"
                      }`}
                      aria-label={`Switch language to ${l.full}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-control border border-stroke text-stone hover:text-bone hover:border-signal/50 hover:bg-signal/10"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-signal" />
                      <span className="text-signal font-semibold">
                        {t.nav.emailCopied}
                      </span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-signal" />
                      <span>{t.nav.copyEmail}</span>
                    </>
                  )}
                </button>

                {onOpenCvPreview ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCvPreview();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-control border border-stroke text-stone hover:text-bone hover:bg-bone/5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.nav.resume}</span>
                  </button>
                ) : (
                  <a
                    href={contactsData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Yaroslav_Krupoder_CV.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-control border border-stroke text-stone hover:text-bone hover:bg-bone/5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t.nav.resume}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

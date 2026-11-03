import React from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { contactsData } from "../data/contacts";
import { useLanguage } from "../i18n/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t border-white/10 py-10 text-xs font-mono text-[#8a8380]">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Yaroslav Krupoder · {t.footer.rights}
          </p>

          <div className="flex items-center gap-5 text-xs text-[#8a8380]">
            <a
              href={contactsData.github}
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={contactsData.linkedin}
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent("yk:replay-assemble"))
              }
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>{t.footer.replayIntro}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

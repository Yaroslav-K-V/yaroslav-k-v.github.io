import React from 'react';
import { contactsData } from '../data/contacts';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 py-8 text-sm text-gray-500 dark:text-gray-400">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="order-2 sm:order-1 text-center sm:text-left">
          Last updated: {contactsData.lastUpdated}
        </p>

        <button
          onClick={scrollToTop}
          className="order-1 sm:order-2 inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

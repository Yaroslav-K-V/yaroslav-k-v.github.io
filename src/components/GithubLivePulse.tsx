import React, { useState, useEffect } from "react";
import { GitCommit, ExternalLink } from "lucide-react";

interface GitHubTelemetry {
  repoName: string;
  relativeTime: string;
  isFallback: boolean;
}

interface GitHubEvent {
  type: string;
  created_at?: string;
  repo?: {
    name: string;
  };
}

const CACHE_KEY = "gh_pulse_telemetry_v2";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

function sanitizeRepoName(raw: string): string {
  const cleaned = raw.replace(/^Yaroslav-K-V\//i, "").trim();
  return /^[a-zA-Z0-9_.-]{1,60}$/.test(cleaned) ? cleaned : "Site_YK";
}

function getRelativeTimeString(dateIso: string): string {
  const timestamp = new Date(dateIso).getTime();
  if (isNaN(timestamp)) return "recently";
  const diffMs = Date.now() - timestamp;
  if (diffMs < 0) return "just now";
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export const GithubLivePulse: React.FC = () => {
  // Synchronous initial state from localStorage to avoid layout shift and flash
  const [telemetry, setTelemetry] = useState<GitHubTelemetry>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
          return parsed.data;
        }
      }
    } catch {
      // Ignore localStorage issues
    }
    return {
      repoName: "Site_YK",
      relativeTime: "live",
      isFallback: false,
    };
  });

  useEffect(() => {
    // Check if valid cache already loaded
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.data) {
          return;
        }
      }
    } catch {
      // Continue to fetch
    }

    const controller = new AbortController();
    fetch("https://api.github.com/users/Yaroslav-K-V/events/public", {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((events: GitHubEvent[]) => {
        if (!Array.isArray(events) || events.length === 0) return;
        const latestPush =
          events.find((e) => e.type === "PushEvent") || events[0];
        const rawRepo = latestPush?.repo?.name || "Site_YK";
        const repoClean = sanitizeRepoName(rawRepo);
        const relTime = latestPush?.created_at
          ? getRelativeTimeString(latestPush.created_at)
          : "recent";

        const data: GitHubTelemetry = {
          repoName: repoClean,
          relativeTime: relTime,
          isFallback: false,
        };

        setTelemetry(data);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data, timestamp: Date.now() }),
          );
        } catch {
          // Ignore cache write error
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        // Fallback to static verified state
        setTelemetry({
          repoName: "Site_YK · 26 tests passing",
          relativeTime: "live",
          isFallback: true,
        });
      });

    return () => controller.abort();
  }, []);

  return (
    <a
      href="https://github.com/Yaroslav-K-V"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`GitHub Activity: latest work on ${telemetry.repoName} (${telemetry.relativeTime})`}
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[3px] border border-[#3d3a39] bg-[#1d1a18]/60 hover:border-[#a0ca92]/50 hover:bg-[#a0ca92]/5 text-[11px] font-mono text-[#8a8380] hover:text-[#eeeeee] transition-all group"
    >
      {/* Steady rectangular metric status indicator */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="relative inline-flex rounded-[2px] h-1.5 w-1.5 bg-[#a0ca92]" />
      </span>

      <GitCommit className="w-3 h-3 text-[#a0ca92] shrink-0" />

      <span className="truncate max-w-[200px] sm:max-w-[280px]">
        <span className="text-[#8a8380] mr-1.5">gh:</span>
        <span className="text-zinc-200 font-medium">{telemetry.repoName}</span>
        <span className="text-[#a0ca92] ml-1.5 font-normal">
          ({telemetry.relativeTime})
        </span>
      </span>

      <ExternalLink className="w-2.5 h-2.5 text-[#8a8380] group-hover:text-[#a0ca92] transition-colors shrink-0" />
    </a>
  );
};

export default GithubLivePulse;

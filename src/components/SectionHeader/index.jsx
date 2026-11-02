import React from "react";

const getSectionMeta = (title = "") => {
  const lower = title.toLowerCase();

  if (lower.includes("hot right now")) {
    return {
      badge: "TRENDING NOW",
      icon: "🔥",
      subtitle: "Most popular movies & shows people are watching today",
      accent: "from-secondary to-primary",
      badgeColor: "bg-secondary/15 text-secondary border-secondary/30",
    };
  }

  if (lower.includes("best of the best")) {
    return {
      badge: "CRITICS CHOICE",
      icon: "⭐",
      subtitle: "Highest rated cinematic masterpieces of all time",
      accent: "from-secondary to-secondary-hover",
      badgeColor: "bg-secondary/15 text-secondary border-secondary/30",
    };
  }

  if (lower.includes("top 10 trending tv")) {
    return {
      badge: "CHART TOPPERS",
      icon: "🏆",
      subtitle: "The 10 most binge-worthy television series right now",
      accent: "from-primary to-secondary",
      badgeColor: "bg-primary/15 text-primary border-primary/30",
    };
  }

  if (lower.includes("top 10 box office") || lower.includes("top 10 movie")) {
    return {
      badge: "TOP 10 RANKED",
      icon: "🎬",
      subtitle: "The highest grossing & most watched blockbusters",
      accent: "from-secondary to-primary",
      badgeColor: "bg-secondary/15 text-secondary border-secondary/30",
    };
  }

  if (lower.includes("now in theaters") || lower.includes("just released")) {
    return {
      badge: "NOW SHOWING",
      icon: "🎟️",
      subtitle: "Fresh releases fresh off the big screen",
      accent: "from-primary to-primary-hover",
      badgeColor: "bg-primary/15 text-primary border-primary/30",
    };
  }

  if (lower.includes("anime")) {
    return {
      badge: "ANIME VAULT",
      icon: "⚡",
      subtitle: "Top Japanese animation series and feature films",
      accent: "from-secondary to-primary",
      badgeColor: "bg-secondary/15 text-secondary border-secondary/30",
    };
  }

  if (lower.includes("disney")) {
    return {
      badge: "NOSTALGIA",
      icon: "✨",
      subtitle: "Iconic animated classics and childhood memories",
      accent: "from-primary to-secondary",
      badgeColor: "bg-primary/15 text-primary border-primary/30",
    };
  }

  if (lower.includes("chinese") || lower.includes("asian")) {
    return {
      badge: "WORLD CINEMA",
      icon: "🏮",
      subtitle: "Captivating stories & martial arts epics from the East",
      accent: "from-secondary to-primary",
      badgeColor: "bg-secondary/15 text-secondary border-secondary/30",
    };
  }

  if (lower.includes("favorites") || lower.includes("blockbusters")) {
    return {
      badge: "MUST WATCH",
      icon: "🍿",
      subtitle: "Fan favorites guaranteed for an entertaining movie night",
      accent: "from-primary to-secondary",
      badgeColor: "bg-primary/15 text-primary border-primary/30",
    };
  }

  if (lower.includes("mood")) {
    return {
      badge: "CURATED FOR YOU",
      icon: "🎭",
      subtitle: "Choose your vibe and explore handcrafted genres",
      accent: "from-secondary to-primary",
      badgeColor: "bg-secondary/15 text-secondary border-secondary/30",
    };
  }

  return {
    badge: "COLLECTION",
    icon: "🎞️",
    subtitle: "",
    accent: "from-primary to-secondary",
    badgeColor: "bg-primary/15 text-primary border-primary/30",
  };
};

const SectionHeader = ({
  title,
  subtitle: customSubtitle,
  badge: customBadge,
  icon: customIcon,
  children,
  className = "",
}) => {
  const meta = getSectionMeta(title);
  const badge = customBadge || meta.badge;
  const icon = customIcon || meta.icon;
  const subtitle = customSubtitle || meta.subtitle;

  return (
    <div
      className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        {/* Top Mini Badge & Accent Line */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-5 w-1 rounded-full bg-gradient-to-b from-primary to-secondary" />

          {badge && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase border backdrop-blur-sm ${meta.badgeColor}`}
            >
              <span className="text-xs">{icon}</span>
              <span>{badge}</span>
            </span>
          )}
        </div>

        {/* Main Section Title */}
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-[28px] drop-shadow-sm flex items-center gap-2">
          <span>{title}</span>
        </h2>

        {/* Subtitle / Description */}
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-400 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right-side Controls (Tabs, Navigation Buttons, View All...) */}
      {children && (
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;

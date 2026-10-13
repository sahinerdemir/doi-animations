"use client";

import React, { useState } from "react";
import { siteTreeData } from "@/data/pagesTree";
import { PageNode } from "@/types/navigation";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FileCode2,
  CheckCircle2,
  Clock,
  Circle,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface SidebarTreeProps {
  selectedPageId: string;
  onSelectPage: (page: PageNode) => void;
}

export function SidebarTree({ selectedPageId, onSelectPage }: SidebarTreeProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "onboarding-v2": true,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const getStatusIcon = (status: PageNode["status"], isSelected = false) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle2
            className={`w-3.5 h-3.5 shrink-0 ${
              isSelected ? "text-white" : "text-emerald-400"
            }`}
          />
        );
      case "in_progress":
        return (
          <Clock
            className={`w-3.5 h-3.5 shrink-0 ${
              isSelected ? "text-white" : "text-amber-400"
            }`}
          />
        );
      default:
        return (
          <Circle
            className={`w-3 h-3 shrink-0 ${
              isSelected ? "text-white/70" : "text-zinc-600"
            }`}
          />
        );
    }
  };

  const filteredTree = siteTreeData.map((section) => ({
    ...section,
    pages: section.pages.filter((page) =>
      page.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  if (collapsed) {
    return (
      <aside className="fixed left-3 top-3 z-40">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          title="Sayfa Listesini Aç"
          className="p-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 backdrop-blur-md shadow-xl transition-all"
        >
          <PanelLeftOpen className="w-5 h-5 text-zinc-300" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-72 sm:w-80 h-screen bg-[#111317] border-r border-zinc-800/80 flex flex-col shrink-0 select-none z-30 transition-all text-zinc-200">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#EF4823] flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#EF4823]/30">
            D
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
              DOİ Animasyon Rehberi
            </h2>
            <p className="text-[11px] text-zinc-500">Sayfalar & Bileşenler</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(true)}
          title="Menüyü Daralt"
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-zinc-800/60">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ekran ara..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-[#EF4823]/50 focus:ring-1 focus:ring-[#EF4823]/50 transition-all"
          />
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
        {filteredTree.map((section) => {
          const isExpanded = expandedSections[section.id] ?? true;
          return (
            <div key={section.id} className="space-y-1">
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 transition-colors group"
              >
                <div className="flex items-center gap-2 font-medium text-xs">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                  )}
                  <Folder className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#EF4823] transition-colors" />
                  <span className="text-zinc-200">{section.title}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono bg-zinc-800/80 px-1.5 py-0.5 rounded">
                  {section.pages.length}
                </span>
              </button>

              {/* Subpages / Tree Nodes */}
              {isExpanded && (
                <div className="ml-3 pl-2 border-l border-zinc-800/70 space-y-0.5">
                  {section.pages.map((page) => {
                    const isSelected = page.id === selectedPageId;
                    return (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => onSelectPage(page)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-all ${
                          isSelected
                            ? "bg-[#EF4823] text-white font-medium shadow-md shadow-[#EF4823]/20"
                            : "text-zinc-300 hover:bg-zinc-850 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileCode2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isSelected ? "text-white" : "text-zinc-500"
                            }`}
                          />
                          <span className="truncate">{page.title}</span>
                        </div>

                        <div className="flex items-center shrink-0 ml-1.5">
                          {getStatusIcon(page.status, isSelected)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </aside>
  );
}

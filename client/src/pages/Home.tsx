/*
 * DESIGN: Mystical Dark Collector's Vault
 * Main page with hero, filters, and trick grid
 */

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import TrickCard from "@/components/TrickCard";
import { TenyoTrick, SortOption, FilterOption } from "@/types/trick";

export default function Home() {
  const [tricks, setTricks] = useState<TenyoTrick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("combined");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => {
        setTricks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedTricks = useMemo(() => {
    let result = [...tricks];

    // Apply filter
    switch (filterBy) {
      case "rare":
        result = result.filter((t) => t.rarity_score >= 8);
        break;
      case "popular":
        result = result.filter((t) => t.popularity_score >= 8);
        break;
      case "classic":
        result = result.filter((t) => parseInt(t.year_released) < 1990);
        break;
    }

    // Apply sort
    switch (sortBy) {
      case "combined":
        result.sort((a, b) => b.combined_score - a.combined_score);
        break;
      case "popularity":
        result.sort((a, b) => b.popularity_score - a.popularity_score);
        break;
      case "rarity":
        result.sort((a, b) => b.rarity_score - a.rarity_score);
        break;
      case "year":
        result.sort((a, b) => parseInt(b.year_released) - parseInt(a.year_released));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [tricks, sortBy, filterBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
          <p className="text-muted-foreground">Loading magic collection...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-lg mb-2">Failed to load collection</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection totalTricks={tricks.length} />

      {/* Main Content */}
      <main className="container py-12">
        {/* Filter Bar */}
        <FilterBar
          sortBy={sortBy}
          filterBy={filterBy}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
          totalCount={tricks.length}
          filteredCount={filteredAndSortedTricks.length}
        />

        {/* Tricks Grid */}
        {filteredAndSortedTricks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedTricks.map((trick, index) => (
              <TrickCard key={trick.product_code} trick={trick} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              No tricks match your current filters.
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Tenyo Magic Wish List • A collection of {tricks.length} magical treasures
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Data compiled from public sources. Tenyo® is a registered trademark.
          </p>
        </div>
      </footer>
    </div>
  );
}

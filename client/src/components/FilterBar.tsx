/*
 * DESIGN: Mystical Dark Collector's Vault
 * Glass morphism filter bar with glowing active states
 */

import { motion } from "framer-motion";
import { SortAsc, Filter, Sparkles, Star, Clock, Trophy } from "lucide-react";
import { SortOption, FilterOption } from "@/types/trick";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  sortBy: SortOption;
  filterBy: FilterOption;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterBar({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const filterOptions: { value: FilterOption; label: string; icon: React.ReactNode }[] = [
    { value: "all", label: "All Tricks", icon: <Sparkles className="w-4 h-4" /> },
    { value: "rare", label: "Rare (8+)", icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { value: "popular", label: "Popular (8+)", icon: <Star className="w-4 h-4 text-cyan-400" /> },
    { value: "classic", label: "Classic (<1990)", icon: <Clock className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filterBy === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(option.value)}
              className={`transition-all duration-200 ${
                filterBy === option.value
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500 glow-purple"
                  : "bg-transparent border-border/50 hover:border-purple-500/50 hover:bg-purple-500/10"
              }`}
            >
              {option.icon}
              <span className="ml-1.5">{option.label}</span>
            </Button>
          ))}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Showing <span className="text-purple-400 font-medium">{filteredCount}</span> of{" "}
            <span className="text-foreground font-medium">{totalCount}</span> tricks
          </span>

          <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
            <SelectTrigger className="w-[180px] bg-muted/30 border-border/50">
              <SortAsc className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="bg-card border-purple-500/30">
              <SelectItem value="combined">
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Combined Score
                </span>
              </SelectItem>
              <SelectItem value="popularity">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-cyan-400" />
                  Popularity
                </span>
              </SelectItem>
              <SelectItem value="rarity">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Rarity
                </span>
              </SelectItem>
              <SelectItem value="year">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Year (Newest)
                </span>
              </SelectItem>
              <SelectItem value="name">
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  Name (A-Z)
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}

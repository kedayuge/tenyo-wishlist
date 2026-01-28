/*
 * DESIGN: Mystical Dark Collector's Vault
 * Glass morphism cards with glowing borders on hover
 * Purple/cyan accents, gold for ratings
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, Calendar, User, MessageCircle } from "lucide-react";
import { TenyoTrick } from "@/types/trick";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TrickCardProps {
  trick: TenyoTrick;
  index: number;
}

function StarRating({ score, label }: { score: number; label: string }) {
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="flex gap-0.5">
        {[...Array(10)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < fullStars
                ? "fill-amber-400 text-amber-400"
                : i === fullStars && hasHalf
                ? "fill-amber-400/50 text-amber-400"
                : "text-amber-400/20"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-amber-400">{score.toFixed(1)}</span>
    </div>
  );
}

export default function TrickCard({ trick, index }: TrickCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isRare = trick.rarity_score >= 8;
  const isPopular = trick.popularity_score >= 8;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={() => setIsOpen(true)}
        className="glass-card rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
          {!imageError ? (
            <img
              src={`${import.meta.env.BASE_URL}images/${trick.image_filename}`}
              alt={trick.name}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-purple-500/50" />
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isRare && (
              <Badge className="bg-gradient-to-r from-purple-600 to-purple-800 border-0 text-white text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Rare
              </Badge>
            )}
            {isPopular && (
              <Badge className="bg-gradient-to-r from-cyan-600 to-cyan-800 border-0 text-white text-xs">
                <Star className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>

          {/* Product Code */}
          <div className="absolute top-3 right-3">
            <span className="text-xs font-mono bg-black/60 px-2 py-1 rounded text-purple-300">
              {trick.product_code}
            </span>
          </div>

          {/* Glow overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-purple-300 transition-colors line-clamp-1">
            {trick.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {trick.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {trick.year_released}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {trick.creator}
            </span>
          </div>

          {/* Scores */}
          <div className="pt-2 border-t border-border/50 space-y-1.5">
            <StarRating score={trick.popularity_score} label="Pop" />
            <StarRating score={trick.rarity_score} label="Rare" />
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl bg-card border-purple-500/30 max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl flex items-center gap-3">
              <span className="text-purple-400 font-mono text-lg">{trick.product_code}</span>
              <span>{trick.name}</span>
            </DialogTitle>
            <DialogDescription className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Released: {trick.year_released}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Creator: {trick.creator}
              </span>
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/20">
                {!imageError ? (
                  <img
                    src={`${import.meta.env.BASE_URL}images/${trick.image_filename}`}
                    alt={trick.name}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-purple-500/50" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                {/* Scores */}
                <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                  <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground">Ratings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Popularity</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                            style={{ width: `${trick.popularity_score * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-cyan-400 w-8">{trick.popularity_score.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rarity</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                            style={{ width: `${trick.rarity_score * 10}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-purple-400 w-8">{trick.rarity_score.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <span className="text-sm font-medium">Combined Score</span>
                      <span className="text-lg font-bold text-amber-400">{trick.combined_score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">Description</h4>
                  <p className="text-sm leading-relaxed text-foreground/90">{trick.description}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-6 space-y-4">
              <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Public Reviews & Comments
              </h4>
              
              {trick.consensus && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                  <p className="text-sm font-medium text-purple-300 mb-1">Community Consensus</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{trick.consensus}</p>
                </div>
              )}

              <div className="space-y-3">
                {trick.reviews.filter(r => r).map((review, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/20 border border-border/30">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">"{review}"</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}

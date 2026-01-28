/*
 * DESIGN: Mystical Dark Collector's Vault
 * Immersive hero with cosmic background and floating elements
 */

import { motion } from "framer-motion";
import { Sparkles, Star, Gem } from "lucide-react";

interface HeroSectionProps {
  totalTricks: number;
}

export default function HeroSection({ totalTricks }: HeroSectionProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/hero-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: [null, "-20%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Collector's Vault</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
            <span className="gradient-text">Tenyo Magic</span>
            <br />
            <span className="text-foreground">Wish List</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated collection of {totalTricks} extraordinary magic tricks from Tenyo, 
            Japan's legendary magic manufacturer. Ranked by popularity and rarity.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 pt-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                <Gem className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-display font-bold text-foreground">{totalTricks}</p>
                <p className="text-sm text-muted-foreground">Magic Tricks</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                <Star className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-display font-bold text-foreground">1976-2010</p>
                <p className="text-sm text-muted-foreground">Year Range</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/30">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-display font-bold text-foreground">8+</p>
                <p className="text-sm text-muted-foreground">Rare Items</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

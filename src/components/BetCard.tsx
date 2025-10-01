import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface BetCardProps {
  title: string;
  description: string;
  odds: string;
  variant: "bet" | "gold" | "success";
  icon: string;
}

export const BetCard = ({ title, description, odds, variant, icon }: BetCardProps) => {
  const [betAmount, setBetAmount] = useState(100);
  const [hasPlacedBet, setHasPlacedBet] = useState(false);

  const handleBet = () => {
    setHasPlacedBet(true);
    toast.success(`Aposta de R$ ${betAmount} realizada em "${title}"! 🎰`, {
      description: `Odds: ${odds}`,
    });
    
    // Confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Using the window.confetti if available (would need to add canvas-confetti library)
      // For now, just a visual feedback with toast
    }, 250);
  };

  return (
    <Card className="relative overflow-hidden border-2 border-border bg-card/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
      
      <div className="relative p-6 space-y-4">
        <div className="text-6xl text-center mb-4 animate-bounce">
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-center text-sm">
          {description}
        </p>
        
        <div className="flex items-center justify-center gap-2 py-4">
          <span className="text-sm text-muted-foreground">Odds:</span>
          <span className="text-3xl font-bold text-secondary">{odds}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Valor:</label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-foreground"
              min="10"
              step="10"
            />
            <span className="text-sm text-muted-foreground">R$</span>
          </div>
          
          <Button
            variant={variant}
            size="lg"
            className="w-full"
            onClick={handleBet}
            disabled={hasPlacedBet}
          >
            {hasPlacedBet ? "✓ Aposta Realizada!" : "🎲 Apostar Agora!"}
          </Button>
          
          {hasPlacedBet && (
            <p className="text-xs text-center text-accent animate-pulse">
              Retorno potencial: R$ {(betAmount * parseFloat(odds.replace("x", ""))).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

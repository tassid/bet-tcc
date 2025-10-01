import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBet = async () => {
    if (!playerName.trim()) {
      toast.error("Digite seu nome para apostar!");
      return;
    }

    setIsLoading(true);
    
    const betTypeMap: Record<string, string> = {
      "Vai Enlouquecer": "enlouquecer",
      "Vai se Formar!": "formar",
      "Vai Jubilar": "jubilar"
    };

    const { error } = await supabase
      .from('bets')
      .insert({
        player_name: playerName.trim(),
        bet_type: betTypeMap[title],
        amount: betAmount
      });

    setIsLoading(false);

    if (error) {
      toast.error("Erro ao realizar aposta", {
        description: error.message
      });
      return;
    }

    setHasPlacedBet(true);
    toast.success(`Aposta de R$ ${betAmount} realizada em "${title}"! 🎰`, {
      description: `Odds: ${odds} | Jogador: ${playerName}`,
    });
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
          {!hasPlacedBet && (
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted-foreground">Seu Nome:</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
                maxLength={50}
              />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Valor:</label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-foreground"
              min="10"
              step="10"
              disabled={hasPlacedBet}
            />
            <span className="text-sm text-muted-foreground">R$</span>
          </div>
          
          <Button
            variant={variant}
            size="lg"
            className="w-full"
            onClick={handleBet}
            disabled={hasPlacedBet || isLoading}
          >
            {isLoading ? "⏳ Apostando..." : hasPlacedBet ? "✓ Aposta Realizada!" : "🎲 Apostar Agora!"}
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

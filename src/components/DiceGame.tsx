import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const DiceGame = () => {
  const [reel1, setReel1] = useState(0);
  const [reel2, setReel2] = useState(0);
  const [reel3, setReel3] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const symbols = ["🐯", "🍒", "🍋", "⭐", "💎", "🔔", "7️⃣", "🍀"];

  const spin = () => {
    setIsSpinning(true);
    setWinMessage("");
    
    // Animação de rotação dos rolos
    const interval = setInterval(() => {
      setReel1(Math.floor(Math.random() * symbols.length));
      setReel2(Math.floor(Math.random() * symbols.length));
      setReel3(Math.floor(Math.random() * symbols.length));
    }, 100);

    // Para após 2 segundos e verifica resultado
    setTimeout(() => {
      clearInterval(interval);
      const final1 = Math.floor(Math.random() * symbols.length);
      const final2 = Math.floor(Math.random() * symbols.length);
      const final3 = Math.floor(Math.random() * symbols.length);
      
      setReel1(final1);
      setReel2(final2);
      setReel3(final3);
      setIsSpinning(false);
      
      // Verifica combinações vencedoras
      if (final1 === final2 && final2 === final3) {
        if (symbols[final1] === "🐯") {
          setWinMessage("🎰 JACKPOT DO TIGRINHO! 🐯🐯🐯 GANHOU TUDO!");
        } else {
          setWinMessage("🎉 TRINCA! VOCÊ GANHOU! 🎉");
        }
      } else if (final1 === final2 || final2 === final3 || final1 === final3) {
        setWinMessage("✨ PAR! Pequeno prêmio! ✨");
      }
    }, 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-secondary/20 via-primary/20 to-accent/20 backdrop-blur-sm border-4 border-secondary shadow-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-4xl font-black bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent animate-pulse">
          🐯 CAÇA-NÍQUEL DO TIGRINHO 🐯
        </CardTitle>
        <CardDescription className="text-lg font-bold text-foreground">
          Gire os rolos e teste sua sorte!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Slot Machine Display */}
        <div className="relative bg-card/80 rounded-2xl p-8 border-4 border-primary/50 shadow-inner">
          {/* Decorative lights */}
          <div className="absolute -top-2 left-0 right-0 flex justify-around">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  isSpinning ? 'animate-pulse' : ''
                } ${i % 2 === 0 ? 'bg-secondary' : 'bg-primary'}`}
              />
            ))}
          </div>
          
          {/* Reels */}
          <div className="flex justify-center gap-4 mb-6">
            {[reel1, reel2, reel3].map((reel, index) => (
              <div
                key={index}
                className={`
                  bg-background/90 rounded-xl border-4 border-accent/50 p-6
                  flex items-center justify-center
                  min-w-[120px] min-h-[120px]
                  shadow-xl
                  ${isSpinning ? 'animate-pulse' : 'hover:scale-105'}
                  transition-all duration-300
                `}
              >
                <span 
                  className={`text-7xl ${isSpinning ? 'blur-sm animate-spin' : ''} transition-all`}
                >
                  {symbols[reel]}
                </span>
              </div>
            ))}
          </div>

          {/* Win Message */}
          {winMessage && (
            <div className="text-center animate-bounce">
              <p className="text-2xl font-black text-secondary drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
                {winMessage}
              </p>
            </div>
          )}
        </div>

        {/* Paytable */}
        <div className="bg-card/50 rounded-xl p-4 border-2 border-border">
          <p className="text-center text-sm font-bold text-muted-foreground mb-2">
            💰 TABELA DE PRÊMIOS
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <span>🐯🐯🐯</span>
              <span className="text-secondary font-bold">JACKPOT!</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💎💎💎</span>
              <span className="text-accent font-bold">Grande prêmio</span>
            </div>
            <div className="flex items-center gap-1">
              <span>7️⃣7️⃣7️⃣</span>
              <span className="text-primary font-bold">Super sorte</span>
            </div>
            <div className="flex items-center gap-1">
              <span>XXX</span>
              <span className="text-foreground/70">Qualquer trinca</span>
            </div>
          </div>
        </div>

        {/* Spin Button */}
        <div className="flex justify-center">
          <Button
            onClick={spin}
            disabled={isSpinning}
            variant="gold"
            size="xl"
            className="text-2xl font-black px-12 py-6 shadow-gold hover:scale-110 transition-all"
          >
            {isSpinning ? "🎰 GIRANDO..." : "🎰 GIRAR"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
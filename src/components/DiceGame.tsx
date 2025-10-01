import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const DiceGame = () => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    
    // Animação de rolagem
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
    }, 100);

    // Para após 1 segundo
    setTimeout(() => {
      clearInterval(interval);
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 1000);
  };

  const getDiceEmoji = (value: number) => {
    const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return diceEmojis[value - 1];
  };

  const total = dice1 + dice2;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-2 border-border hover:shadow-xl transition-all">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          🎲 Joguinho de Dados 🎲
        </CardTitle>
        <CardDescription className="text-lg">
          Role os dados e veja sua sorte!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-center gap-8">
          <div className={`text-9xl transition-transform duration-100 ${isRolling ? 'animate-spin' : ''}`}>
            {getDiceEmoji(dice1)}
          </div>
          <div className={`text-9xl transition-transform duration-100 ${isRolling ? 'animate-spin' : ''}`}>
            {getDiceEmoji(dice2)}
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-primary">
            Total: {total}
          </p>
          {!isRolling && total === 12 && (
            <p className="text-xl text-secondary animate-pulse">
              🎉 Dupla seis! Sorte máxima! 🎉
            </p>
          )}
          {!isRolling && total === 2 && (
            <p className="text-xl text-destructive animate-pulse">
              💀 Azar total! 💀
            </p>
          )}
          {!isRolling && dice1 === dice2 && total !== 2 && total !== 12 && (
            <p className="text-xl text-accent animate-pulse">
              ✨ Dupla! ✨
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={rollDice}
            disabled={isRolling}
            variant="bet"
            size="xl"
            className="text-xl"
          >
            {isRolling ? "🎲 Rolando..." : "🎲 Rolar Dados"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
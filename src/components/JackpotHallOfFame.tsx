import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface JackpotStats {
  player_name: string;
  tigrinho_count: number;
  seven_count: number;
  total_jackpots: number;
}

export const JackpotHallOfFame = () => {
  const [stats, setStats] = useState<JackpotStats[]>([]);

  useEffect(() => {
    fetchJackpots();

    const channel = supabase
      .channel('jackpots-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jackpots'
        },
        () => {
          fetchJackpots();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchJackpots = async () => {
    const { data, error } = await supabase
      .from('jackpots')
      .select('*');

    if (error) {
      console.error("Erro ao buscar jackpots:", error);
      return;
    }

    // Agrupa por jogador e conta os jackpots
    const playerStats = data.reduce((acc: Record<string, JackpotStats>, jackpot) => {
      if (!acc[jackpot.player_name]) {
        acc[jackpot.player_name] = {
          player_name: jackpot.player_name,
          tigrinho_count: 0,
          seven_count: 0,
          total_jackpots: 0
        };
      }

      if (jackpot.jackpot_type === 'tigrinho') {
        acc[jackpot.player_name].tigrinho_count++;
      } else if (jackpot.jackpot_type === 'seven') {
        acc[jackpot.player_name].seven_count++;
      }
      acc[jackpot.player_name].total_jackpots++;

      return acc;
    }, {});

    // Converte para array e ordena por total de jackpots
    const sortedStats = Object.values(playerStats).sort(
      (a, b) => b.total_jackpots - a.total_jackpots
    );

    setStats(sortedStats);
  };

  return (
    <Card className="bg-gradient-to-br from-secondary/20 via-accent/20 to-primary/20 backdrop-blur-sm border-4 border-secondary shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-black bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
          🏆 HALL DA FAMA 🏆
        </CardTitle>
        <CardDescription className="text-lg font-bold text-foreground">
          Maiores vencedores de todos os tempos
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {stats.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Ainda não há vencedores! Seja o primeiro a ganhar um jackpot! 🎰
          </p>
        ) : (
          <div className="space-y-3">
            {stats.map((player, index) => (
              <div
                key={player.player_name}
                className={`
                  bg-card/80 rounded-lg p-4 border-2 border-border
                  hover:scale-105 transition-all duration-300
                  ${index === 0 ? 'border-secondary shadow-lg' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                    </span>
                    <div>
                      <p className="font-bold text-lg text-foreground">
                        {player.player_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {player.total_jackpots} jackpot{player.total_jackpots > 1 ? 's' : ''} total
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    {player.tigrinho_count > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-2xl">🐯</span>
                        <span className="font-bold text-secondary">
                          {player.tigrinho_count}x
                        </span>
                      </div>
                    )}
                    {player.seven_count > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-2xl">7️⃣</span>
                        <span className="font-bold text-accent">
                          {player.seven_count}x
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

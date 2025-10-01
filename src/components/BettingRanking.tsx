import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Bet {
  id: string;
  player_name: string;
  bet_type: string;
  amount: number;
  created_at: string;
}

interface RankingStat {
  bet_type: string;
  total_amount: number;
  bet_count: number;
  icon: string;
  label: string;
  color: string;
}

export const BettingRanking = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [stats, setStats] = useState<RankingStat[]>([]);
  const [totalBets, setTotalBets] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchBets();

    const channel = supabase
      .channel('bets-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bets'
        },
        () => {
          fetchBets();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBets = async () => {
    const { data, error } = await supabase
      .from('bets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bets:', error);
      return;
    }

    setBets(data || []);
    calculateStats(data || []);
  };

  const calculateStats = (betsData: Bet[]) => {
    const betTypes = {
      enlouquecer: { total: 0, count: 0, icon: "🤯", label: "Vai Enlouquecer", color: "text-primary" },
      formar: { total: 0, count: 0, icon: "🎓", label: "Vai se Formar", color: "text-secondary" },
      jubilar: { total: 0, count: 0, icon: "💀", label: "Vai Jubilar", color: "text-accent" }
    };

    let total = 0;
    
    betsData.forEach((bet) => {
      const type = bet.bet_type as keyof typeof betTypes;
      if (betTypes[type]) {
        betTypes[type].total += Number(bet.amount);
        betTypes[type].count += 1;
        total += Number(bet.amount);
      }
    });

    setTotalBets(betsData.length);
    setTotalAmount(total);

    const statsArray: RankingStat[] = Object.entries(betTypes).map(([key, value]) => ({
      bet_type: key,
      total_amount: value.total,
      bet_count: value.count,
      icon: value.icon,
      label: value.label,
      color: value.color
    }));

    setStats(statsArray.sort((a, b) => b.total_amount - a.total_amount));
  };

  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          📊 Ranking das Apostas
        </h2>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{totalBets}</div>
            <div className="text-sm text-muted-foreground">Total de Apostas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">R$ {totalAmount.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Em Jogo</div>
          </div>
        </div>
      </div>

      {/* Stats by Bet Type */}
      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.bet_type} className="bg-card/50 backdrop-blur-sm border-2 border-border p-6 hover:scale-105 transition-all">
            <div className="text-center space-y-2">
              <div className="text-5xl">{stat.icon}</div>
              <h3 className="font-bold text-foreground">{stat.label}</h3>
              <div className={`text-2xl font-bold ${stat.color}`}>
                R$ {stat.total_amount.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.bet_count} {stat.bet_count === 1 ? 'aposta' : 'apostas'}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Bets */}
      <div>
        <h3 className="text-2xl font-bold text-center mb-4 text-foreground">
          🔥 Apostas Recentes
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {bets.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma aposta ainda. Seja o primeiro a apostar!
            </p>
          ) : (
            bets.map((bet) => {
              const betInfo = {
                enlouquecer: { icon: "🤯", label: "Vai Enlouquecer", color: "border-primary/50" },
                formar: { icon: "🎓", label: "Vai se Formar", color: "border-secondary/50" },
                jubilar: { icon: "💀", label: "Vai Jubilar", color: "border-accent/50" }
              }[bet.bet_type] || { icon: "❓", label: "Unknown", color: "border-border" };

              return (
                <Card
                  key={bet.id}
                  className={`bg-card/30 backdrop-blur-sm border-2 ${betInfo.color} p-4 hover:scale-[1.02] transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{betInfo.icon}</span>
                      <div>
                        <div className="font-bold text-foreground">{bet.player_name}</div>
                        <div className="text-sm text-muted-foreground">{betInfo.label}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-secondary">R$ {Number(bet.amount).toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(bet.created_at).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

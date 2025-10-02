import { BetCard } from "@/components/BetCard";
import { BettingRanking } from "@/components/BettingRanking";
import { DiceGame } from "@/components/DiceGame";
import { JackpotHallOfFame } from "@/components/JackpotHallOfFame";
import tassianeImage from "@/assets/tassiane-stressed.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-black mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse">
              🎰 TASSIBETS 🎰
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-semibold">
              Aposte no Destino Acadêmico da Tassiane!
            </p>
          </div>
        </header>

        {/* Hero Section with Tassiane */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative rounded-3xl overflow-hidden border-4 border-primary/30 shadow-2xl hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <img
              src={tassianeImage}
              alt="Tassiane estressada com o TCC"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h2 className="text-3xl font-bold text-foreground mb-2 drop-shadow-lg">
                Tassiane vs TCC 2025
              </h2>
              <p className="text-lg text-foreground/90 drop-shadow-lg">
                Ciência da Computação • Cabelos ficando brancos de tanto estresse • Olhos castanhos fixos na tela
              </p>
            </div>
          </div>
        </div>

        {/* Betting Options */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            📊 Opções de Apostas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <BetCard
              title="Vai Enlouquecer"
              description="Debug infinito, café demais, sanidade -100%"
              odds="2.5x"
              variant="bet"
              icon="🤯"
            />
            
            <BetCard
              title="Vai se Formar!"
              description="Contra todas as odds, ela consegue! 🎓"
              odds="3.8x"
              variant="gold"
              icon="🎓"
            />
            
            <BetCard
              title="Vai Jubilar"
              description="Prazo venceu, compilador venceu, TCC venceu"
              odds="4.2x"
              variant="success"
              icon="💀"
            />
          </div>
        </div>

        {/* Ranking Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <BettingRanking />
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Linhas de Código", value: "∞", icon: "💻" },
              { label: "Cafés Tomados", value: "9999+", icon: "☕" },
              { label: "Bugs Resolvidos", value: "???", icon: "🐛" },
              { label: "Noites em Claro", value: "∞", icon: "🌙" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-6 text-center hover:scale-105 transition-all hover:shadow-xl"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dice Game Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <DiceGame />
        </div>

        {/* Hall of Fame Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <JackpotHallOfFame />
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm space-y-2 pb-8">
          <p className="text-lg font-semibold text-foreground">
            ⚠️ Site 100% zoeira pra mandar pros amigos ⚠️
          </p>
          <p>
            Nenhuma Tassiane foi prejudicada na criação deste site
          </p>
          <p className="text-xs">
            (Mas o TCC continua cobrando seu preço 💀)
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

-- Create bets table
CREATE TABLE public.bets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  bet_type TEXT NOT NULL CHECK (bet_type IN ('enlouquecer', 'formar', 'jubilar')),
  amount NUMERIC NOT NULL CHECK (amount > 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;

-- Create policies (public betting, anyone can read and write)
CREATE POLICY "Anyone can insert bets" 
ON public.bets 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view bets" 
ON public.bets 
FOR SELECT 
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.bets;
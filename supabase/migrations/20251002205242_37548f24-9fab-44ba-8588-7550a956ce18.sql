-- Create jackpots table
CREATE TABLE public.jackpots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  jackpot_type TEXT NOT NULL CHECK (jackpot_type IN ('tigrinho', 'seven')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jackpots ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can view jackpots" 
ON public.jackpots 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert jackpots" 
ON public.jackpots 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_jackpots_player_name ON public.jackpots(player_name);
CREATE INDEX idx_jackpots_created_at ON public.jackpots(created_at DESC);
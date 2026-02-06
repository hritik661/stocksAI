-- Add last_trading_price column to holdings table to persist P&L across market closes
-- This ensures P&L calculations don't reset when market closes and user refreshes the page

ALTER TABLE holdings 
ADD COLUMN IF NOT EXISTS last_trading_price NUMERIC(10, 4) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS last_price_updated_at TIMESTAMP DEFAULT NOW();

-- Create index for faster lookups by user_id and symbol
CREATE INDEX IF NOT EXISTS idx_holdings_last_price ON holdings(user_id, symbol);

-- Create index on updated_at for tracking changes
CREATE INDEX IF NOT EXISTS idx_holdings_updated_at ON holdings(user_id, updated_at DESC);

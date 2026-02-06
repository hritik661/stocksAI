-- Add last_trading_price column to holdings table to persist P&L across market closes
-- This ensures P&L calculations don't reset when market closes and user refreshes the page

ALTER TABLE holdings ADD COLUMN IF NOT EXISTS last_trading_price DECIMAL(10, 4) DEFAULT NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_holdings_last_price ON holdings(user_id, last_trading_price);

-- Update holdings table's updated_at column automatically on every update
-- This helps track when prices were last updated
ALTER TABLE holdings MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

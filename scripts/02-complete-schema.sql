-- StockAI Complete Database Schema
-- Comprehensive schema for stock trading platform with user management, holdings, transactions, and more

-- ============================================================================
-- USER MANAGEMENT & AUTHENTICATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  password_hash VARCHAR(255),
  balance NUMERIC(15, 2) DEFAULT 0.00,
  total_invested NUMERIC(15, 2) DEFAULT 0.00,
  total_earned NUMERIC(15, 2) DEFAULT 0.00,
  kyc_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
  kyc_document_url VARCHAR(500),
  profile_image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP,
  otp_code VARCHAR(6),
  otp_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================================================
-- STOCK HOLDINGS & POSITIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS holdings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL,
  avg_price NUMERIC(10, 4) NOT NULL,
  current_price NUMERIC(10, 4),
  last_trading_price NUMERIC(10, 4),
  last_price_updated_at TIMESTAMP,
  buy_value NUMERIC(15, 2),
  current_value NUMERIC(15, 2),
  pnl NUMERIC(15, 2),
  pnl_percent NUMERIC(10, 4),
  total_invested NUMERIC(15, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

CREATE INDEX idx_holdings_user_id ON holdings(user_id);
CREATE INDEX idx_holdings_symbol ON holdings(symbol);
CREATE INDEX idx_holdings_user_symbol ON holdings(user_id, symbol);

-- ============================================================================
-- TRANSACTIONS & TRADING HISTORY
-- ============================================================================

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- buy, sell, deposit, withdrawal, dividend
  symbol VARCHAR(20),
  quantity NUMERIC(10, 2),
  price_per_unit NUMERIC(10, 4),
  total_amount NUMERIC(15, 2) NOT NULL,
  commission NUMERIC(10, 2) DEFAULT 0,
  tax NUMERIC(10, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'completed', -- pending, completed, failed, cancelled
  description TEXT,
  reference_id VARCHAR(100),
  executed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_symbol ON transactions(symbol);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

-- ============================================================================
-- OPTIONS TRADING
-- ============================================================================

CREATE TABLE IF NOT EXISTS options_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  contract_type VARCHAR(10) NOT NULL, -- CE (Call) or PE (Put)
  strike_price NUMERIC(10, 4) NOT NULL,
  expiry_date DATE NOT NULL,
  quantity NUMERIC(10, 2) NOT NULL,
  entry_price NUMERIC(10, 4) NOT NULL,
  current_price NUMERIC(10, 4),
  pnl NUMERIC(15, 2),
  pnl_percent NUMERIC(10, 4),
  status VARCHAR(50) DEFAULT 'open', -- open, closed, expired
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

CREATE INDEX idx_options_user_id ON options_contracts(user_id);
CREATE INDEX idx_options_symbol ON options_contracts(symbol);
CREATE INDEX idx_options_expiry ON options_contracts(expiry_date);

-- ============================================================================
-- WATCHLIST & ALERTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  added_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, symbol)
);

CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);

CREATE TABLE IF NOT EXISTS price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  alert_type VARCHAR(50) NOT NULL, -- above, below
  target_price NUMERIC(10, 4) NOT NULL,
  is_triggered BOOLEAN DEFAULT FALSE,
  triggered_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX idx_price_alerts_active ON price_alerts(is_active);

-- ============================================================================
-- PAYMENTS & RAZORPAY INTEGRATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  razorpay_signature VARCHAR(255),
  amount NUMERIC(15, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  payment_method VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_razorpay_id ON payments(razorpay_payment_id);
CREATE INDEX idx_payments_status ON payments(status);

-- ============================================================================
-- REFERRALS & REWARDS
-- ============================================================================

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_amount NUMERIC(10, 2) DEFAULT 0,
  is_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  claimed_at TIMESTAMP
);

CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX idx_referrals_referred ON referrals(referred_id);

-- ============================================================================
-- NOTIFICATIONS & MESSAGES
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'general', -- price_alert, trade_execution, payment, reward
  related_symbol VARCHAR(20),
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);

-- ============================================================================
-- MARKET DATA & STOCK INFORMATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS stocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  symbol VARCHAR(20) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  sector VARCHAR(100),
  industry VARCHAR(100),
  market_cap NUMERIC(20, 2),
  pe_ratio NUMERIC(10, 2),
  dividend_yield NUMERIC(10, 4),
  description TEXT,
  website VARCHAR(500),
  logo_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_stocks_symbol ON stocks(symbol);
CREATE INDEX idx_stocks_sector ON stocks(sector);

CREATE TABLE IF NOT EXISTS stock_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stock_id UUID NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  symbol VARCHAR(20) NOT NULL,
  open_price NUMERIC(10, 4),
  high_price NUMERIC(10, 4),
  low_price NUMERIC(10, 4),
  close_price NUMERIC(10, 4),
  volume NUMERIC(15, 0),
  market_date DATE NOT NULL,
  price_timestamp TIMESTAMP DEFAULT NOW(),
  UNIQUE(symbol, market_date)
);

CREATE INDEX idx_stock_prices_symbol ON stock_prices(symbol);
CREATE INDEX idx_stock_prices_date ON stock_prices(market_date DESC);

-- ============================================================================
-- DOCUMENTS & KYC
-- ============================================================================

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- aadhar, pan, passport
  document_url VARCHAR(500) NOT NULL,
  verification_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
  verified_by UUID REFERENCES users(id),
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP
);

CREATE INDEX idx_documents_user_id ON documents(user_id);

-- ============================================================================
-- AUDIT & COMPLIANCE
-- ============================================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id VARCHAR(100),
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE options_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view their own profile" 
  ON users FOR SELECT 
  USING (auth.uid()::text = id::text OR auth.role() = 'admin');

CREATE POLICY "Users can update their own profile" 
  ON users FOR UPDATE 
  USING (auth.uid()::text = id::text);

-- Holdings policies
CREATE POLICY "Users can view their own holdings" 
  ON holdings FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own holdings" 
  ON holdings FOR INSERT 
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own holdings" 
  ON holdings FOR UPDATE 
  USING (auth.uid()::text = user_id::text);

-- Transactions policies
CREATE POLICY "Users can view their own transactions" 
  ON transactions FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own transactions" 
  ON transactions FOR INSERT 
  WITH CHECK (auth.uid()::text = user_id::text);

-- Similar policies for other tables...
CREATE POLICY "Users can view their own options contracts" 
  ON options_contracts FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own watchlist" 
  ON watchlist FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own alerts" 
  ON price_alerts FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own payments" 
  ON payments FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own documents" 
  ON documents FOR SELECT 
  USING (auth.uid()::text = user_id::text);

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to calculate PnL when holdings are updated
CREATE OR REPLACE FUNCTION update_holdings_pnl()
RETURNS TRIGGER AS $$
BEGIN
  NEW.pnl = (NEW.current_price - NEW.avg_price) * NEW.quantity;
  IF NEW.avg_price > 0 THEN
    NEW.pnl_percent = ((NEW.current_price - NEW.avg_price) / NEW.avg_price) * 100;
  END IF;
  NEW.current_value = NEW.current_price * NEW.quantity;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_holdings_pnl
BEFORE UPDATE ON holdings
FOR EACH ROW
EXECUTE FUNCTION update_holdings_pnl();

-- Function to update user balance on transaction completion
CREATE OR REPLACE FUNCTION update_user_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    IF NEW.type = 'deposit' THEN
      UPDATE users SET balance = balance + NEW.total_amount WHERE id = NEW.user_id;
    ELSIF NEW.type = 'withdrawal' THEN
      UPDATE users SET balance = balance - NEW.total_amount WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_balance
AFTER UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_user_balance();

-- Function to log all changes to audit_logs
CREATE OR REPLACE FUNCTION audit_log_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, created_at)
  VALUES (
    COALESCE(NEW.user_id, OLD.user_id),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id::text, OLD.id::text),
    to_jsonb(OLD),
    to_jsonb(NEW),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_audit_holdings
AFTER INSERT OR UPDATE OR DELETE ON holdings
FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

CREATE TRIGGER trigger_audit_transactions
AFTER INSERT OR UPDATE OR DELETE ON transactions
FOR EACH ROW EXECUTE FUNCTION audit_log_changes();

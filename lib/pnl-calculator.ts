import { isMarketOpen } from './market-utils'

/**
 * Enhanced P&L Calculator
 * 
 * Handles:
 * 1. Correct P&L calculation: (currentPrice - avgPrice) * quantity
 * 2. Market close scenarios: Uses last trading price until market opens
 * 3. Market open transitions: Uses opening price from next trading day
 */

export interface PriceData {
  symbol: string
  avgPrice: number
  quantity: number
  currentPrice?: number
  lastTradingPrice?: number
}

/**
 * Calculate P&L for holdings
 * @param avgPrice - Average buy price
 * @param currentPrice - Current market price (or last trading price if market closed)
 * @param quantity - Number of shares/lots
 * @returns P&L amount (rounded to 2 decimals)
 */
export function calculatePnL(avgPrice: number, currentPrice: number, quantity: number): number {
  if (isNaN(avgPrice) || isNaN(currentPrice) || isNaN(quantity)) {
    return 0
  }
  const pnl = (currentPrice - avgPrice) * quantity
  // Round to 2 decimal places to avoid floating point errors
  return Math.round(pnl * 100) / 100
}

/**
 * Calculate P&L percentage
 * @param avgPrice - Average buy price
 * @param currentPrice - Current market price
 * @returns P&L percentage
 */
export function calculatePnLPercent(avgPrice: number, currentPrice: number): number {
  if (isNaN(avgPrice) || avgPrice === 0) {
    return 0
  }
  return ((currentPrice - avgPrice) / avgPrice) * 100
}

/**
 * Get effective price for P&L calculation considering market status
 * 
 * Logic:
 * - If market is OPEN: use currentPrice
 * - If market is CLOSED: use lastTradingPrice (stored from yesterday's close)
 *   This ensures deterministic P&L until market opens
 * - When market opens: it will fetch fresh prices, and if they're different,
 *   the lastTradingPrice will be updated for next close
 */
export function getEffectivePrice(
  currentPrice: number | undefined,
  lastTradingPrice: number | undefined,
  fallbackPrice: number
): number {
  const market = isMarketOpen()
  
  // Always use current price if available (live or last trading price)
  // This shows real P&L even when market is closed
  if (typeof currentPrice === 'number' && !isNaN(currentPrice) && currentPrice > 0) {
    return currentPrice
  }
  
  // Use last trading price if current price not available
  if (typeof lastTradingPrice === 'number' && !isNaN(lastTradingPrice) && lastTradingPrice > 0) {
    return lastTradingPrice
  }
  
  // Last resort: use fallback (entry price or previous known price)
  return isNaN(fallbackPrice) || fallbackPrice <= 0 ? 0 : fallbackPrice
}

/**
 * Calculate portfolio metrics
 */
export function calculatePortfolioMetrics(holdings: Array<{
  avgPrice: number
  quantity: number
  currentValue: number
  pnl: number
}>) {
  const totalInvested = holdings.reduce((sum, h) => {
    const investedValue = h.avgPrice * h.quantity
    return sum + (isNaN(investedValue) ? 0 : investedValue)
  }, 0)
  
  const totalCurrentValue = holdings.reduce((sum, h) => {
    return sum + (isNaN(h.currentValue) ? 0 : h.currentValue)
  }, 0)
  
  const totalPnL = totalCurrentValue - totalInvested
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0
  
  return {
    totalInvested: isNaN(totalInvested) ? 0 : totalInvested,
    totalCurrentValue: isNaN(totalCurrentValue) ? 0 : totalCurrentValue,
    totalPnL: isNaN(totalPnL) ? 0 : totalPnL,
    totalPnLPercent: isNaN(totalPnLPercent) ? 0 : totalPnLPercent,
  }
}

/**
 * Store last trading price for a symbol
 * Used to maintain deterministic P&L when market is closed
 */
export function storeLastTradingPrice(
  userEmail: string,
  symbol: string,
  price: number
): void {
  try {
    if (!userEmail || !symbol || isNaN(price) || price <= 0) return
    
    const key = `last_trading_price_${userEmail}`
    const prices = (() => {
      try {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : {}
      } catch {
        return {}
      }
    })()
    
    prices[symbol] = {
      price,
      timestamp: Date.now(),
    }
    
    localStorage.setItem(key, JSON.stringify(prices))
  } catch (error) {
    console.warn('Failed to store last trading price:', error)
  }
}

/**
 * Get last trading price for a symbol
 */
export function getLastTradingPrice(
  userEmail: string,
  symbol: string
): number | undefined {
  try {
    if (!userEmail || !symbol) return undefined
    
    const key = `last_trading_price_${userEmail}`
    const stored = localStorage.getItem(key)
    if (!stored) return undefined
    
    const prices = JSON.parse(stored)
    const data = prices[symbol]
    
    if (data && typeof data.price === 'number' && !isNaN(data.price) && data.price > 0) {
      return data.price
    }
    
    return undefined
  } catch (error) {
    console.warn('Failed to get last trading price:', error)
    return undefined
  }
}

/**
 * Clear all stored trading prices (for logout or reset)
 */
export function clearLastTradingPrices(userEmail: string): void {
  try {
    if (!userEmail) return
    localStorage.removeItem(`last_trading_price_${userEmail}`)
  } catch (error) {
    console.warn('Failed to clear trading prices:', error)
  }
}

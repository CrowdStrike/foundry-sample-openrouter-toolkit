// src/utils/cache.ts

import type { LLMResponse, CacheEntry, ResponseCache } from '../types';
import { CACHE_TTL, MAX_CACHE_SIZE } from './constants';

/**
 * LRU Cache implementation for LLM responses
 */
export class LRUResponseCache implements ResponseCache {
  private cache = new Map<string, CacheEntry<LLMResponse>>();
  private maxSize: number;
  private defaultTtl: number;

  constructor(maxSize: number = MAX_CACHE_SIZE, defaultTtl: number = CACHE_TTL) {
    this.maxSize = maxSize;
    this.defaultTtl = defaultTtl;
  }

  get(key: string): LLMResponse | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.totalMisses++;
      return null;
    }
    
    // Check if entry has expired
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      this.totalMisses++;
      return null;
    }
    
    // Move to end (most recently used) by deleting and re-setting
    this.cache.delete(key);
    this.cache.set(key, entry);
    
    this.totalHits++;
    return entry.data;
  }

  set(key: string, value: LLMResponse, ttl: number = this.defaultTtl): void {
    // Remove oldest entries if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    
    const entry: CacheEntry<LLMResponse> = {
      data: value,
      timestamp: Date.now(),
      ttl
    };
    
    // Delete and re-add to ensure it's at the end (most recent)
    this.cache.delete(key);
    this.cache.set(key, entry);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  /**
   * Remove expired entries from cache
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
    totalHits: number;
    totalMisses: number;
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.totalHits / (this.totalHits + this.totalMisses) || 0,
      totalHits: this.totalHits,
      totalMisses: this.totalMisses
    };
  }

  private totalHits = 0;
  private totalMisses = 0;
}

// Export a singleton instance
export const responseCache = new LRUResponseCache();

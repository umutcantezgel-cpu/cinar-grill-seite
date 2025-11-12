/**
 * Real User Monitoring (RUM) for Core Web Vitals
 * Tracks LCP, INP, CLS, TTFB and sends to first-party endpoint
 * Version: 3.0.0
 */

import type { Metric } from 'web-vitals';

/**
 * RUM Configuration
 */
interface RUMConfig {
  endpoint: string;
  sampleRate: number;  // 0-1 (1 = 100% of users)
  debug: boolean;
}

const DEFAULT_CONFIG: RUMConfig = {
  endpoint: '/api/analytics/vitals',
  sampleRate: 1.0,  // Track all users (adjust in production)
  debug: false,
};

/**
 * Check if user has given analytics consent
 */
function hasAnalyticsConsent(): boolean {
  try {
    const consent = localStorage.getItem('cinar-consent');
    if (!consent) return false;

    const consentData = JSON.parse(consent);
    return consentData.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Check if this pageview should be sampled
 */
function shouldSample(sampleRate: number): boolean {
  return Math.random() < sampleRate;
}

/**
 * Get session ID (or create new one)
 */
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('rum-session-id');

  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('rum-session-id', sessionId);
  }

  return sessionId;
}

/**
 * Get device/connection info
 */
function getDeviceInfo() {
  const nav = navigator as any;  // Type assertion for experimental APIs

  return {
    deviceType: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    connection: nav.connection ? {
      effectiveType: nav.connection.effectiveType,
      downlink: nav.connection.downlink,
      rtt: nav.connection.rtt,
      saveData: nav.connection.saveData,
    } : null,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
  };
}

/**
 * Send metric to backend
 */
function sendMetric(metric: Metric, config: RUMConfig) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    sessionId: getSessionId(),
    url: window.location.href,
    timestamp: Date.now(),
    device: getDeviceInfo(),
  });

  // Use sendBeacon if available (non-blocking)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(config.endpoint, body);
  } else {
    // Fallback to fetch with keepalive
    fetch(config.endpoint, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch((error) => {
      if (config.debug) {
        console.error('[RUM] Failed to send metric:', error);
      }
    });
  }

  if (config.debug) {
    console.log('[RUM]', metric.name, metric.value, metric.rating);
  }
}

/**
 * Initialize RUM tracking
 * Must be called after user consent is given
 */
export async function initRUM(userConfig: Partial<RUMConfig> = {}) {
  const config = { ...DEFAULT_CONFIG, ...userConfig };

  // Check consent
  if (!hasAnalyticsConsent()) {
    if (config.debug) {
      console.log('[RUM] Analytics consent not given, skipping');
    }
    return;
  }

  // Check sample rate
  if (!shouldSample(config.sampleRate)) {
    if (config.debug) {
      console.log('[RUM] User not sampled, skipping');
    }
    return;
  }

  // Dynamically import web-vitals (code-split)
  try {
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');

    // Track Core Web Vitals
    onCLS((metric) => sendMetric(metric, config));
    onINP((metric) => sendMetric(metric, config));
    onLCP((metric) => sendMetric(metric, config));

    // Track additional metrics
    onFCP((metric) => sendMetric(metric, config));
    onTTFB((metric) => sendMetric(metric, config));

    if (config.debug) {
      console.log('[RUM] Initialized successfully');
    }
  } catch (error) {
    console.error('[RUM] Failed to initialize:', error);
  }
}

/**
 * Track custom event
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  if (!hasAnalyticsConsent()) {
    return;
  }

  const body = JSON.stringify({
    type: 'event',
    name: eventName,
    properties,
    sessionId: getSessionId(),
    url: window.location.href,
    timestamp: Date.now(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(DEFAULT_CONFIG.endpoint, body);
  } else {
    fetch(DEFAULT_CONFIG.endpoint, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {});  // Silently fail
  }
}

/**
 * Track page view
 */
export function trackPageView() {
  trackEvent('pageview', {
    title: document.title,
    referrer: document.referrer,
  });
}

/**
 * Utility to track events via the server-side Facebook Conversions API proxy.
 */
export async function trackCapiEvent(eventName: string, customData?: any) {
  try {
    const response = await fetch('/api/fb-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventSourceUrl: window.location.href,
        userData: {
          // You could collect more user data during the quiz and pass it here
          // For now we rely on IP and UA handled on the server
        },
        customData
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to trigger CAPI event:', error);
    return { status: 'error', error };
  }
}

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
    sendDefaultPii: false,
    tracesSampleRate: 0.05,
    beforeSend(event) {
      const exception = event.exception?.values?.[0];
      const errorMessage = exception?.value ?? event.message ?? "";
      const embeddedBrowserBridgeErrors = [
        "Error invoking postMessage: Java object is gone",
        "Error invoking postMessage: Java exception was raised during method invocation",
        "Error invoking postMessage: Java bridge method invocation error",
        "Error invoking sendPromoExtensionPromoCodeAutofillResult",
        "Error invoking enableDidUserTypeOnKeyboardLogging: Java object is gone",
        "undefined is not an object (evaluating 'window.webkit.messageHandlers')",
      ];
      const isEmbeddedBrowserBridgeNoise = embeddedBrowserBridgeErrors.some((message) =>
        errorMessage.includes(message),
      );

      const browserName = String(
        event.contexts?.browser?.name ?? event.tags?.browser ?? event.tags?.["browser.name"] ?? "",
      );
      const isTikTokWebview = /^TikTok$/i.test(browserName);
      const isInstagramWebview = /^Instagram$/i.test(browserName);
      const isTikTokInjectedAppendChildError =
        isTikTokWebview &&
        errorMessage.includes("Failed to execute 'appendChild' on 'Node': Identifier 'c' has already been declared");
      const isInstagramConnectionClosed = isInstagramWebview && /^Connection closed\.?$/i.test(errorMessage.trim());

      if (isEmbeddedBrowserBridgeNoise || isTikTokInjectedAppendChildError || isInstagramConnectionClosed) {
        return null;
      }

      delete event.user;
      if (event.request) {
        delete event.request.cookies;
        delete event.request.data;
      }
      return event;
    },
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

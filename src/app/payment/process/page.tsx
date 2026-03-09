import { Suspense } from "react";
import { PaymentProcessClient } from "./payment-process-client";

export default function PaymentProcessPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
          Loading...
        </main>
      }
    >
      <PaymentProcessClient />
    </Suspense>
  );
}

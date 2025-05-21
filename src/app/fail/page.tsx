import { Suspense } from "react";
import FailPageContent from "./FailPageContent";

export default function FailPage() {
  return (
    <Suspense fallback={<div />}>
      <FailPageContent />
    </Suspense>
  );
}

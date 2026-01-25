import { ReactNode } from "react";

export default function QuizSlugLayout({ children }: { children: ReactNode }) {
  // Override parent layout styles for the quiz page to use dark theme
  return <>{children}</>;
}

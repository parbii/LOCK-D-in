"use client";

import { getPasswordAdvice, type PasswordAdviceOutput } from "@/ai/flows/password-advisor";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export function PasswordStrength({ password }: { password?: string }) {
  const [advice, setAdvice] = useState<PasswordAdviceOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const debouncedPassword = useDebounce(password, 500);

  useEffect(() => {
    if (!debouncedPassword || debouncedPassword.length < 8) {
      setAdvice(null);
      setLoading(false);
      return;
    }

    async function fetchAdvice() {
      setLoading(true);
      try {
        const result = await getPasswordAdvice({ password: debouncedPassword });
        setAdvice(result);
      } catch (error) {
        console.error("Error fetching password advice:", error);
        setAdvice(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, [debouncedPassword]);

  const strengthInfo = useMemo(() => {
    if (!advice?.strength) return { text: "Unknown", color: "text-muted-foreground" };
    switch (advice.strength.toLowerCase()) {
      case "strong":
        return { text: "Strong", color: "text-green-500" };
      case "moderate":
        return { text: "Moderate", color: "text-yellow-500" };
      case "weak":
        return { text: "Weak", color: "text-destructive" };
      default:
        return { text: advice.strength, color: "text-muted-foreground" };
    }
  }, [advice]);

  if (!password) {
    return null;
  }

  return (
    <div className="space-y-2 pt-2 text-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-muted-foreground">Password Strength</h4>
        <div className="flex items-center gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            advice && <span className={cn("font-semibold", strengthInfo.color)}>{strengthInfo.text}</span>
          )}
        </div>
      </div>
      
      {advice?.suggestions && advice.suggestions.length > 0 && (
        <div className="space-y-1 rounded-md border bg-muted/50 p-3">
          <p className="font-medium">Suggestions:</p>
          <ul className="space-y-1">
            {advice.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

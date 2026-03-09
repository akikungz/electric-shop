"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useShop } from "@/context/shop-context";

export default function LoginPage() {
  const { locale, navigate, login, isAuthenticated } = useShop();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageShell
      title={locale === "th" ? "เข้าสู่ระบบ" : "Login"}
      subtitle={
        locale === "th"
          ? "เข้าสู่ระบบเพื่อดำเนินการสั่งซื้อ"
          : "Sign in to continue shopping."
      }
    >
      <form
        className="mx-auto max-w-xl"
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage(null);
          setIsSubmitting(true);

          const result = await login(identity, password);
          setIsSubmitting(false);

          if (!result.success) {
            setErrorMessage(result.message ?? "Login failed");
            return;
          }

          navigate("/");
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{locale === "th" ? "เข้าสู่ระบบ" : "Sign In"}</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="login-identity">
                    Phone or Email
                  </FieldLabel>
                  <Input
                    id="login-identity"
                    required
                    placeholder="name@example.com"
                    value={identity}
                    onChange={(event) => setIdentity(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    id="login-password"
                    required
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            {errorMessage ? (
              <p className="mt-4 text-sm text-destructive">{errorMessage}</p>
            ) : null}
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {locale === "th" ? "เข้าสู่ระบบ" : "Login"}
            </Button>
            <p className="text-sm text-muted-foreground">
              {locale === "th" ? "ยังไม่มีบัญชี?" : "No account yet?"}{" "}
              <Link href="/register" className="font-semibold text-primary">
                {locale === "th" ? "สมัครสมาชิก" : "Register"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </PageShell>
  );
}

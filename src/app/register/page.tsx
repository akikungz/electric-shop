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

export default function RegisterPage() {
  const { locale, navigate, register, isAuthenticated } = useShop();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
      title={locale === "th" ? "สมัครสมาชิก" : "Create Account"}
      subtitle={
        locale === "th"
          ? "สมัครเพื่อเริ่มต้นสั่งซื้อ"
          : "Register to start your first order."
      }
    >
      <form
        className="mx-auto max-w-xl"
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage(null);
          setIsSubmitting(true);

          const result = await register({
            name,
            phone,
            email,
            password,
          });

          setIsSubmitting(false);

          if (!result.success) {
            setErrorMessage(result.message ?? "Register failed");
            return;
          }

          navigate("/profile");
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "th" ? "สร้างบัญชีใหม่" : "Create Your Account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="register-name">
                    {locale === "th" ? "ชื่อ" : "Name"}
                  </FieldLabel>
                  <Input
                    id="register-name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="register-phone">
                    {locale === "th" ? "เบอร์โทรศัพท์" : "Phone"}
                  </FieldLabel>
                  <Input
                    id="register-phone"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="register-email">Email</FieldLabel>
                  <Input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="register-password">Password</FieldLabel>
                  <Input
                    id="register-password"
                    required
                    type="password"
                    minLength={8}
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
              {locale === "th" ? "สร้างบัญชี" : "Create Account"}
            </Button>
            <p className="text-sm text-muted-foreground">
              {locale === "th" ? "มีบัญชีแล้ว?" : "Already have an account?"}{" "}
              <Link href="/login" className="font-semibold text-primary">
                {locale === "th" ? "เข้าสู่ระบบ" : "Login"}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </PageShell>
  );
}

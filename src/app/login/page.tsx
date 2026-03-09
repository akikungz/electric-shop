"use client";

import Link from "next/link";
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
  const { locale, navigate } = useShop();

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
        onSubmit={(event) => {
          event.preventDefault();
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
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Input
                    id="login-password"
                    required
                    type="password"
                    placeholder="********"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3">
            <Button type="submit">
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

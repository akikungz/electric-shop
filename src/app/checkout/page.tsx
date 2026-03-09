"use client";

import {
  BadgeCheck,
  Banknote,
  CreditCard,
  Landmark,
  type LucideIcon,
  MapPinHouse,
  QrCode,
} from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useShop } from "@/context/shop-context";
import type { PaymentMethod } from "@/types/domain";

const methods: PaymentMethod[] = [
  "credit-card",
  "debit-card",
  "qr-code",
  "cod",
];

export default function CheckoutPage() {
  const { locale, profile, checkout, cartItemsDetailed, navigate } = useShop();
  const [phone, setPhone] = useState(profile.phone);
  const [line1, setLine1] = useState(profile.address.line1);
  const [district, setDistrict] = useState(profile.address.district);
  const [province, setProvince] = useState(profile.address.province);
  const [postalCode, setPostalCode] = useState(profile.address.postalCode);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit-card");

  const paymentText: Record<PaymentMethod, string> = {
    "credit-card": locale === "th" ? "บัตรเครดิต" : "Credit Card",
    "debit-card": locale === "th" ? "บัตรเดบิต" : "Debit Card",
    "qr-code": locale === "th" ? "คิวอาร์โค้ด" : "QR Code",
    cod: locale === "th" ? "เก็บเงินปลายทาง" : "Cash on Delivery",
  };

  const paymentIcons: Record<PaymentMethod, LucideIcon> = {
    "credit-card": CreditCard,
    "debit-card": Landmark,
    "qr-code": QrCode,
    cod: Banknote,
  };

  return (
    <PageShell
      title={locale === "th" ? "ชำระเงิน" : "Checkout"}
      subtitle={
        locale === "th"
          ? "ยืนยันที่อยู่และวิธีชำระเงิน"
          : "Confirm address and payment method."
      }
    >
      <form
        className="mx-auto max-w-3xl"
        onSubmit={async (event) => {
          event.preventDefault();
          const orderId = await checkout({
            address: { line1, district, province, postalCode },
            phone,
            paymentMethod,
          });

          if (orderId) {
            navigate(`/order/${orderId}/confirmation`);
          }
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinHouse />
              {locale === "th" ? "ข้อมูลการจัดส่ง" : "Delivery Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <FieldSet>
              <FieldGroup className="grid gap-3 md:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="checkout-phone">
                    {locale === "th" ? "เบอร์โทรศัพท์" : "Phone"}
                  </FieldLabel>
                  <Input
                    id="checkout-phone"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-line1">
                    {locale === "th" ? "ที่อยู่" : "Address"}
                  </FieldLabel>
                  <Input
                    id="checkout-line1"
                    required
                    value={line1}
                    onChange={(event) => setLine1(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-district">
                    {locale === "th" ? "เขต/อำเภอ" : "District"}
                  </FieldLabel>
                  <Input
                    id="checkout-district"
                    required
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-province">
                    {locale === "th" ? "จังหวัด" : "Province"}
                  </FieldLabel>
                  <Input
                    id="checkout-province"
                    required
                    value={province}
                    onChange={(event) => setProvince(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-postal-code">
                    {locale === "th" ? "รหัสไปรษณีย์" : "Postal Code"}
                  </FieldLabel>
                  <Input
                    id="checkout-postal-code"
                    required
                    value={postalCode}
                    onChange={(event) => setPostalCode(event.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSet>
              <FieldLegend>
                {locale === "th" ? "วิธีชำระเงิน" : "Payment Method"}
              </FieldLegend>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setPaymentMethod(value as PaymentMethod)
                }
                className="grid gap-2 sm:grid-cols-2"
              >
                {methods.map((method) => {
                  const Icon = paymentIcons[method];

                  return (
                    <Field
                      key={method}
                      orientation="horizontal"
                      className="rounded-md border px-3 py-2"
                    >
                      <RadioGroupItem value={method} id={`payment-${method}`} />
                      <FieldLabel htmlFor={`payment-${method}`}>
                        <span className="flex items-center gap-2">
                          <Icon />
                          {paymentText[method]}
                        </span>
                      </FieldLabel>
                    </Field>
                  );
                })}
              </RadioGroup>
            </FieldSet>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-3">
            <Badge variant="secondary">
              {locale === "th" ? "สินค้าในตะกร้า" : "Items in cart"}:{" "}
              {cartItemsDetailed.length}
            </Badge>
            <Button type="submit" disabled={!cartItemsDetailed.length}>
              <BadgeCheck data-icon="inline-start" />
              {locale === "th" ? "ยืนยันการสั่งซื้อ" : "Confirm Order"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </PageShell>
  );
}

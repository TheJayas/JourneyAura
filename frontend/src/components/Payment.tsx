/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e45EGOuNKFT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Enter your payment details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" maxLength={16} placeholder="0000 0000 0000 0000" type="text" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiration">Expiration</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select>
                  <SelectTrigger id="expiration-month">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent />
                </Select>
                <Select>
                  <SelectTrigger id="expiration-year">
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" maxLength={3} placeholder="123" type="text" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input id="cardholderName" placeholder="John Doe" type="text" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Pay</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$99.99</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$9.99</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>$109.98</span>
          </div>
          <div>
            <p>1 x Acme Product</p>
            <p className="text-gray-500 dark:text-gray-400">A high-quality product from Acme Inc.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
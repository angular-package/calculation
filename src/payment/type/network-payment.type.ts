export type NetworkPayment<Additional extends string> =
  | 'Visa'
  | 'Mastercard'
  | 'American Express'
  | 'Discover'
  | Additional;

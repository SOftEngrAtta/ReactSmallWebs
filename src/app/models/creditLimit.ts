export class CreditLimit {
    IsOrderAllowed: boolean
    Message: string
    AvailableCreditLimit: number
    OrderCurrencySymbol: string
    RequiredAuctionDeposit: number
    CreditLimitAfterMinAuctionDeposit: number
    IsOrderCreditCheckSkipRequested: boolean
    AvailedMinimumAuctionDeposit: number
    MinimumAuctionDepositAmount: number
    RemainingCreditLimit: number
    CustomerAvailableFunds: number
    IsError: boolean
  }
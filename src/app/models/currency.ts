export class Currency{
	id: number
	name: string
	currencyCode: string
	symbol: string
}

export class AvailableCurrency {
	EncryptedCurrencyId: string
	CurrencyName: string
	CurrencySymbol: string
	CurrencyCode: string
	MaxPaypalDepositLimitUSD: number
	MaxPaypalDepositLimitJPY: number
}
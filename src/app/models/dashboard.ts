import { CarProcess } from "./carProcess";

export class DashBoard{
	CarProcess: CarProcess = new CarProcess;
	Customer: any
	CustomerDetails: any
	FavouritesList: any[]=[]
	FundsDetails: any
	RecentActivitylist: any[]=[]
	JDateTime : any 
	JCurrencyRate : any 
}
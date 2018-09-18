export class SalesStatics{
    year = {
        Min : '' ,
        Max : ''   
    }
    mileage = {
        Min : '',
        Max : ''
    }
    consditions : Array<string>
    queryParam = {
        modelId : 0,
        year : 0,
        minMileage : 0,
        maxMileage : 0,
        condition : 0,
        page : 0,
        count : 0
    }
    data : Array<string>
    averageValue : any ;

}
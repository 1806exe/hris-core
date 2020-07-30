export interface Comparison {
    left:string;
    operator:string;
    right:string;
}
export interface AnalyticsDimensions { 
    dx: string[]; 
    ou: string[]; 
    pe: string[];
    startDate:string;
    endDate:string;
    other: {[id:string]:Comparison|string}
}
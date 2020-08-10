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
    providers?:Comparison|string;
    certification?:Comparison|string;
    sections?:Comparison|string;
    units?:Comparison|string;
    curriculums?:Comparison|string;
    topics?:Comparison|string;
    sponsors?:Comparison|string;
    organizers?:Comparison|string;
    deliverymode?:Comparison|string;
    other: {[id:string]:Comparison|string}
}
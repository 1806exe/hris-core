/**
 * 
 */
export interface Payload {
    lookup: string[];
    entities: Entities;
}

/**
 * 
 */
export interface Entities {
    [key: string]: string;
}

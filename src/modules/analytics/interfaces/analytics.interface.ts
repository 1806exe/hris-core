export interface AnalyticsHeader {
  name: string;
  column: string;
  valueType: string;
  type: string;
  hidden: boolean;
  meta: boolean;
}

export interface Ou {
  name: string;
}

export interface Dx {
  name: string;
}

export interface Pe {
  name: string;
}

export interface Other {
  name: string;
}

export interface Items {
  [prop: string]: Ou | Dx | Pe | Other;
}

export interface Dimensions {
  dx: string[];
  pe: string[];
  ou: string[];
  co: any[];
}

export interface MetaData {
  items: Items;
  dimensions: Dimensions;
}

export interface Analytics {
  headers: AnalyticsHeader[];
  metaData: MetaData;
  rows: any[];
  width?: number;
  height?: number;
}

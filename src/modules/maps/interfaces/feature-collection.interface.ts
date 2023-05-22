import { Document } from 'mongoose';

export interface FeatureCollection extends Document {
  type: string;
  name: string;
  features: Feature[];
}

export interface Feature extends Document {
  type: string;
  properties: Properties;
  geometry: Geometry;
  featureCollection: FeatureCollection;
}

export interface Properties {
  OBJECTID: number;
  nameEn: string;
  ID_0: number;
  Shape_Length: number;
  Shape_Area: number;
  nameAr: string;
}

export interface Geometry {
  type: string;
  coordinates: number[][][][];
}
export interface Crs {
  type: string;
  properties: Properties;
}

export interface Properties {
  name: string;
  OBJECTID: number;
  nameEn: string;

  ID_0: number;
  Shape_Length: number;
  Shape_Area: number;

  ID_2: number;
  nameAr: string;
  NAME_1: string;
  ID_1: number;
  NAME_0: string;
  osm_id: string;
  code: number;
  fclass: string;
  type: string;
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Root {
  type: string;
  name: string;
  crs: Crs;
  features: Feature[];
}

export interface Crs {
  type: string;
  properties: Properties;
}

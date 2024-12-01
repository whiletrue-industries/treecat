import { Injectable } from '@angular/core';

export enum ClimateArea {
  Mountain = 'Mountain',
  Desert = 'Desert',
  Coastal = 'Coastal',
  Valley = 'Valley',
}

export enum SidewalkWidth {
  Narrow = 'Narrow',
  Medium = 'Medium',
  Wide = 'Wide',
}

export enum BlossomColor {
  Lilac = 'Lilac',
  Purple = 'Purple',
  LightPink = 'Light Pink',
  Pink = 'Pink',
  LightYellow = 'Light Yellow',
  Yellow = 'Yellow',
  White = 'White',
  Red = 'Red',
  Orange = 'Orange',
  Cream = 'Cream',
  Chartreuse = 'Chartreuse',
  Green = 'Green',
}

export enum CanopyShape {
  Pyramidal = 'Pyramidal', // פירמידלי
  Columnar = 'Columnar', // זקוף
  Umbrella = 'Umbrella', // סוככני
  Weeping = 'Weeping', // בכותי
  Rounded = 'Rounded', // מעוגל
  Oval = 'Oval', // סגלגל
  Winged = 'Winged', // כנפי
  Fan = 'Fan', // מניפה
  Notched = 'Notched', // מנוצה
  Conical = 'Conical', // צריפי
  Elaborate = 'Elaborate', // מבודר
}

export class Photo {
  constructor(others: Partial<Photo> = {}) {
    Object.assign(this, others);
  }

  url: string;
  kind: string;
  photographer: string;
  license: string;
}

class Tree {
  constructor(others: Partial<Tree> = {}) {
    Object.assign(this, others);
  }

  id: string;
  name: string;
  description: string;
  botanicalName: string;
  treeType: string[];
  climateArea: ClimateArea[];
  sidewalkWidth: SidewalkWidth;
  catalogs: string[];
  blossomColor: BlossomColor[];
  canopyShape: CanopyShape;
  soilType: string[];
  canopyHeight: string;
  canopyWidth: string;
  blossomSeason: string;
  wateringScale: number;
  cleaningRequirement: boolean;
  extraWatering: number;
  deciduous: string;
  growthRate: string;
  brittlenessCoefficient: number;
  sources: string[];

  photos: Photo[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}

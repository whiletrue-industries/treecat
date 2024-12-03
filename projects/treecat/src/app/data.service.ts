import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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

export enum BloomColor {
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
  height: number;
  width: number;
  photographer: string;
  license: string;
  link: string;
}

export class Source {
  constructor(others: Partial<Source> = {}) {
    Object.assign(this, others);
  }

  name: string;
  organizations: string;
  authors: string;
  url: string;
  year: string;
}

export class Tree {
  constructor(others: Partial<Tree> = {}) {
    Object.assign(this, others);
  }

  id: string;
  name: string;
  catalogs: string[];
  recommended: boolean;
  botanicalName: string;
  treeType: string[];
  sidewalkWidth: SidewalkWidth;
  sidewalkWidthHe: string;
  climateArea: ClimateArea[];
  climateAreaHe: string[];
  soilType: string[];
  canopyWidth: string;
  canopyHeight: string;
  deciduous: string;
  canopyShape: CanopyShape;
  canopyShapeHe: string;
  bloomColor: BloomColor[];
  bloomColorHe: string[];
  bloomSeason: string[];
  wateringScale: number;
  extraWatering: string;
  growthRate: string;
  cleaningRequired: boolean;
  brittlenessCoefficient: number;
  
  sources: Source[];
  photos: Photo[] = [];
  mainPhoto: Photo | null;

  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL = 'https://storage.googleapis.com/treecat-assets/trees.json';
  trees = new ReplaySubject<Tree[]>(1);

  constructor(private httpClient: HttpClient) {
  }

  fetchTrees() {
    this.httpClient.get<Tree[]>(this.URL).subscribe(trees => {
      this.trees.next(trees);
    });
  }
}

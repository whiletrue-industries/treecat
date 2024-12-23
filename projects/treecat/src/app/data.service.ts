import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject, take } from 'rxjs';

export enum ClimateArea {
  Mountain = 'Mountain',
  Desert = 'Desert',
  Coastal = 'Coastal',
  Valley = 'Valley',
}

export enum SidewalkWidth {
  Narrow = 'narrow',
  Medium = 'medium',
  Wide = 'wide',
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
  ratio: number;

  base: string;
}

export class Source {
  constructor(others: Partial<Source> = {}) {
    Object.assign(this, others);
  }

  id: number;
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
  isWaterEconomical: boolean;
  extraWatering: string;
  growthRate: string;
  cleaningRequired: boolean;
  brittlenessCoefficient: number;
  isNative: boolean;
  speciesValue: number;
  hasNectar: boolean;
  notesGeneral: string;
  notesMaintenance: string;
  
  sources: Source[];
  photos: Photo[] = [];
  mainPhoto: Photo | null;

  
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL = 'https://storage.googleapis.com/treecat-assets/trees.json';
  trees = new ReplaySubject<Tree[]>(1);
  fetched = false;

  constructor(private httpClient: HttpClient) {
  }

  fetchTrees() {
    if (this.fetched) {
      return;
    }
    this.httpClient.get<Tree[]>(this.URL).subscribe(trees => {
      this.trees.next(trees);
    });
  }

  fetchTree(id: string) {
    return this.trees.pipe(
      take(1),
      map(trees => trees.find(tree => tree.id === id))
    );
  }
}

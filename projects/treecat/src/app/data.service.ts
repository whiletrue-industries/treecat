import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject, take } from 'rxjs';
import { environment } from '../environments/environment';

export enum ClimateArea {
  Mountain = 'Mountain',
  Desert = 'Desert',
  Coastal = 'Coastal',
  Valley = 'Valley',
  All = 'all',
}

export enum SidewalkWidth {
  Narrow = 'narrow',
  Medium = 'medium',
  Wide = 'wide',
  All = 'all',
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
  Oval = 'Oval', // סגלגל
  Rounded = 'Rounded', // מעוגל
  Weeping = 'Weeping', // בכותי
  Umbrella = 'Umbrella', // סוככני
  Columnar = 'Columnar', // זקוף
  Pyramidal = 'Pyramidal', // פירמידלי
  Elaborate = 'Elaborate', // מבודר
  Conical = 'Conical', // צריפי
  Notched = 'Notched', // מנוצה
  Fan = 'Fan', // מניפה
  Winged = 'Winged', // כנפי
}

export const CANOPY_SHAPE_NAME_MAP = {
  [CanopyShape.Pyramidal]: 'פירמידלי',
  [CanopyShape.Columnar]: 'זקוף',
  [CanopyShape.Umbrella]: 'סוככני',
  [CanopyShape.Weeping]: 'בכותי',
  [CanopyShape.Rounded]: 'מעוגל',
  [CanopyShape.Oval]: 'סגלגל',
  [CanopyShape.Winged]: 'כנפי',
  [CanopyShape.Fan]: 'מניפה',
  [CanopyShape.Notched]: 'מנוצה',
  [CanopyShape.Conical]: 'צריפי',
  [CanopyShape.Elaborate]: 'מבודר',
};


export class Photo {
  constructor(others: Partial<Photo> = {}) {
    Object.assign(this, others);
  }

  url: string;
  full_url: string;
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
  DEFAULT_IMAGE_URL = `${environment.base}no-tree-image.jpg`;

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

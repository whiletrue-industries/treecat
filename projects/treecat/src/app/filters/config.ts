import { BloomColor, CANOPY_SHAPE_NAME_MAP, CanopyShape, ClimateArea, SidewalkWidth, Tree } from "../data.service";
import { FIELD_CHOICES_bloomColorHe, FIELD_CHOICES_canopyHeight, FIELD_CHOICES_canopyWidth, FIELD_CHOICES_catalogs, FIELD_CHOICES_deciduous, FIELD_CHOICES_growthRate, FIELD_CHOICES_treeType } from "./list_consts";

export type FilterOption<T> = {key: string, value: T, label: string, extra?: any};

export type FilterConfig<T> = {
    slug: string;
    title: string;
    mandatory?: boolean;
    options: FilterOption<T>[];
    filter: (tree: Tree, options: FilterOption<T>[]) => boolean;
};

export const FC_SIDEWALK_WIDTHS: FilterConfig<SidewalkWidth> = {
    slug: 'sidewalkWidth',
    title: 'רוחב מדרכה',
    mandatory: true,
    options: [
        {key: 'all', value: SidewalkWidth.All, label: 'כל רוחבי המדרכה'},
        {key: 'narrow', value: SidewalkWidth.Narrow, label: 'צרה (1.5-2.5 מ׳)'},
        {key: 'medium', value: SidewalkWidth.Medium, label: 'בינונית (2.5-3.5 מ׳)'},
        {key: 'wide', value: SidewalkWidth.Wide, label: 'רחבה (3.5 מ׳ ומעלה)'},
    ],
    filter: (tree: Tree, options: FilterOption<SidewalkWidth>[]) => options.some(option => option.key === 'all' || tree.sidewalkWidth === option.value),
};

export const FC_CLIMATE_AREAS: FilterConfig<ClimateArea> = {
    slug: 'climateArea',
    title: 'אזור אקלים',
    mandatory: true,
    options: [
        {key: 'all', value: ClimateArea.All, label: 'כל אזורי האקלים'},
        {key: 'Mountain', value: ClimateArea.Mountain, label: 'הר'},
        {key: 'Desert', value: ClimateArea.Desert, label: 'נגב'},
        {key: 'Coastal', value: ClimateArea.Coastal, label: 'שפלה וחוף'},
        {key: 'Valley', value: ClimateArea.Valley, label: 'בקעה וערבה'},
    ],
    filter: (tree: Tree, options: FilterOption<ClimateArea>[]) => options.some(option => option.key === 'all' || tree.climateArea?.includes(option.value)),
};

export const FC_TREE_TYPES: FilterConfig<string> = {
    slug: 'treeType',
    title: 'סוג עץ',
    mandatory: false,
    options: [
        {key: 'all', value: 'all', label: 'כל סוגי העצים'},
        ...FIELD_CHOICES_treeType.map(value => ({key: value, value, label: value})),
    ],
    filter: (tree: Tree, options: FilterOption<string>[]) => options.some(option => option.value === 'all' || tree.treeType?.includes(option.value)),
};

export const FC_TREE_CATALOGS: FilterConfig<string> = {
    slug: 'treeCatalog',
    title: 'קטלוג עצים',
    mandatory: false,
    options: [
        {key: 'all', value: 'all', label: 'כל קטלוגי העצים'},
        ...FIELD_CHOICES_catalogs.map(value => ({key: value, value, label: value})),
    ],
    filter: (tree: Tree, options: FilterOption<string>[]) => options.some(option => option.value === 'all' || tree.catalogs?.includes(option.value)),
};

export const FC_CANOPY_WIDTH: FilterConfig<string> = {
    slug: 'canopyWidth',
    title: 'קוטר צמרת',
    mandatory: false,
    options: FIELD_CHOICES_canopyWidth.map(value => ({key: value, value, label: value})),
    filter: (tree: Tree, options: FilterOption<string>[]) => options.length === 0 || options.some(option => tree.canopyWidth === option.value),
};

export const FC_CANOPY_SHAPE: FilterConfig<CanopyShape> = {
    slug: 'canopyShape',
    title: 'מבנה צמרת',
    mandatory: false,
    options: Object.values(CanopyShape).map(value => ({key: value.toString(), value, label: CANOPY_SHAPE_NAME_MAP[value]})),
    filter: (tree: Tree, options: FilterOption<CanopyShape>[]) => options.length === 0 || options.some(option => tree.canopyShape === option.value),
};

export const FC_CANOPY_HEIGHT: FilterConfig<string> = {
    slug: 'canopyHeight',
    title: 'גובה העץ',
    mandatory: false,
    options: FIELD_CHOICES_canopyHeight.map(value => ({key: value, value, label: value})),
    filter: (tree: Tree, options: FilterOption<string>[]) => options.length === 0 || options.some(option => tree.canopyWidth === option.value),
};

export const FC_BLOOM_COLOR: FilterConfig<BloomColor> = {
    slug: 'bloomColor',
    title: 'צבע פריחה',
    mandatory: false,
    options: (Object.values(BloomColor) as BloomColor[]).map(value => ({key: value.toString(), value, label: value.toString()})),
    filter: (tree: Tree, options: FilterOption<BloomColor>[]) => options.length === 0 || options.some(option => tree.bloomColor?.includes(option.value)),
};

export const FC_WATERING_SCALE: FilterConfig<number> = {
    slug: 'wateringScale',
    title: 'דרוג השקייה',
    mandatory: false,
    options: [0,1,2,3,4,5].map(value => ({key: value.toString(), value, label: value.toString()})),
    filter: (tree: Tree, options: FilterOption<number>[]) => options.length === 0 || options.some(option => Math.round(tree.wateringScale) === option.value),
};

export const FC_GROWTH_RATE: FilterConfig<string> = {
    slug: 'growthRate',
    title: 'קצב צימוח',
    mandatory: false,
    options: FIELD_CHOICES_growthRate.map(value => ({key: value.toString(), value, label: value.toString()})),
    filter: (tree: Tree, options: FilterOption<string>[]) => options.length === 0 || options.some(option => tree.growthRate === option.value),
};

export const FC_CLEANING_REQUIRED: FilterConfig<boolean> = {
    slug: 'cleaningRequired',
    title: 'פרי מחייב ניקוי',
    mandatory: false,
    options: [
        {key: 'true', value: true, label: 'כן'},
        {key: 'false', value: false, label: 'לא'},
    ],
    filter: (tree: Tree, options: FilterOption<boolean>[]) => options.length === 0 || options.some(option => (!!tree.cleaningRequired) === option.value),
};

export const FC_DECIDUOUS: FilterConfig<string> = {
    slug: 'deciduous',
    title: 'נשיר',
    mandatory: false,
    options: FIELD_CHOICES_deciduous.map(value => ({key: value.toString(), value, label: value.toString()})),
    filter: (tree: Tree, options: FilterOption<string>[]) => options.length === 0 || options.some(option => tree.deciduous === option.value),
};


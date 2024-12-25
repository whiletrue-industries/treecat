import { ClimateArea, SidewalkWidth, Tree } from "../data.service";

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
        {key: 'all', value: SidewalkWidth.Narrow, label: 'כל רוחבי המדרכה'},
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
        {key: 'all', value: ClimateArea.Mountain, label: 'כל אזורי האקלים'},
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
        {key: 'street', value: 'עצי רחוב (שדרה)', label: 'עצי רחוב (שדרה)'},
        {key: 'park', value: 'עצי פארק', label: 'עצי פארק'},
        {key: 'square', value: 'עצים המתאימים לכיכרות ובודדים', label: 'עצים המתאימים לכיכרות ובודדים'},
        {key: 'private', value: 'עצים המתאימים לחצר פרטית', label: 'עצים המתאימים לחצר פרטית'},
    ],
    filter: (tree: Tree, options: FilterOption<string>[]) => options.some(option => option.value === 'all' || tree.treeType?.includes(option.value)),
};

export const FC_TREE_CATALOGS: FilterConfig<string> = {
    slug: 'treeCatalog',
    title: 'קטלוג עצים',
    mandatory: false,
    options: [
        {key: 'all', value: 'all', label: 'כל קטלוגי העצים'},
        {key: 'recommended', value: 'מומלצי אתר קטלוג עצי רחוב וצל', label: 'מומלצי אתר קטלוג עצי רחוב וצל'},
        {key: 'recommended-mach', value: 'עצי רחוב מומלצים, משרד החקלאות (2024)', label: 'עצי רחוב מומלצים, משרד החקלאות (2024)'},
        {key: 'recommended-tlv', value: 'רשימת עצים לנטיעה, עיריית ת"א (2022)', label: 'רשימת עצים לנטיעה, עיריית ת"א (2022)'},
        {key: 'recommended-ks', value: 'עצים שניטעו בכפר סבא (2020)', label: 'עצים שניטעו בכפר סבא (2020)'},
        {key: 'recommended-guide', value: 'מדריך עצי הרחוב בישראל (2013)', label: 'מדריך עצי הרחוב בישראל (2013)'},
    ],
    filter: (tree: Tree, options: FilterOption<string>[]) => options.some(option => option.value === 'all' || tree.catalogs?.includes(option.value)),
};
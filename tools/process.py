import os
import json
from pathlib import Path
import dataflows as DF
import dataflows_airtable as DFA
import dotenv
import requests
import boto3
import PIL
from io import BytesIO

ROOT = Path(__file__).parent.parent

dotenv.load_dotenv()
AWS_ACCESS_KEY_ID=os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY=os.environ['AWS_SECRET_ACCESS_KEY']
AWS_ENDPOINT_URL=os.environ['AWS_ENDPOINT_URL']
AWS_BUCKET_NAME=os.environ['AWS_BUCKET_NAME']
AWS_REGION=os.environ['AWS_REGION']
AIRTABLE_APP=os.environ['AIRTABLE_APP']
AIRTABLE_API_KEY=os.environ['AIRTABLE_API_KEY']
FORCE_PHOTOS=False

CANOPY_SHAPE_MAP = {
    'פירמידלי': 'Pyramidal',
    'זקוף': 'Columnar',
    'סוככני': 'Umbrella',
    'בכותי': 'Weeping',
    'מעוגל': 'Rounded',
    'סגלגל': 'Oval',
    'כנפי': 'Winged',
    'מניפה': 'Fan',
    'מנוצה': 'Notched',
    'צריפי': 'Conical',
    'מבודר': 'Elaborate',
}

SIDEWALK_WIDTH_MAP = {
    'צרה': 'narrow',
    'בינונית': 'medium',
    'רחבה': 'wide',
}

CLIMATE_AREA_MAP = {
    'שפלה וחוף': 'Coastal',
    'הר': 'Mountain',
    'נגב': 'Desert',
    'בקעה וערבה': 'Valley',
}

BLOOM_COLOR_MAP = {
    'לילך': 'Lilac',
    'סגול': 'Purple',
    'ורוד בהיר': 'Light Pink',
    'ורוד': 'Pink',
    'צהבהב': 'Light Yellow',
    'צהוב': 'Yellow',
    'לבן': 'White',
    'אדום': 'Red',
    'כתום': 'Orange',
    'לבן-קרם': 'Cream',
    'צהבהב-ירקרק': 'Chartreuse',
    'ירוק': 'Green',
}

FIELD_RENAME_MAP = {
    'שם קטלוגי (עברי)': 'name',
    'שם קטלוגי (מדעי)': 'botanicalName',
    'רשימת עצים': 'catalogs',
    'סוג העץ': 'treeType',
    'תיאור רוחב מדרכה': 'sidewalkWidthHe',
    'אזור אקלים' :'climateAreaHe',
    'התאמה לקרקע': 'soilType',
    'קוטר צמרת': 'canopyWidth',
    "גובה העץ": 'canopyHeight',
    'נשיר': 'deciduous',
    'מבנה צמרת': 'canopyShapeHe',
    'פריחה': 'bloomColorHe',
    'מועדי פריחה': 'bloomSeason',
    'דירוג השקייה': 'wateringScale',
    'חסכוני במים': 'isWaterEconomical',
    'תוספת מים נדרשת לצמח חסכוני': 'extraWatering',
    'קצב צימוח': 'growthRate',
    'פרי מצריך ניקוי': 'cleaningRequired',
    'מקדם שבירות': 'brittlenessCoefficient',
    'מקורות': 'sources',
    'מקומי': 'isNative',
    'ערך מין': 'speciesValue',
    'צופני': 'hasNectar',
    'הערות - כללי': 'notesGeneral',
    'הערות - אחזקה': 'notesMaintenance',
}

def get_warn(obj, field, context):
    if not obj.get(field):
        print(f'Warning: unknown value "{field}" in {context}')
    return obj.get(field)

def get_warn_l(obj, fields, context):
    l = [
        get_warn(obj, field, context)
        for field in (fields or [])
    ]
    return [x for x in l if x]

def concat(names):
    if not names:
        return None
    names = names[:-2] + ['ו '.join(names[-2:])]
    return ', '.join(names)

def process_photo(s3, record, tree_id, photo, new_width, suffix=''):
    tree_part = record['tree_part']
    url = record.get('URL')
    photographer = record['Photographer_Name']
    license = record['License']
    thumbnail = photo['thumbnails']['full']
    photo_url = thumbnail['url']
    height = thumbnail['height']
    width = thumbnail['width']
    photo_id = photo['id']
    if new_width:
        new_height = int(new_width * height / width)
    else:
        new_height = height
        new_width = width
    # Download image from url, resize it to be a constant width (600), update width and height and upload the file to S3 (compatible) bucket:

    # based on the photo_id and the correct extension            
    target_key = f'photos/{photo_id}{suffix}.jpg'
    # Check if the target key already exists in the S3 bucket
    try:
        s3.head_object(Bucket=AWS_BUCKET_NAME, Key=target_key)
        assert not FORCE_PHOTOS
    except (s3.exceptions.ClientError, AssertionError) as e:
        print(f'Processing {tree_id} / {target_key}: {e}')
        # The object does not exist, proceed with processing
        # Download image from url
        response = requests.get(photo_url)
        response.raise_for_status()
        image = PIL.Image.open(PIL.Image.io.BytesIO(response.content))
        # Resize image to be a constant width (600)
        if new_width != width:
            image = image.resize((new_width, new_height))
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        # Save image to a BytesIO object
        image_bytes = BytesIO()
        image.save(image_bytes, format='JPEG')
        image_bytes.seek(0)
        # Upload the file to S3
        s3.upload_fileobj(image_bytes, AWS_BUCKET_NAME, target_key)

    new_url = f'{AWS_ENDPOINT_URL}/{AWS_BUCKET_NAME}/{target_key}'
    photo = dict(
        kind=tree_part,
        photographer=photographer,
        license=license,
        link=url,
        url=new_url,
        width=new_width,
        height=new_height,
        ratio=int(new_width / new_height * 100),
    )
    return photo

def main():

    # prepare S3 client
    s3 = boto3.client('s3', region_name=AWS_REGION, endpoint_url=AWS_ENDPOINT_URL, aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    photos_ = DF.Flow(
        DFA.load_from_airtable(AIRTABLE_APP, 'Photos', view='Grid view', apikey=AIRTABLE_API_KEY),
        # DF.checkpoint('photos'),        
        # DF.printer(),
    ).results()[0][0]
    photos = dict()
    main_photos = dict()
    for r in photos_:
        # TODO: remove this once we have a publish field
        # if not r['publish']:
        #     continue
        if not r.get('שם קטלוגי עברי'):
            continue
        tree_id = r['שם קטלוגי עברי'][0]
        tree_part = r['tree_part']
        for photo in r['photo']:
            # Add the photo to the photos list with the new url (not necessarily on AWS)
            rec = process_photo(s3, r, tree_id, photo, 600)
            full = process_photo(s3, r, tree_id, photo, None, '-full')
            rec['full_url'] = full['url']
            photos.setdefault(tree_id, []).append(rec)

            if tree_part == 'תמונה מייצגת' and not main_photos.get(tree_id):
                main_photos[tree_id] = process_photo(s3, r, tree_id, photo, 350, '-thumbnail')

    resources = DF.Flow(
        DFA.load_from_airtable(AIRTABLE_APP, 'Resources', view='Grid view', apikey=AIRTABLE_API_KEY),
        # DF.checkpoint('resources'),        
    ).results()[0][0]
    about_resources = [
        dict(
            name=r['Resource_Name'],
            url=r.get('resource_link'),
            citation=r['citation_authors'],
            year=r['year'],
        )
        for r in resources
        if r['citation_authors'] and r['resource_link']
    ]
    resources = dict(
        (r[DFA.AIRTABLE_ID_FIELD], dict(
            name=r['Resource_Name'],
            organizations=concat(r['organization']),
            authors=concat(r['writers']),
            year=r['year'],
            url=r.get('resource_link'),
            id=r['id']
        ))
        for r in resources
    )
    catalogs = DF.Flow(
        DFA.load_from_airtable(AIRTABLE_APP, 'Trees Lists', view='Grid view', apikey=AIRTABLE_API_KEY),
        DF.select_fields(['list_name']),
    ).results()[0][0]
    catalogs = [r['list_name'] for r in catalogs]

    DF.Flow(
        DFA.load_from_airtable(AIRTABLE_APP, 'Trees Species', view='PUBLISH', apikey=AIRTABLE_API_KEY),
        # DF.checkpoint('trees-species'),
        DF.rename_fields(FIELD_RENAME_MAP, regex=False),
        DF.select_fields([
            DFA.AIRTABLE_ID_FIELD,
            'name',
            'botanicalName',
            'catalogs',
            'treeType',
            'sidewalkWidthHe',
            'climateAreaHe',
            'soilType',
            'canopyWidth',
            'canopyHeight',
            'deciduous',
            'canopyShapeHe',
            'bloomColorHe',
            'bloomSeason',
            'wateringScale',
            'isWaterEconomical',
            'extraWatering',
            'growthRate',
            'cleaningRequired',
            'brittlenessCoefficient',
            'sources',
            'isNative',
            'speciesValue',
            'hasNectar',
            'notesGeneral',
            'notesMaintenance',    
        ]),
        DF.set_type('name', transform=lambda v: v.strip()),
        DF.set_type('botanicalName', transform=lambda v: v.strip()),
        DF.set_type('notesGeneral', transform=lambda v: v.strip() if v else None),
        DF.set_type('notesMaintenance', transform=lambda v: v.strip() if v else None),
        DF.add_field('recommended', 'boolean', lambda r: catalogs[0] in (r['catalogs'] or [])),
        DF.add_field('sidewalkWidth', 'string', lambda r: get_warn(SIDEWALK_WIDTH_MAP, r['sidewalkWidthHe'], 'SIDEWALK_WIDTH_MAP')),
        DF.add_field('climateArea', 'array', lambda r: get_warn_l(CLIMATE_AREA_MAP, r['climateAreaHe'], 'CLIMATE_AREA_MAP')),
        DF.add_field('canopyShape', 'string', lambda r: get_warn(CANOPY_SHAPE_MAP, r.get('canopyShapeHe'), 'CANOPY_SHAPE_MAP')),
        DF.add_field('bloomColor', 'array', lambda r: get_warn_l(BLOOM_COLOR_MAP, r.get('bloomColorHe'), 'BLOOM_COLOR_MAP')),
        DF.set_type('sources', transform=lambda v: sorted(get_warn_l(resources, v, 'resources'), key=lambda x: x['id'])),
        DF.add_field('photos', 'array', lambda r: photos.get(r[DFA.AIRTABLE_ID_FIELD], [])),
        DF.add_field('mainPhoto', 'object', lambda r: main_photos.get(r[DFA.AIRTABLE_ID_FIELD])),
        DF.add_field('id', 'string', lambda r: r['botanicalName'].replace(' ', '-').replace('/', '-').lower()),
        DF.delete_fields([DFA.AIRTABLE_ID_FIELD]),
        # DF.printer(),
        DF.update_resource(-1, name='trees', path='trees.csv'),
        DF.dump_to_path('trees', format='json'),
    ).process()

    # Save trees as a compact JSON file (use BytesIO and json.dump) and store in S3
    # Ensure cache TTL is set to 60 to reduce caching issues
    target_key = 'trees.json'

    # Save trees as a compact JSON file
    trees = json.load(open('trees/trees.json'))
    trees_json = BytesIO()
    json_str = json.dumps(trees, separators=(',', ':'), ensure_ascii=False)
    trees_json.write(json_str.encode('utf-8'))
    trees_json.seek(0)
    s3.upload_fileobj(trees_json, AWS_BUCKET_NAME, target_key, ExtraArgs={'CacheControl': 'max-age=60'})
    
    url = f'https://api.airtable.com/v0/meta/bases/{AIRTABLE_APP}/tables?include=visibleFieldIds'
    headers = {
        'Authorization': f'Bearer {AIRTABLE_API_KEY}'
    }
    response = requests.get(url, headers=headers)
    schema = response.json()
    field_choices = {
        'catalogs': catalogs,
    }

    for table in schema['tables']:
        table_name = table['name']
        if table_name == 'Trees Species':
            for view in table['views']:
                view_name = view['name']
                if view_name == 'PUBLISH':
                    visibleFieldIds = set(view['visibleFieldIds'])
                    break
            for field in table['fields']:
                if field['id'] in visibleFieldIds:
                    field_name = field['name']
                    field_name = FIELD_RENAME_MAP.get(field_name, field_name)
                    field_type = field['type']
                    if field_type in ('multipleSelects', 'singleSelect'):
                        choices = field.get('options', {}).get('choices', [])
                        choices = [c['name'] for c in choices]
                        if len(choices) < 15:
                            field_choices[field_name] = choices
    with (ROOT / 'projects' / 'treecat' / 'src' / 'app' / 'filters' / 'list_consts.ts').open('w') as f:
        for k, v in field_choices.items():
            choices = ",\n  ".join([f'`{x}`' for x in v])
            f.write(f'export const FIELD_CHOICES_{k} = [\n  {choices}\n];\n\n')
        f.write(f'export const ABOUT_RESOURCES = {json.dumps(about_resources, indent=2, ensure_ascii=False)};\n')

if __name__ == '__main__':
    main()


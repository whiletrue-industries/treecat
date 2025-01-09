import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class SeoService {

  NGX_SEO_TITLE_KEYS: any = {
    ogTitle: 'og:title',
    twitterTitle: 'twitter:title',
    name: 'name',
  };

  constructor(private meta: Meta, private title: Title) { }

  setTitle(title: string): void {
    const ogTitle: MetaDefinition = {
      property: this.NGX_SEO_TITLE_KEYS.ogTitle,
      content: title,
    };
    const twitterTitle: MetaDefinition = {
      name: this.NGX_SEO_TITLE_KEYS.twitterTitle,
      content: title,
    };
    const googleTitle: MetaDefinition = {
      itemprop: this.NGX_SEO_TITLE_KEYS.name,
      content: title,
    };

    this.meta.removeTag('itemprop="name"'); // Because if we not remove the tag it will not be updated.

    this.title.setTitle(title);

    this.meta.updateTag(ogTitle);
    this.meta.updateTag(twitterTitle);
    this.meta.updateTag(googleTitle);
  }
}

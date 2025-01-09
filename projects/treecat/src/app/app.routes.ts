import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { TreeComponent } from './tree/tree.component';
import { CompareComponent } from './compare/compare.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'catalog', component: CatalogComponent},
    {path: 'tree/:id', component: TreeComponent},
    {path: 'compare', component: CompareComponent},
    {path: 'about', component: AboutComponent},
    {path: 'terms', component: TermsComponent}
];

import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Photo, Tree } from '../data.service';
import { concat, debounceTime, fromEvent, throttleTime, timer } from 'rxjs';
import { PlatformService } from '../platform.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TooltipComponent } from '../tooltip/tooltip.component';

type Row = {id: number, photos: Photo[]};

@UntilDestroy()
@Component({
  selector: 'app-tree-gallery',
  imports: [
    TooltipComponent
  ],
  templateUrl: './tree-gallery.component.html',
  styleUrl: './tree-gallery.component.less'
})
export class TreeGalleryComponent implements AfterViewInit, OnChanges {

  @Input() tree: Tree;

  @ViewChild('gallery') gallery: ElementRef;

  width = 0;
  rowHeight = 640;
  rows: Row[] = [];

  constructor(private platform: PlatformService) {
  }

  ngAfterViewInit() {
    this.platform.browser(() => {
      concat(
        timer(250),
        fromEvent(window, 'resize')
      ).pipe(
        untilDestroyed(this),
        throttleTime(250, undefined, { leading: true, trailing: true }),
      ).subscribe(() => {
        // console.log('Gallery resized');
        this.width = this.gallery.nativeElement.offsetWidth;
        this.partitionImages();
      });  
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.width > 0) {
      this.partitionImages();
    }
  }

  partitionImages() {
    // console.log(this.tree.photos);
    let numRows = 1;
    let done = false;
    // const sumRatios = this.tree.photos.reduce((acc, photo) => acc + photo.ratio, 0);
    let rows: Row[] = [];
    while (!done) {
      this.rowHeight = (640 - (numRows - 1) * 14) / numRows;
      const rowRatio = this.width / this.rowHeight * 100;
      const gapRatio = 14 / this.rowHeight * 100;
      let row: Row = {id: 0, photos: []};
      rows = [row];
      let currentSum = 0;
      for (let photo of this.tree.photos) {
        if (currentSum + photo.ratio + gapRatio >= rowRatio && row.photos.length) {
          row = {id: rows.length, photos: []};
          rows.push(row);
          currentSum = 0;
        }
        if (row.photos.length) {
          currentSum += gapRatio;
        }
        row.photos.push(photo);
        currentSum += photo.ratio;
        photo.base = (photo.ratio / rowRatio * 100) + '%';
        if (rows.length > numRows) {
          break;
        }
      }
      done = rows.length <= numRows;
      numRows += 1;
    }
    console.log('RRR', this.width, this.rowHeight, rows.length, this.tree.photos.length);
    // console.log('RRR', rows);
    this.rows = rows;
  }
}

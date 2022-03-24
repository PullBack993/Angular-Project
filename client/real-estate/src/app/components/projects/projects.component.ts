import { Component, Input, OnInit } from '@angular/core';
import { IAds } from '../../models/ads';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() data: IAds[] = [];

  constructor() {}

  ngOnInit(): void {}
}

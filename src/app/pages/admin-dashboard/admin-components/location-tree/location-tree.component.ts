import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { SharedService } from 'src/app/services/helper/shared.service';
import { Router } from '@angular/router';

interface LocationNode {
  name: string;
  icon: string;
  children?: LocationNode[];
}

const TREE_DATA: LocationNode[] = [
  {
    name: 'Stay Locations',
    icon:'',
    children: [{name: 'City',icon:'edit_location_alt'}, 
    {name: 'Location',icon:'edit_location_alt'},
    {name: 'Sub-Location',icon:'edit_location_alt'}],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-location-tree',
  templateUrl: './location-tree.component.html',
  styleUrls: ['./location-tree.component.css']
})
export class LocationTreeComponent implements OnInit {

  private _transformer = (node: LocationNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon:node.icon,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private _shared:SharedService,private _route:Router) { 
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  navigateTo(item:any){
    this._shared.headerTitleSubject.next(item+' Details');
    if(item === 'City'){
      this._route.navigate(['/admin/city']);
    }
    if(item === 'Location'){
      this._route.navigate(['/admin/location']);
    }
    if(item === 'Sub-Location'){
      this._route.navigate(['/admin/sub-location']);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { SharedService } from 'src/app/services/helper/shared.service';
import { Router } from '@angular/router';

interface PGNode {
  name: string;
  icon: string;
  children?: PGNode[];
}

const TREE_DATA: PGNode[] = [
  {
    name: 'Paying Guest',
    icon:'',
    children: [{name: 'PG Operation',icon:'edit_location_alt'}, {name: 'Travel Nearby',icon:'edit_location_alt'}],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-pg-tree',
  templateUrl: './pg-tree.component.html',
  styleUrls: ['./pg-tree.component.css']
})
export class PgTreeComponent implements OnInit {

  private _transformer = (node: PGNode, level: number) => {
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
    this._shared.headerTitleSubject.next(item);
    if(item === 'PG Operation'){
      this._route.navigate(['/admin/pg']);
    }
    if(item === 'Travel Nearby'){
      this._route.navigate(['/admin/add-pg']);
    }
  }

}

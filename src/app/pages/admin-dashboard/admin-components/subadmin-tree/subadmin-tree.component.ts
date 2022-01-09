import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SharedService } from '../../../../services/helper/shared.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common'; 

interface SubAdminNode {
  name: string;
  icon: string;
  children?: SubAdminNode[];
}

const TREE_DATA: SubAdminNode[] = [
  {
    name: 'Sub Admin',
    icon:'',
    children: [{name: 'Sub-Admin Operation',icon:'edit_location_alt'}],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-subadmin-tree',
  templateUrl: './subadmin-tree.component.html',
  styleUrls: ['./subadmin-tree.component.css']
})
export class SubadminTreeComponent implements OnInit {

  private _transformer = (node: SubAdminNode, level: number) => {
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

  constructor(private _shared:SharedService,private _route:Router, private location:Location) { 
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
  }

  navigateTo(item:any){
    this._shared.headerTitleSubject.next(item);
    if(item === 'Sub-Admin Operation'){
      this._route.navigate(['/admin/sub-admin']);
    }
  }

}

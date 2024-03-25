import { Component, OnInit } from '@angular/core';
import { cake } from '../model/cake';
import { CakeService } from '../services/cake.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-addcake',
  templateUrl: './addcake.component.html',
  styleUrl: './addcake.component.css'
})
export class AddcakeComponent implements OnInit 
{
  id: any = 0;
  mycake: cake = {};
  isEditcake: Boolean = false; 

  constructor(private cakeserve: CakeService, private route: Router, private rs: ActivatedRoute, private fb: FormBuilder,private snackbar:SnackbarService) { }

  ngOnInit(): void {
    this.rs.paramMap.subscribe(params => {
      let stdid = params.get("id") ?? 0;
      this.id = stdid;
      this.getOneCake(stdid);
    })
  };

  detailsForm = this.fb.group({
    name: ['', Validators.required],
    price: [0,[ Validators.required,Validators.min(1),Validators.pattern(/^[0-9]+$/)]],
    description: ['', Validators.required],
    rating: [0,[ Validators.required,Validators.min(1),Validators.max(5),Validators.pattern(/^[0.0-9.0]+$/)]],

    productInfo: this.fb.group({
      weight: ['', Validators.required],
      flavour: ['', Validators.required],
      shape: ['', Validators.required],
      type: ['', Validators.required],
      countyOfOrigin: ['', Validators.required]
    }),
    moreInfo: this.fb.group({
      point1: ['', Validators.required],
      point2: ['', Validators.required],
      point3: ['', Validators.required]

    })
  });

  get name() {
    return this.detailsForm.get("name");
  }
  get price() {
    return this.detailsForm.get("price");
  }
  get description() {
    return this.detailsForm.get("description");
  }
  get rating() {
    return this.detailsForm.get("rating");
  }
  get weight() {
    return this.detailsForm.get("productInfo.weight");
  }
  get flavour() {
    return this.detailsForm.get("productInfo.flavour");
  }
  get shape() {
    return this.detailsForm.get("productInfo.shape");
  }
  get type() {
    return this.detailsForm.get("productInfo.type");
  }
  get countyOfOrigin() {
    return this.detailsForm.get("productInfo.countyOfOrigin");
  }
  get point1() {
    return this.detailsForm.get("moreInfo.point1");
  }
  get point2() {
    return this.detailsForm.get("moreInfo.point2");
  }
  get point3() {
    return this.detailsForm.get("moreInfo.point3");
  }

  addcake() {
    if (this.isEditcake) {
      this.cakeserve.editCake(this.detailsForm.value as cake, this.id).subscribe((data) => {
        alert("cake details edited" + data.id);
        this.route.navigateByUrl("viewallcakes")
      })
    }
    else {
      
      this.cakeserve.addCake(this.detailsForm.value as cake).subscribe((cake) => {
        this.snackbar.openScakBar('Item Added','Successfully')
        this.route.navigateByUrl("viewallcakes")
      })
    }
  };

  getOneCake(id: any) {
    this.cakeserve.getcakeById(id).subscribe((data) => {
      this.detailsForm.patchValue({
        name: data.name,
        price: data.price,
        rating: data.rating,
        description: data.description,
        productInfo: {
          weight: data.productInfo?.weight,
          flavour: data.productInfo?.flavour,
          shape: data.productInfo?.shape,
          type: data.productInfo?.type,
          countyOfOrigin: data.productInfo?.countyOfOrigin
        },
        moreInfo: {
          point1: data.moreInfo?.point1,
          point2: data.moreInfo?.point2,
          point3: data.moreInfo?.point3
        },

      });
      this.isEditcake = true;
    })
  };

  canClose() {
    if (this.detailsForm.dirty && this.detailsForm.invalid) {
      let response = confirm("Do you want to leave in between!!")
      return response;
    }
    else {
      return true;
    }
  };
}


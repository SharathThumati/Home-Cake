export type cake={
    id?:number;
    name?:string;
    price?:number;
    rating?:number;
    description?:string;
    productInfo?:{
        weight?:string;
        flavour?:string;
        shape?:string;
        type?:string;
        countyOfOrigin?:string;
    };
    moreInfo?:{
        point1?:string;
        point2?:string;
        point3?:string;
    };
    image?:URL;
    

}
class Media {
  constructor() {
    this._backgroundImage = null;
    this._diamondsSprite = null;
  }

set bakgroundImage(imageObject) {
  if(!imageObject instanceof Image){
    return;
  }
  this._bakgroundImage = imageObject;
}
 
 get backgroundImage(){
   return this._backgroundImage;
 }
}

export const media = new Media();
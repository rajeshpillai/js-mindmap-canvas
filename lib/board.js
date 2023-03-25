class Board {
  constructor() {
    this.data = [];
  }
  
  add(item, parent) {
    item.parent = parent;
    this.data.push(item);
  }
  
  contains(m) {
    let bRect = canvas.getBoundingClientRect();
    let found = this.data.find((d) => {
      if (m.x >= d.x-scrollLeft && m.x < (d.x-scrollLeft + d.w) &&
          m.y >= d.y-scrollTop && m.y < (d.y + d.h)-scrollTop) {
        return true;
      }
    });
    
    return found;
  }
  
  connect(parent, child) {
    ctx.save();
    ctx.strokeStyle="yellow";
    ctx.beginPath();
    ctx.moveTo(parent.cx,parent.cy);
    ctx.lineTo(child.cx,child.cy);
    
    ctx.stroke();
    ctx.restore();
  }
  
  paint() {
    this._paint(this.data);
  }
  
  _paint(data) {
    for(let i = 0; i< data.length; i++) {
      let item = this.data[i]; 
      if (item.parent) {
        this.connect(item.parent, item);
      } 
      item.render(ctx);
      
    }
  }
}
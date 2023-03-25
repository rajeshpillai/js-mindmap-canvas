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
    console.log("CONNECT");
    ctx.save();
    ctx.strokeStyle="black";
    ctx.beginPath();
    ctx.moveTo(parent.cx,parent.cy);
    // stroke width
    ctx.lineWidth = 4;
    // smooth
    ctx.lineJoin = "round";
    // avoid zig zag
    ctx.lineCap = "round";

    // Calculate the center proints of parent and child
    let parentCenterX = parent.cx;
    let parentCenterY = parent.cy + parent.h / 2;
    let childCenterX = child.cx;
    let childCenterY = child.cy + child.h / 2;

    // Calculate the direction of the flow between parent and child
    let directionX = childCenterX - parentCenterX;
    let directionY = childCenterY - parentCenterY;


    // Calculate the angle of the flow between parent and child
    let angle = Math.atan2(directionY, directionX);

    // Calculate the distance between parent and child
    let distance = Math.sqrt(directionX * directionX + directionY * directionY);

    // Calculate the control points
    let control1X = parentCenterX + Math.cos(angle) * distance / 2;
    let control1Y = parentCenterY + Math.sin(angle) * distance / 2;
    let control2X = childCenterX - Math.cos(angle) * distance / 2;
    let control2Y = childCenterY - Math.sin(angle) * distance / 2;

    // Draw the curve
    ctx.bezierCurveTo(control1X, control1Y, control2X, control2Y, childCenterX, childCenterY);

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
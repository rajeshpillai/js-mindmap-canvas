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

    
    // Calculate the center points of the rectangles
    let rect1CenterX = parent.cx + parent.w / 2;
    let rect1CenterY = parent.cy + parent.h / 2;
    let rect2CenterX = child.cx + child.w / 2;
    let rect2CenterY = child.cy + child.h / 2;

    // Calculate the direction of the flow between the rectangles
    let directionX = rect2CenterX - rect1CenterX;
    let directionY = rect2CenterY - rect1CenterY;
    let control1X, control1Y, control2X, control2Y;

    if (Math.abs(directionX) > Math.abs(directionY)) {
      // Horizontal flow
      if (directionX > 0) {
        // Rightward flow
        control1X =  parent.cx + parent.w * 0.75;
        control1Y = rect1CenterY;
        control2X = child.cx + child.w * 0.25;
        control2Y = rect2CenterY;
      } else {
        // Leftward flow
        control1X = parent.cx + parent.w * 0.25;
        control1Y = rect1CenterY;
        control2X = child.cx + child.w * 0.75;
        control2Y = rect2CenterY;
      }
    } else {
      // Vertical flow
      if (directionY > 0) {
        // Downward flow
        control1X = rect1CenterX;
        control1Y = parent.cy + parent.h * 0.75;
        control2X = rect2CenterX;
        control2Y = child.cy + child.h * 0.25;
      } else {
        // Upward flow
        control1X = rect1CenterX;
        control1Y = parent.cy + parent.h * 0.25;
        control2X = rect2CenterX;
        control2Y = child.cy + child.h * 0.75;
      }
    }

    ctx.bezierCurveTo(control1X, control1Y, control2X, control2Y, child.cx, child.cy);

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
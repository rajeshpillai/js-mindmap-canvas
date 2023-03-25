

class Rectangle extends Shape {
  constructor(x,y,w,h) {
    super(x,y);
    //this.x = x;
    //this.y = y;
    this.w = w;
    this.h = h;
    this.text=`idea ${x}`;
    this.cx = x+w/2;
    this.cy = y+h/2;
    this.setup();
  }
  
  setup() {
    var addBtn = document.createElement("div");
    addBtn.style.position = "absolute";
    addBtn.style.width = '15px';
    addBtn.style.height = '15px';
    addBtn.style.left = this.x   + 'px';
    addBtn.style.top = this.y  + 'px';
    addBtn.classList.add("btn-add");
    
    addBtn.addEventListener("click", (e)=> {
      var rect = canvas.getBoundingClientRect();
      let m = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      m.x = m.x +  150;
      createShape(m,this);
    });
    
    addBtn.addEventListener("mouseup", (e)=> {
      if (parent) parent.dragging = false;
    });
    
    this.addBtn = addBtn;
    document.body.append(addBtn);
  }
  
  
  add(item) {
    this.children.push(item);
  }
  
  render(ctx) {
    let bRect = canvas.getBoundingClientRect();
    ctx.save();
    ctx.strokeStyle="#fff";
    ctx.fillStyle="red";
    ctx.fillRect(this.x,this.y,this.w,this.h);
    
    ctx.font = "15px Arial";
    if (this.text) {
      ctx.fillStyle="yellow";
      
      let textWidth = ctx.measureText(this.text).width;
      
      ctx.fillText(
        this.text, 
        this.x + (this.w - textWidth) / 2,
        this.y + this.h/2 + 5
      );
    }
    ctx.restore();
    
    this.addBtn.style.left = this.x + bRect.left + scrollLeftBody  + 'px';
    this.addBtn.style.top = this.y + bRect.top + scrollTopBody  + 'px';
    
  }
  
  getBounds() {
    return {
      x: this.x,
      y: this.y,
      width: this.w,
      height: this.h
    }
  }
}

(() => {
  const main = document.getElementsByClassName("main")[0];
  const canvas = document.getElementsByClassName("canvas")[0];
  canvas.height = main.clientHeight;
  canvas.width = main.clientWidth;

  const mousedown_canvas = (e) => {
    performance.mark("click_start");
  }
  
  const duration_time = () => {
    performance.mark("click_end");
    performance.measure("click_time", "click_start", "click_end");
    const duration = performance.getEntriesByName("click_time")[0].duration;
    performance.clearMarks();
    performance.clearMeasures();
    return duration;
  }

  const each_color_value = () => {
    return Math.floor(Math.random() * 255);
  }

  const random_color = () => {
    const r = each_color_value();
    const g = each_color_value();
    const b = each_color_value();
    return `rgb(${r}, ${g}, ${b})`;
  }

  const get_pointer = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - Math.floor(rect.left);
    const y = e.clientY - Math.floor(rect.top);
    return {"x": x, "y": y};
  }

  const change_color = (ctx) => {
    const color = random_color();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
  }

  const draw = (ctx, pointer) => {
    ctx.beginPath();
    const r = duration_time() / 10;
    ctx.arc(pointer.x, pointer.y, r, 0, Math.PI * 2, false);
    ctx.fill();
  }

  const mouseup_canvas = (e) => {
    const ctx = canvas.getContext('2d');
    change_color(ctx);
    draw(ctx, get_pointer(e));
  }

  canvas.addEventListener("mousedown", mousedown_canvas);
  canvas.addEventListener("touchstart", mousedown_canvas, {passive: true});
  canvas.addEventListener("mouseup", mouseup_canvas);
  canvas.addEventListener("touchend", mouseup_canvas, {passive: true});
})();

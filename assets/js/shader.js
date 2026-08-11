/**
 * Sarvahit Seva Trust Web Portal
 * WebGL Ambient Canvas Background Shader
 */
class AmbientShader {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    this.syncSize();
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => this.syncSize()).observe(this.canvas);
    }

    const gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    if (!gl) return;
    this.gl = gl;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        vec3 color1 = vec3(0.043, 0.365, 0.231); // #0B5D3B
        vec3 color2 = vec3(0.118, 0.227, 0.541); // #1E3A8A
        vec3 color3 = vec3(0.31, 0.765, 0.969);  // #4FC3F7
        
        float n = snoise(uv * 2.0 + u_time * 0.1);
        float m_dist = distance(uv, mouse);
        
        vec3 color = mix(color1, color2, uv.y + n * 0.2);
        color = mix(color, color3, clamp(n * 0.5 + 0.5 - m_dist * 0.3, 0.0, 1.0));
        
        gl_FragColor = vec4(color * 0.9 + 0.1, 1.0);
      }
    `;

    const compileShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    this.program = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    this.uTime = gl.getUniformLocation(prog, 'u_time');
    this.uRes = gl.getUniformLocation(prog, 'u_resolution');
    this.uMouse = gl.getUniformLocation(prog, 'u_mouse');

    this.mouse = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * this.canvas.width;
        this.mouse.y = (1.0 - (e.clientY - rect.top) / rect.height) * this.canvas.height;
      }
    });

    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  syncSize() {
    const w = this.canvas.clientWidth || 1280;
    const h = this.canvas.clientHeight || 720;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  render(t) {
    if (!this.gl) return;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    if (this.uTime) this.gl.uniform1f(this.uTime, t * 0.001);
    if (this.uRes) this.gl.uniform2f(this.uRes, this.canvas.width, this.canvas.height);
    if (this.uMouse) this.gl.uniform2f(this.uMouse, this.mouse.x, this.mouse.y);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(this.render);
  }
}

// Auto instantiate on load if canvas exists
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shader-canvas-ANIMATION_3')) {
    new AmbientShader('shader-canvas-ANIMATION_3');
  }
});

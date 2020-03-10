// Author: jandy
// Title : 2020-03-10

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(float v, float size, float pivot) {
    return step(pivot - size, v) - step(pivot + size, v);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(((st.y-0.5)*0.8)+0.5);
    //vec3 color = vec3(st.y);
    vec2 rec = vec2(0.090,0.310);

    color = mix(color, vec3(0.5,0.5,0.5), plot(st.x, rec.x, 0.5) * plot(st.y, rec.y, 0.5) );
    color = mix(color, vec3(0.5,0.5,0.5), plot(st.x, rec.x, 0.2) * plot(st.y, rec.y, 0.5) );
    color = mix(color, vec3(0.5,0.5,0.5), plot(st.x, rec.x, 0.8) * plot(st.y, rec.y, 0.5) );


    gl_FragColor = vec4(color,1.008);
}

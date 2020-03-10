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

float triangle(vec2 coord, float width, float height, vec2 pivot) {
    float ax = step(pivot.x-width/2., coord.x) - step(pivot.x+width/2., coord.x);
    float ay = step(pivot.y, coord.y) - step(pivot.y + height * (1. - abs( (coord.x - pivot.x) / (width/2.) ) ), coord.y);
    return ax * ay;
}
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
void main() {
    vec2 origst = gl_FragCoord.xy/u_resolution.xy;
    origst *= 20.;
    vec2 st = fract(origst);
    vec3 color = vec3(((st.y-0.5)*0.8)+0.5);
    color = vec3(random(ceil(origst)));
    vec2 rec = vec2(0.090,0.310);

    // color = mix(color, vec3(0.5,0.5,0.5), plot(st.x, rec.x, 0.5) * plot(st.y, rec.y, 0.5) );
    // color = mix(color, vec3(0.5,0.5,0.5), plot(st.x, rec.x, 0.2) * plot(st.y, rec.y, 0.5) );
    // color = mix(color, vec3(0.5,0.5,0.5), plot(st.x, rec.x, 0.8) * plot(st.y, rec.y, 0.5) );
    // color = mix(color, vec3(0.,1.,0.), triangle(st,0.536,0.456,vec2(0.480,0.340)));

    gl_FragColor = vec4(color,1.008);
}

// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.141592

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random (vec2 st) {
    float x = fract(sin(dot(st.xy, vec2(13.9898,78.233))) * 43757.569);
    float y = fract(sin(dot(st.xy, vec2(112.8350,22.8450))) * 7338.559);
    return vec2(x,y)*2. -1.;
}
float noise(vec2 v) {
    vec2 i1 = floor(v);
    vec2 f = fract(v);
    
    vec2 i2 = i1 + vec2(1.,0.);
    vec2 i3 = i1 + vec2(0.,1.);
    vec2 i4 = i1 + vec2(1.,1.);
    
    vec2 r1 = random(i1);
    vec2 r2 = random(i2);
    vec2 r3 = random(i3);
    vec2 r4 = random(i4);
    
    // f = smoothstep(0.,1.,f);
    f = f*f*f*(f*(f*6.-15.)+10.);
    float d1 = dot(r1,v - i1);
    float d2 = dot(r2,v - i2);
    float d3 = dot(r3,v - i3);
    float d4 = dot(r4,v - i4);
    
    float bot = mix(d1, d2, f.x);
    float top = mix(d3, d4, f.x);
    float ret = mix(bot, top, f.y);
    return ret * 0.5 + 0.5;
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution.xy;
    coord *= 20.;
    coord.x *= u_resolution.x / u_resolution.y;
    
    gl_FragColor = vec4(vec3(noise(coord)),1.);
}
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
    return (vec2(x,y) - 0.5) * 0.99 ; //range(-1, 1)
}
float random(float v) {
    return fract(sin(v*33.253) * 3245.125) -0.5 ;
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution.xy;
    coord.x *= u_resolution.x/u_resolution.y;
    float power = u_mouse.x / u_resolution.x;
    power = power*PI;
    power = u_time;
    coord *= 10.;
    
    vec3 col = vec3(0.);
    
    // point[0] = u_mouse / min(u_resolution.x,u_resolution.y);
    vec2 addx[9];
    addx[0] = vec2(-1.,1.);
    addx[1] = vec2(0.,1.);
    addx[2] = vec2(1.,1.);
	addx[3] = vec2(-1.,0.);
    addx[4] = vec2(0.,0.);
    addx[5] = vec2(1.,0.);
    addx[6] = vec2(-1.,-1.);
    addx[7] = vec2(0.,-1.);
    addx[8] = vec2(1.,-1.);
    
    float md = 100.;
    for(int i = 0; i < 9; ++i) {
        vec2 point = floor(coord) + addx[i];
        point = point + vec2(0.5) + vec2(random(point).x * sin(power), random(point).y * cos(power));
        float d = distance(coord, point);
        if( d < md ){
            md = d;
        	col = vec3(md);
        }
    }
    vec2 point = floor(coord) + vec2(0.5) + vec2(random(floor(coord)).x * sin(power), random(floor(coord)).y * cos(power));
    
    gl_FragColor = vec4(col,1.0);
}
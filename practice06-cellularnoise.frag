// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random (float v) {
    float x = fract(sin(v * 23.225) * 356.873);
    float y = fract(sin(v * 16.586) * 437.452);
    return vec2(x,y);
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution.xy;
    coord.x *= u_resolution.x/u_resolution.y;
    
    coord *= 1.;
    const int amount = 5;
    
    vec3 col = vec3(1.);
    
    vec2 point[amount];
    for(int i = 0; i < amount; ++i) {
        point[i] = random(float(i));
    }
    point[0] = u_mouse / min(u_resolution.x,u_resolution.y);
    
    float md = 100.;
    float mmd = 100.;
    
    vec2 p = vec2(0.);
    for(int i = 0; i < amount; ++i) {
        float d = distance(coord, point[i]);
        if ( d < md ) {
            mmd = md;
            md = d;
            p = point[i];
        }
    }
    col = vec3(1.,1., 1.) * abs(sin(distance(coord, p) * 100. ) * 0.9) ;
    
    if( distance(p,coord) < 0.01) {
        col = vec3(1.);
    }
    // if( mmd - md < 0.007) {
    //     col = vec3(1.);
    // }
    
    gl_FragColor = vec4(col,1.0);
}
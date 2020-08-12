/*
 * app.js
 * Copyright (C) 2019 sylveryte <sylveryte@archblue>
 * sylveryte
 * so
 * Distributed under terms of the MIT license.
 */

function fin(t,c=0,h=""){
	// console.log(t,c,h);
	if(c==t)console.log(` solution ${h} == ${c}`);
	else if(c>t)return null;
	else{
		fin(t,(c==0?1:c)*3,`((${h})*3)`);
		fin(t,c+5,`${h}+5`);
	}
}
function fins(t){
	function f(c,h){
		if(c == t){
			return h;
		}else if (c > t) return null;
		else {
			return f(c+5, `(${h} +5)`) || f(c*3,`(${h}*3)`);
		}
	}
	return f(1,"1");
}
let t = 100;
console.log(fins(t));
fin(t);
console.log('hi')

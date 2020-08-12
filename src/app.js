/*
 * app.js
 * Copyright (C) 2019 sylveryte <sylveryte@archblue>
 * sylveryte
 * so
 * Distributed under terms of the MIT license.
 */

function titler(title) {
	console.log(`\n====> ${title} <`.padEnd(49,'='))
}

// Global toys
const pets = {bat:"batdog",sup:"krypto",flash:"no pet"}
const women = ["Wonder Woman", "Yennefer", "Mikasa"]
let o={
	hot:"Yen",
	beauty:"Triss",
	strong:"Supergirl",
	"elf girl":"Ciri",
	ftimes:fact(5),
}
titler("END OF THIS SHeNANIGAN")

titler("Chapter 3 - Closure");
function fact(f) {
	return x => x*f;
}
f2 = fact(2);
f3 = fact(3);
console.log(f2(2))
console.log(f3(2))

titler("Chapter 4 - Object")
console.log(o)
console.log(Object.keys(o))
console.log(o.beauty)
console.log(o["elf girl"])
console.log(o.ftimes(4))
let newOb={ultimate:"Wonder Woman",hot:"Catwoman"};
console.log('after assign')
console.log(newOb)
Object.assign(newOb,o);
console.log(newOb)
console.log(newOb==o);

titler("Chapter 4 - Arrayology Page 116")
console.log(women)
console.log(women.shift())
console.log(women.reverse())

titler("Chapter 4 - Destructuring 124")
console.log(pets)
const {sup} = pets
console.log(sup)
const petsAr = Object.values(pets)
console.log(petsAr)
function getPets([ba,sp]){console.log(sp,ba)}
getPets(petsAr)

titler('Chapter 4 - JSON 125')
console.log(JSON.stringify(women))
const np = pets;
np.ring = {"green":"gola","yellow":"nora"}
console.log(np)
console.log(JSON.stringify(np))
console.log(JSON.parse(JSON.stringify(o)))

titler("Chapter 5 - High Order")

let m = false
if(true && !m ){
	console.log('hil')
}else{
	console.log('oh ho')
}

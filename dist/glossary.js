"use strict";(()=>{var f=()=>{let t=document.querySelectorAll(".glossary-h2"),e=[];t.forEach((n,l)=>{let d=n.innerHTML.charAt(0),h=n.parentElement.parentElement.querySelector(".letter_anchor"),i=n.parentElement.parentElement.querySelector(".glossary-hidden-letter");h&&i&&(h.setAttribute("id",d),i.setAttribute("data-letter",d),i.innerHTML=d),e.indexOf(d)===-1&&e.push(d)});let s=Array.from(Array(26)).map((n,l)=>l+65).map(n=>String.fromCharCode(n)),o=document.getElementById("links_wrap");o.innerHTML="",s.forEach((n,l)=>{let a=document.createElement("a");a.innerHTML=n,a.setAttribute("class","term-link"),e.includes(n)&&a.setAttribute("href","#"+n),o.appendChild(a)});let r=document.getElementsByClassName("glossary-hidden-letter"),u=new Set([]);for(let n=0;n<r.length;n++){let l=r[n].getAttribute("data-letter");u.has(l)===!1&&(u.add(l),m(r[n]))}p(),g()};function m(t){t.classList.add("glossary-letter")}function p(){document.querySelectorAll('[id^="Checkbox-3"]').forEach(e=>{e.addEventListener("change",function(){e.checked?y():L()})})}function y(){document.querySelectorAll(".glossary-hidden-letter").forEach(e=>{e.style.display="none"})}function L(){document.querySelectorAll(".glossary-hidden-letter").forEach(e=>{e.style.display=""})}function g(){document.querySelectorAll("#checkbox-3").forEach(e=>{e.checked&&y()})}var x=setInterval(()=>{function t(){return document.querySelector('.term-link[href="#Z"]')||document.querySelector('.term-link[href="#Y"]')||document.querySelector('.term-link[href="#X"]')}t()?clearInterval(x):f()},1e3);function E(){let t=new Date,e=new Date(t.getFullYear(),0,0),c=t-e,s=1e3*60*60*24;return Math.floor(c/s)}function A(){let t=document.querySelectorAll(".wod-item-cms"),e=t.length,s=E()%e;t.forEach((o,r)=>{r===s?o.style.display="block":o.style.display="none"})}document.addEventListener("DOMContentLoaded",A);function b(){function t(c,s){let o=c.textContent;if(o.length>s){let r=o.substring(0,s)+" ...read more";c.textContent=r,console.log(`Truncated text: "${r}"`)}}function e(){console.log("Add Truncation");let c=document.querySelectorAll("._14px-glossary"),o=window.innerWidth<=768?160:233;c.forEach(r=>t(r,o))}document.addEventListener("DOMContentLoaded",e),window.addEventListener("resize",e)}b();f();})();

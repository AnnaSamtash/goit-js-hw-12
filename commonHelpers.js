import{a as w,S,i as l}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();let g=15;async function x(){let e;a===1?e=h.elements.search.value.trim().split(" ").join("+"):e=y.trim().split(" ").join("+");const r=new URLSearchParams({key:"42633759-4a44573e34755b4488adb4c1b",q:[e],image_type:"photo",orientation:"horizontal",safesearch:!0,page:[a],per_page:[g]});return(await w.get(`https://pixabay.com/api/?${r}`)).data}const d=document.querySelector(".gallery"),E=new S(".gallery a",{captionsData:"alt",captionDelay:250});function O(e){const r=e.map(({largeImageURL:s,webformatURL:i,tags:t,likes:o,views:n,comments:L,downloads:P})=>`<li class="photos-list-item">
            <a class="photos-list-link" href="${s}">
            <img class="photo" src="${i}" alt="${t}"/>
            </a>
            <ul class="photo-information-container">
            <li class="item-photo-information-container"><p><span class="accent">Likes</span></br>${o}</p></li>
            <li class="item-photo-information-container"><p><span class="accent">Views</span></br>${n}</p></li>
            <li class="item-photo-information-container"><p><span class="accent">Comments</span></br>${L}</p></li>
            <li class="item-photo-information-container"><p><span class="accent">Downloads</span></br>${P}</p></li>
            </ul>
            </li>`).join("");d.insertAdjacentHTML("beforeend",r),E.refresh()}const h=document.querySelector(".search-form");let a=1,y="";const c=document.querySelector(".next-page-btn");p(c);const m=document.querySelector(".loader");p(m);let u=1;window.onload=b;h.addEventListener("submit",$);c.addEventListener("click",q);function $(e){e.preventDefault(),d.innerHTML="";const r=e.target.elements.search.value.trim();if(r!=="")a=1,y=r,F();else return l.show({message:"Please complete the field!",theme:"dark",progressBarColor:"#FFFFFF",color:"#EF4040",position:"topRight"})}async function F(){try{if(p(c),f(m),a>u)l.error({theme:"dark",progressBarColor:"#FFFFFF",color:"#EF4040",position:"topRight",message:"We're sorry, there are no more images to load"});else{const e=await x();if(e.totalHits!=0){u=Math.floor(e.totalHits/g),O(e.hits);const s=d.querySelector(".photos-list-item").getBoundingClientRect();window.scrollBy({top:s.height*2,behavior:"smooth"}),f(c)}else l.error({message:"Sorry, there are no images matching your search query. Please try again!",theme:"dark",progressBarColor:"#FFFFFF",color:"#EF4040",position:"topRight"})}}catch(e){console.log(e),l.error({message:`${e.message}`,theme:"dark",progressBarColor:"#FFFFFF",color:"#EF4040",position:"topRight"})}finally{p(m),b(),h.reset()}}function q(){++a,F()}function f(e){e.classList.toggle("hidden"),e.style.display="flex"}function p(e){e.classList.toggle("hidden"),e.style.display="none"}function b(){document.body.classList.add("loaded"),document.body.classList.remove("loaded_hiding")}
//# sourceMappingURL=commonHelpers.js.map

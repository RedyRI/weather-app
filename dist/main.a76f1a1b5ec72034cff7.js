(()=>{"use strict";let t=document.querySelector(".city"),e=document.querySelector(".weather-btn"),o=document.querySelector(".alert"),n=document.querySelector(".temp"),c=document.querySelector(".unit"),a=document.querySelector(".icon"),l=document.querySelector(".location"),i=document.querySelector(".description"),s=document.querySelector("table"),r=document.querySelector(".units"),u="&#x2103",d="&#x2109";function m(t){let e=[...document.querySelectorAll(".var")];"celcius"==t?e.forEach((t=>{t.textContent=((+t.textContent-32)/1.8).toFixed(2)})):e.forEach((t=>{t.textContent=(1.8*+t.textContent+32).toFixed(2)}))}e.addEventListener("click",(async function(){let e=t.value?t.value:"",m=r.classList.contains("farenheit")?"imperial":"metric";if(""===e)o.textContent="enter a city",o.style.display="block";else{let t=await async function(t,e){let o=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=${t}&appid=a5d5560ee39e3fe746c3741ca01c482c`,{mode:"cors"});if(200===o.status){let t=await o.json();return[t.name,t.sys.country,t.main.temp,t.weather[0].description,t.weather[0].icon,t.main.humidity]}if(404==o.status)return console.log(o.statusText),o.statusText}(m,e);if("Not Found"===t)o.textContent="city not found",o.style.display="block";else{o.style.display="none",n.textContent=t[2],a.src=`http://openweathermap.org/img/wn/${t[4]}.png`,l.textContent=`${t[0]}, ${t[1]}`,c.innerHTML="metric"===m?u:d,i.textContent=`${t[3]}`;let r=await async function(t,e){let o=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e}&units=${t}&appid=a5d5560ee39e3fe746c3741ca01c482c`,{mode:"cors"});if(200===o.status){let t=await o.json();return console.log(t.list),console.log(t.list[5]),console.log(t.list[13]),console.log(t.list[21]),console.log(t.list[29]),console.log(t.list[37]),[t.list[3],t.list[13],t.list[21],t.list[29],t.list[37]]}if(404==o.status)return console.log(o.statusText),o.statusText}(m,e);console.log(r),function(t){(async function(){console.log(s);let t=await s.querySelectorAll(".data-row");console.log(t),t.forEach((async t=>{await s.removeChild(t)}))})(),t.forEach((t=>{let e=function(t){let e=document.createElement("tr");for(let o=0;o<4;o++){let n=document.createElement("td");2!==o?n.textContent=t[o]:(n=document.createElement("img"),n.src=`http://openweathermap.org/img/wn/${t[2]}.png`),1===o&&n.classList.add("var"),e.classList.add("data-row"),e.appendChild(n)}return e}([t.dt_txt.slice(5,10),t.main.temp,t.weather[0].icon,t.weather[0].description]);s.appendChild(e)}))}(r)}console.log(t)}})),r.addEventListener("click",(function(){r.classList.contains("farenheit")?(c.innerHTML=u,m("celcius")):(c.innerHTML=d,m("farenheit"));r.querySelector(".c").classList.toggle("active"),r.querySelector(".f").classList.toggle("active"),r.classList.toggle("farenheit")})),r.querySelector(".c").classList.add("active")})();
//# sourceMappingURL=main.a76f1a1b5ec72034cff7.js.map
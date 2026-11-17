/**
 * Inline script for app/layout.tsx. It works with the .defer-render wrappers
 * on the home page (app/page.tsx, rule in app/globals.css).
 *
 * Why it exists: the page is fastest when the browser only lays out the hero
 * before the first paint. The other sections wait. But if they all get laid
 * out later in ONE go (Chrome does this itself shortly after load), that is a
 * single long task that freezes the page and costs Lighthouse points.
 *
 * What it does:
 *  1. After the first paint, it switches the sections on one at a time, each
 *     in its own short idle slice, so no slice blocks the page.
 *  2. If a "#" link is used before that finishes (or the page is opened with a
 *     "#" in the address), it switches them all on at once, so the jump lands
 *     in the right place.
 *
 * It only adds rules to its own <style> tag and never touches the elements
 * React renders, so there is nothing for hydration to disagree with.
 * Plain ES5 on purpose: it runs before any other script.
 */
export const DEFER_RENDER_SCRIPT = `(function(){
var d=document,w=window,sheet,count=0,all=false,started=false;
function css(t){if(!sheet){sheet=d.createElement("style");d.head.appendChild(sheet)}sheet.textContent=t}
function showAll(){all=true;css(".defer-render{content-visibility:visible}")}
function idle(f){w.requestIdleCallback?w.requestIdleCallback(f,{timeout:400}):setTimeout(f,60)}
function step(){
if(all)return;
var els=d.querySelectorAll(".defer-render");
if(count>=els.length)return;
var el=els[count++];
var pos=Array.prototype.indexOf.call(el.parentNode.children,el)+1;
css(".defer-render:nth-child(-n+"+pos+"){content-visibility:visible}");
el.offsetHeight;
idle(step)}
function run(){count=0;idle(step)}
function start(){if(!started){started=true;setTimeout(run,200)}}
if(location.hash)showAll();
addEventListener("hashchange",showAll);
addEventListener("click",function(e){
var t=e.target,a=t&&t.closest&&t.closest("a[href]");
if(!a)return;
if(a.getAttribute("href").indexOf("#")>-1)showAll();
else setTimeout(run,1200)},true);
addEventListener("popstate",function(){setTimeout(run,1200)});
try{new PerformanceObserver(function(l,o){if(l.getEntriesByName("first-contentful-paint").length){o.disconnect();start()}}).observe({type:"paint",buffered:true})}catch(e){}
addEventListener("load",function(){setTimeout(start,1500)});
})()`;

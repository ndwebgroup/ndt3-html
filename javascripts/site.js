/*!
 * Load ND icons
 */
!function(e,t){"use strict";if(!t.createElementNS||!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)return!0;var n,a,s="localStorage"in e&&null!==e.localStorage,o=function(){t.body.insertAdjacentHTML("afterbegin",a)},i=function(){t.body?o():t.addEventListener("DOMContentLoaded",o)};if(s&&1==localStorage.getItem("inlineSVGrev")&&(a=localStorage.getItem("inlineSVGdata")))return i(),!0;try{(n=new XMLHttpRequest).open("GET","https://static.nd.edu/images/icons/base-v1.svg",!0),n.onload=function(){n.status>=200&&n.status<400&&(a=n.responseText,i(),s&&(localStorage.setItem("inlineSVGdata",a),localStorage.setItem("inlineSVGrev",1)))},n.send()}catch(e){}}(window,document);var icons=document.querySelectorAll("span.icon");for(i=0;i<icons.length;i++){var el=icons[i],className=el.getAttribute("class"),dataIcon=el.getAttribute("data-icon"),svg=document.createElementNS("http://www.w3.org/2000/svg","svg"),use=document.createElementNS("http://www.w3.org/2000/svg","use");use.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#icon-"+dataIcon),svg.setAttribute("class",className),svg.setAttribute("data-icon",dataIcon),svg.appendChild(use),el.parentNode.replaceChild(svg,el)}

/*!
 * Responsive wrapper embeds, iframes, etc
 * v2023-05-01
 */
function fitEmbed(embeds){
  for(var i=0; i<embeds.length; i++) {
    var embed = embeds[i],
        width = embed.getAttribute('width'),
        height = embed.getAttribute('height')
    ;
    embed.style.aspectRatio = `${width} / ${height}`;
  }
}
var sources = [
      'iframe[src*="youtube.com"]',
      'iframe[src*="youtube-nocookie.com"]',
      'iframe[src*="vimeo.com"]'
    ],
    embeds = document.querySelectorAll(sources.join(','))
;
if(embeds.length) {
  fitEmbed(embeds);
}

/*!
 * Video Placeholder
 * Uses a link with the class `video` and a child image
 * <a class="video" href="https://www.youtube.com/watch?v=YTID"><img src="..."></a>
 * v2023-05-030
 */
(function(){
  forEach(document.body.querySelectorAll('.video'), function(index, item) {
    var video = item,
        play_button = document.createElement('div')
    ;
    play_button.setAttribute('class', 'play');

    video.appendChild(play_button);
    video.addEventListener('click', loadVideo, false);
  });

  function loadVideo(e){
    e.preventDefault();
    if(this.classList.contains('lightbox')) return;

    var el = this,
        ww = window.innerWidth,
        img = el.getElementsByTagName('img')[0],
        ratio = img.height / img.width,
        w = img.width,
        h = Math.floor(w * ratio),
        href = el.getAttribute('href'),
        service = (href.indexOf('vimeo') >= 0) ? 'vimeo' : 'youtube',
        baseurl = (service == 'youtube') ? 'https://www.youtube-nocookie.com/embed/' : 'https://player.vimeo.com/video/',
        id = (service == 'youtube') ? getURLParameter('v', href) : href.split('/').pop(),
        t = getURLParameter('t', href),
        timestamp = (t) ? `&amp;start=${t}` : ''
    ;

    el.parentNode.innerHTML = `<iframe data-init="false" width="${w}" height="${h}" frameborder="0" src="${baseurl + id}?autoplay=1&amp;rel=0&amp;wmode=transparent&amp;vq=hd720&amp;enablejsapi=1${timestamp}" webkitallowfullscreen mozallowfullscreen allowfullscreen style="aspect-ratio:${w}/${h}"></iframe>`;
  }
})();

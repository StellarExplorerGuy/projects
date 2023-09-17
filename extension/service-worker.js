const X=`<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M424.5,216.5h-15.2c-12.4,0-22.8-10.7-22.8-23.4c0-6.4,2.7-12.2,7.5-16.5l9.8-9.6c9.7-9.6,9.7-25.3,0-34.9l-22.3-22.1  c-4.4-4.4-10.9-7-17.5-7c-6.6,0-13,2.6-17.5,7l-9.4,9.4c-4.5,5-10.5,7.7-17,7.7c-12.8,0-23.5-10.4-23.5-22.7V89.1  c0-13.5-10.9-25.1-24.5-25.1h-30.4c-13.6,0-24.4,11.5-24.4,25.1v15.2c0,12.3-10.7,22.7-23.5,22.7c-6.4,0-12.3-2.7-16.6-7.4l-9.7-9.6  c-4.4-4.5-10.9-7-17.5-7s-13,2.6-17.5,7L110,132c-9.6,9.6-9.6,25.3,0,34.8l9.4,9.4c5,4.5,7.8,10.5,7.8,16.9  c0,12.8-10.4,23.4-22.8,23.4H89.2c-13.7,0-25.2,10.7-25.2,24.3V256v15.2c0,13.5,11.5,24.3,25.2,24.3h15.2  c12.4,0,22.8,10.7,22.8,23.4c0,6.4-2.8,12.4-7.8,16.9l-9.4,9.3c-9.6,9.6-9.6,25.3,0,34.8l22.3,22.2c4.4,4.5,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l9.7-9.6c4.2-4.7,10.2-7.4,16.6-7.4c12.8,0,23.5,10.4,23.5,22.7v15.2c0,13.5,10.8,25.1,24.5,25.1h30.4  c13.6,0,24.4-11.5,24.4-25.1v-15.2c0-12.3,10.7-22.7,23.5-22.7c6.4,0,12.4,2.8,17,7.7l9.4,9.4c4.5,4.4,10.9,7,17.5,7  c6.6,0,13-2.6,17.5-7l22.3-22.2c9.6-9.6,9.6-25.3,0-34.9l-9.8-9.6c-4.8-4.3-7.5-10.2-7.5-16.5c0-12.8,10.4-23.4,22.8-23.4h15.2  c13.6,0,23.3-10.7,23.3-24.3V256v-15.2C447.8,227.2,438.1,216.5,424.5,216.5z M336.8,256L336.8,256c0,44.1-35.7,80-80,80  c-44.3,0-80-35.9-80-80l0,0l0,0c0-44.1,35.7-80,80-80C301.1,176,336.8,211.9,336.8,256L336.8,256z"/></svg>`,j=`
<head>
<style>
  .main-content {
    background-color: var(--color-canvas-default);
    border: 1px solid var(--color-border-default);
    border-radius: 6px;
    padding: 16px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  }
   /* button */
  .button,
  .button:after {
      width: 140px;
      height: 47px;
      line-height: 48px;
      font-size: 20px;
      font-family: 'Bebas Neue', sans-serif;
      background: linear-gradient(45deg, transparent 5%, #FF013C 5%);
      border: 0;
      color: #fff;
      letter-spacing: 3px;
      /* box-shadow: 6px 0px 0px #00E6F6; */
      outline: transparent;
      position: relative;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
  }

  .button:after {
      --slice-0: inset(50% 50% 50% 50%);
      --slice-1: inset(80% -6px 0 0);
      --slice-2: inset(50% -6px 30% 0);
      --slice-3: inset(10% -6px 85% 0);
      --slice-4: inset(40% -6px 43% 0);
      --slice-5: inset(80% -6px 5% 0);
      content: 'ALTERNATE TEXT';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #2196F3 5%);
      text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
      clip-path: var(--slice-0);
  }

  @keyframes glitch {
      0% {
          clip-path: var(--slice-1);
          transform: translate(-20px, -10px);
      }

      10% {
          clip-path: var(--slice-3);
          transform: translate(10px, 10px);
      }

      20% {
          clip-path: var(--slice-1);
          transform: translate(-10px, 10px);
      }

      30% {
          clip-path: var(--slice-3);
          transform: translate(0px, 5px);
      }

      40% {
          clip-path: var(--slice-2);
          transform: translate(-5px, 0px);
      }

      50% {
          clip-path: var(--slice-3);
          transform: translate(5px, 0px);
      }

      60% {
          clip-path: var(--slice-4);
          transform: translate(5px, 10px);
      }

      70% {
          clip-path: var(--slice-2);
          transform: translate(-10px, 10px);
      }

      80% {
          clip-path: var(--slice-5);
          transform: translate(20px, -10px);
      }

      90% {
          clip-path: var(--slice-1);
          transform: translate(-10px, 0px);
      }

      100% {
          clip-path: var(--slice-1);
          transform: translate(0);
      }
  }

  @media (min-width: 768px) {
      .button,
      .button:after {
          width: 140px;
          height: 47px;
          line-height: 48px;
      }
  }

  .button.active:after {
      animation: 1s glitch;
      animation-timing-function: steps(2, end);
  }

  .button:hover {
      background: linear-gradient(45deg, transparent 5%, #2196F3 50%, #00DDEB);
  }
  /* tabs */
  .tabs {
      width: 100%;
      font-size: 15px;
      padding: 0px;
      list-style: none;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
      display: inline-block;
      border-radius: 50px;
      position: relative;
      border: 1px solid var(--color-border-default);
  }

  .tabs a {
      text-decoration: none;
      color: #14a2e7;
      padding: 10px 20px;
      display: inline-block;
      position: relative;
      z-index: 1;
      transition-duration: 0.6s;
  }

  .tabs a:hover {
    color: #777;
  }

  .tabs a.active {
      color: #fff;
  }

  .tabs a i {
      margin-right: 5px;
  }

  .tabs .selector {
      height: 100%;
      display: inline-block;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
      border-radius: 50px;
      transition-duration: 0.6s;
      transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
      background: #05abe0;
      background: -moz-linear-gradient(45deg, #05abe0 0%, #2196F3 100%);
      background: -webkit-linear-gradient(45deg, #05abe0 0%, #2196F3 100%);
      background: linear-gradient(45deg, #05abe0 0%, #2196F3 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#05abe0', endColorstr='#2196F3', GradientType=1);
  }

  /* options */
  .options_wrapper {
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    float: right;
    height: 39px;
    background: #05abe0;
    background-position: center;
    transition: background 0.8s;
    display: inline-block;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  .options {
    position: relative;
    top: 7px;
    right: 3px;
  }
  .options:hover {
    fill: #fff;
  }
  .options svg {
    height: 25px;
    width: 31px;
  }

  .options:hover {
    cursor: pointer;
  }

  /* Styling for the dropdown container */
  .dropdown_x {
    position: relative;
  }
  .dropdown-button_x {
      background-color: #14a2e7;
      color: #fff;
      padding: 10px 20px;
      border: none;
      outline: none;
      cursor: pointer;
      min-width: 120px;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .dropdown-button_x:hover {
    background-color: #e0e0e0;
    color: #333;
  }
  .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 120px;
      max-width: 120px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
  }
  .dropdown-item {
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      color: #333;
      text-align: center;
      cursor: pointer;
  }
  .dropdown-item:hover {
      background-color: #ddd;
  }
</style>
</head>
`,J="Name Surname <name.surname@gmail.com>";function Q(u,w,E){try{let S=function(t,e,o,r){return`${t}: 

<body>

Contributes: ${o.user}/${o.repo}#${e}

Signed-off-by: ${r}`},k=function(t){return`<!-- Commit Message Title
* When opening this PR, the raiser should set the title of this PR to the first line of their desired commit message, e.g:
${x}
feat|fix|docs|style|refactor|perf|test|chore: changed function X
${x}
* The reviewer should ensure that the first commit message field is of this form when performing the ${b}squash and merge${b} from this page.
-->

## Status
**READY**

## Description
${x}
- ${t.type}: 

Contributes:
- ${t.repoDetails.user}/${t.repoDetails.repo}#${t.issueNumber}

Signed-off-by: ${t.user}
${x}

## Impacted Areas in Application
<!-- List general components of the application that this PR will affect: -->

### Screenshots
<!-- For UI items, please provide screenshots demonstrating the work completed -->

## Which issue(s) does this pull-request fix?
<!-- Please include a link to the issue -->
<!-- Contributes to: your-org/your-project# -->
<!-- Closes: your-org/your-project# -->

Contributes:
- ${t.repoDetails.user}/${t.repoDetails.repo}#${t.issueNumber}

## Any special notes for your reviewer?

--- 

## Checklist
- [ ] ~Automated tests exist~
- [ ] ~Local unit tests performed~
- [ ] ~Documentation exists [link]()~
- [x] Local git lint performed
- [x] Desired commit message set as PR title and description set above
- [x] Link to relevant GitHub issue provided
`},a=function(t){try{return JSON.parse(localStorage.getItem(t))||{}}catch{return{}}},C=function(t,e){try{localStorage.setItem(t,JSON.stringify(e))}catch{}},v=function(t){let e="";return t.forEach((o,r)=>e+=r===0?`<a class="active" href="#">${o}</a>`:`<a href="#">${o}</a>`),e},R=function(){try{const t=a(p),o=a(d)[t];return o.branchPrefixes?v(o.branchPrefixes):v(T)}catch{return v(T)}},_=function(){try{const t=a(p),e=a(d);return e.profiles?{selected:t,list:e.profiles}:{selected:d,list:[d]}}catch{return{selected:d,list:[d]}}},D=function(t){let e="";return t.forEach(o=>e+=`<div class="dropdown-item">${o}</div>`),e},F=function(t,e){try{const o=a(p),n=a(d)[o];let i="/";return n.uppercase&&(t=t.toUpperCase()),n.branchSeparator&&(i=n.branchSeparator),`${t}${i}${e}`}catch{return{}}},B=function(t,e,o,r){try{const n=a(p),s=a(d)[n];if(s){let c=r;return s.signature&&(c=s.signature),s.commit.replace(/ISSUE_TYPE/g,t).replace(/ISSUE/g,e).replace(/REPO_ORG/g,o.user).replace(/REPO_NAME/g,o.repo).replace(/SIGNATURE/g,c)}return S(t,e,o,r)}catch{return S(t,e,o,r)}},A=function(t,e,o,r){try{const n=a(p),s=a(d)[n];if(s){let c=r;return s.signature&&(c=s.signature),s.pr.replace(/ISSUE_TYPE/g,t).replace(/ISSUE/g,e).replace(/REPO_ORG/g,o.user).replace(/REPO_NAME/g,o.repo).replace(/SIGNATURE/g,c)}return k({type:activeItem.textContent,issueNumber,repoDetails:f(),user:r})}catch{return k({type:activeItem.textContent,issueNumber,repoDetails:f(),user:r})}},N=function(t){const e="dwedtw",o=t.trim(),r=/#(\d+)/,n=o.match(r),i=n?n[1]:"",c=o.replace(r,"").replace(/(\d)\.(\d)/g,`$1${e}$2`);return(i+"-"+c.replace(/\s+/g,"-").replace(/[^\w-]/g,"").toLowerCase()).replace(/-+$/,"").replace(/-+/g,"-").replace(e,".")},y=function(t){const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)},q=function(t){const e=t.target;e.classList.add("active"),setTimeout(()=>{e.classList.remove("active")},1e3)},f=function(){const t=window.location.href,e=/([^/]+)\/([^/]+)\/issues/,o=t.match(e);if(o&&o.length>=3){const r=o[1],n=o[2];return{user:r,repo:n}}return{user:"",repo:""}},O=function(t){if(t.preventDefault(),t.target.tagName==="A"){document.querySelectorAll(".tabs a").forEach(i=>i.classList.remove("active"));const o=t.target;o.classList.add("active");const r=o.offsetWidth,n=o.offsetLeft;document.querySelector(".selector").style.left=n+"px",document.querySelector(".selector").style.width=r+"px"}};var tt=S,et=k,ot=a,nt=C,rt=v,it=R,st=_,ct=D,at=F,lt=B,dt=A,pt=N,ut=y,ft=q,mt=f,ht=O;const b="`",x="```",$="content-23e32e23",p="FASTER_PR_KEY",d="FASTER_PR_PROFILE",T=["feat","fix","docs","style","refactor","test","chore","release"],m=document.getElementsByClassName("gh-header-title"),L=document.getElementById("fast-pr");if(L&&L.parentNode.removeChild(L),m.length===1){let o=function(){const n=document.getElementById("toggleDropdown"),i=document.getElementById("dropdownContent"),s=document.querySelectorAll(".dropdown-item");n.addEventListener("click",function(){i.style.display==="block"?i.style.display="none":i.style.display="block"}),s.forEach(function(c){c.addEventListener("click",function(){C(p,c.textContent),document.getElementById("fast-pr").remove(),r()})})},r=function(n){const i=_(),s=document.createElement("span"),c=`
        ${w}
          <div id="fast-pr">
            <div class="main-content">
              <div>
                  <b>Copy:</b>
                  <button id="button1" class="button" role="button">Branch</button>
                  <button id="button2" class="button" role="button">Commit</button>
                  <button id="button3" class="button" role="button">PR desc</button>
              </div>
              <nav class="tabs">
                  <div class="selector"></div>
                  ${R()}
                  <span class="options_wrapper">
                  <span class="dropdown_x">
                  <button class="dropdown-button_x" id="toggleDropdown">${i.selected}</button>
                  <span class="dropdown-content" id="dropdownContent">
                    ${D(i.list)}
                  </span>
                  </span>
                   <span id="options" class="options">${u}</span>
                  </span>
              </nav>
            </div>
          </div>
        `;s.innerHTML=c,m[0].appendChild(s);const h=document.getElementById("button1"),U=document.getElementById("button2"),G=document.getElementById("button3"),H=document.querySelector("div#issuecomment-new .d-inline-block > img"),K=/alt="@([^"]+)">/,z=H.outerHTML.match(K);let P=E;z&&(P=z[1]);const g=document.querySelector(".tabs"),M=g.querySelector(".active"),Y=M.offsetWidth;if(document.querySelector(".selector").style.left=M.offsetLeft+"px",document.querySelector(".selector").style.width=Y+"px",h.addEventListener("click",()=>{const l=g.querySelector(".active");y(F(l.textContent,t))}),U.addEventListener("click",()=>{const l=g.querySelector(".active");y(B(l.textContent,e,f(),P))}),G.addEventListener("click",()=>{const l=g.querySelector(".active");y(A(l.textContent,e,f(),P))}),g.addEventListener("click",O),document.querySelectorAll(".button").forEach(l=>l.addEventListener("click",q)),document.getElementById("options").addEventListener("click",()=>{window.postMessage({action:"changeState",newState:!0},"*")}),n)n();else{const l=document.getElementById("toggleDropdown"),I=document.getElementById("dropdownContent"),V=document.querySelectorAll(".dropdown-item");l.addEventListener("click",function(){I.style.display==="block"?I.style.display="none":I.style.display="block"}),V.forEach(function(W){W.addEventListener("click",function(){C(p,W.textContent),document.getElementById("fast-pr").remove(),r()})})}};var gt=o,bt=r;const t=N(m&&m[0]?m[0].textContent:""),e=t.match(/\d+(\.\d+)?/g)[0];if(window.addEventListener("click",function(n){n.target.matches(".dropdown-button_x")||dropdownContent.style.display==="block"&&(dropdownContent.style.display="none")}),r(o),!document.getElementById($)){const n=`<html><head><title>Customization</title><script src="${chrome.runtime.getURL("content.js")}"><\/script></head><body></body></html>`,i=document.createElement("div");i.id=$,i.innerHTML=n,document.body.appendChild(i)}}}catch(b){console.log("[error]",b)}}function Z(u){chrome.scripting.executeScript({target:{tabId:u},function:Q,args:[X,j,J]})}chrome.tabs.onUpdated.addListener((u,w,E)=>{w.status==="complete"&&E.url.includes("github")&&Z(u)});

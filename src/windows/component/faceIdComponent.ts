export const faceIdComponent  = `
<div class="digit-wrp ">
   <div id="digit" class="digit">
   ${Array.from({ length: 10 }, (_, index) => `<span>${index}</span>`).join('')}
   </div>
</div>
<div class="face-id-wrapper hidden">
   <svg class="face-id-default" version="1.1" viewBox="0 0 30 30" >
      <path d="M12.062 20c.688.5 1.688 1 2.938 1s2.25-.5 2.938-1M20 12v2M10 12v2M15 12v4a1 1 0 0 1-1 1" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
      <g fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10">
         <path d="M26 9V6a2 2 0 0 0-2-2h-3M9 4H6a2 2 0 0 0-2 2v3M21 26h3a2 2 0 0 0 2-2v-3M4 21v3a2 2 0 0 0 2 2h3"/>
      </g>
   </svg>
   <svg class="face-id-checked" version="1.1" viewBox="0 0 30 30" >
      <circle cx="15" cy="15" r="11"  fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
      <circle cx="19.5" cy="14.5" r="1.5"/>
      <circle cx="10.5" cy="14.5" r="1.5"/>
      <path d="M12.062 20c.688.5 1.688 1 2.938 1s2.25-.5 2.937-1" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>
   </svg>
   <svg class="face-id-error" width="200" height="200" version="1.1" viewBox="0 0 32 32">
      <path fill-rule="evenodd"  stroke="none" stroke-width="1" d="M16.5 29C23.404 29 29 23.404 29 16.5S23.404 4 16.5 4 4 9.596 4 16.5 9.596 29 16.5 29zm0-1C22.851 28 28 22.851 28 16.5S22.851 5 16.5 5 5 10.149 5 16.5 10.149 28 16.5 28zM12 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4.519 6C13 21 11 23 11 23v-1s2-2 5.481-2C19.963 20 22 22 22 22v1s-2.037-2-5.519-2z"/>
   </svg>
   <div class="scan-bar"></div>
</div>
`
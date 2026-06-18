'use client'
import { useEffect, useRef, useState } from 'react'

function rnd(a: number, b: number) { return a + Math.random() * (b - a) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#',''), f = h.length===3 ? h.split('').map(c=>c+c).join('') : h
  return `rgba(${parseInt(f.slice(0,2),16)},${parseInt(f.slice(2,4),16)},${parseInt(f.slice(4,6),16)},${alpha})`
}
type S = Record<string, any>

const ERAS = [
  // ── 0 BIG BANG ──────────────────────────────────────────────────────────
  {
    name: 'The Big Bang', year: '13.8 BYA', color: '#ff8c42',
    init(s: S) {
      s.p = Array.from({ length: 160 }, () => { const a = Math.random() * Math.PI * 2, sp = rnd(.3, 3.5); return { x: .5, y: .5, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: Math.random(), size: rnd(1, 4), hue: rnd(0, 55) } })
      s.st = 0
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      const bg = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.8)
      bg.addColorStop(0,'#3a1200'); bg.addColorStop(.5,'#1e0800'); bg.addColorStop(1,'#0e0400')
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H)
      const g = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.65)
      g.addColorStop(0,'rgba(255,200,80,.5)'); g.addColorStop(.35,'rgba(200,60,10,.25)'); g.addColorStop(1,'transparent')
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H)
      s.st += .018
      for(let i=0;i<5;i++){const sr=(s.st*140+i*60)%(Math.max(W,H)*1.2); ctx.beginPath(); ctx.arc(W/2,H/2,sr,0,Math.PI*2); ctx.strokeStyle=`rgba(255,${170-i*28},50,${Math.max(0,.55-sr/Math.max(W,H))})`; ctx.lineWidth=2.2; ctx.stroke()}
      s.p.forEach((p:any)=>{ p.x+=p.vx*.0038; p.y+=p.vy*.0038; p.life-=.002; if(p.life<=0){const a=Math.random()*Math.PI*2,sp=rnd(.3,3.5); p.x=.5;p.y=.5;p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp;p.life=1;p.hue=rnd(0,55)}
        const gl=ctx.createRadialGradient(p.x*W,p.y*H,0,p.x*W,p.y*H,p.size*3); gl.addColorStop(0,`hsla(${p.hue},100%,82%,${p.life*.9})`); gl.addColorStop(1,'transparent'); ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(p.x*W,p.y*H,Math.max(0,p.size*3),0,Math.PI*2); ctx.fill()})
    }
  },

  // ── 1 PRIMORDIAL OCEAN ──────────────────────────────────────────────────
  {
    name: 'Primordial Ocean', year: '4.2 BYA', color: '#1a9bba',
    init(s: S) {
      s.b = Array.from({length:40},()=>({x:rnd(0,1),y:rnd(0,1),r:rnd(2,8),vy:-rnd(.0004,.0012),vx:rnd(-.0002,.0002),ph:rnd(0,Math.PI*2)}))
      s.lt = 0
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#052a50'); g.addColorStop(.5,'#063562'); g.addColorStop(1,'#0a3e5e'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H)
      for(let i=0;i<6;i++){const lx=W*(.08+i*.17)+Math.sin(t*.4+i)*18; const lg=ctx.createLinearGradient(lx,0,lx+35,H*.8); lg.addColorStop(0,'rgba(50,160,220,.15)'); lg.addColorStop(1,'transparent'); ctx.fillStyle=lg; ctx.beginPath(); ctx.moveTo(lx,0); ctx.lineTo(lx+45,H*.8); ctx.lineTo(lx-10,H*.8); ctx.closePath(); ctx.fill()}
      for(let v=0;v<2;v++){const vx=W*(.3+v*.4); for(let p=0;p<6;p++){const py=H-((t*60+p*35)%(H*.55)),px=vx+Math.sin(t*2+p+v)*10; ctx.beginPath(); ctx.arc(px,py,rnd(2,5),0,Math.PI*2); ctx.fillStyle=`rgba(180,${80+v*30},20,${.6*(1-(H-py)/(H*.55))})`; ctx.fill()}}
      s.b.forEach((b:any)=>{ b.y+=b.vy; b.x+=b.vx+Math.sin(t*.8+b.ph)*.0002; if(b.y<-.05){b.y=1.05;b.x=rnd(0,1)}
        const bx=b.x*W,by=b.y*H; ctx.beginPath(); ctx.arc(bx,by,b.r,0,Math.PI*2); ctx.strokeStyle='rgba(140,210,255,.5)'; ctx.lineWidth=.9; ctx.stroke(); ctx.fillStyle='rgba(70,160,220,.1)'; ctx.fill(); ctx.beginPath(); ctx.arc(bx-b.r*.3,by-b.r*.3,Math.max(0,b.r*.28),0,Math.PI*2); ctx.fillStyle='rgba(210,245,255,.55)'; ctx.fill()})
      s.lt+=.016; if(Math.sin(s.lt*3.5)>.91){let lx=W*rnd(.15,.85),ly=0; ctx.save(); ctx.globalAlpha=.85; ctx.beginPath(); ctx.moveTo(lx,ly); while(ly<H*.45){ly+=rnd(7,18);lx+=rnd(-22,22);ctx.lineTo(lx,ly)}; ctx.strokeStyle='rgba(170,230,255,.95)'; ctx.lineWidth=1.5; ctx.stroke(); ctx.strokeStyle='rgba(170,230,255,.2)'; ctx.lineWidth=8; ctx.stroke(); ctx.restore()}
    }
  },

  // ── 2 FIRST LIFE ────────────────────────────────────────────────────────
  {
    name: 'First Life', year: '3.8 BYA', color: '#2daa5e',
    init(s: S) {
      s.c = Array.from({length:8},()=>({x:rnd(.1,.9),y:rnd(.1,.9),r:rnd(12,24),ph:rnd(0,Math.PI*2),vx:rnd(-.0003,.0003),vy:rnd(-.0003,.0003),hue:rnd(115,155),dT:-1}))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      const g=ctx.createRadialGradient(W*.4,H*.4,0,W*.5,H*.5,W*.9); g.addColorStop(0,'#0c3018'); g.addColorStop(.6,'#071a0d'); g.addColorStop(1,'#041008'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H)
      for(let i=0;i<30;i++){const sx=((i*137+t*12)%1)*W,sy=((i*97+Math.sin(t*.3+i)*.1)%1)*H; ctx.beginPath(); ctx.arc(sx,sy,rnd(.5,1.8),0,Math.PI*2); ctx.fillStyle=`rgba(90,255,150,${rnd(.15,.45)})`; ctx.fill()}
      s.c.forEach((c:any)=>{ c.x+=c.vx+Math.sin(t*.5+c.ph)*.0002; c.y+=c.vy+Math.cos(t*.4+c.ph)*.0002; if(c.x<.08||c.x>.92)c.vx*=-1; if(c.y<.08||c.y>.92)c.vy*=-1; if(c.dT<0&&Math.random()<.0005)c.dT=0; if(c.dT>=0){c.dT+=.018; if(c.dT>1){c.dT=-1; if(s.c.length<18)s.c.push({...c,x:c.x+.04,ph:rnd(0,Math.PI*2),vx:rnd(-.0003,.0003),vy:rnd(-.0003,.0003),dT:-1})}}
        const st=c.dT>=0?1+Math.sin(c.dT*Math.PI)*.38:1,pulse=1+Math.sin(t*1.5+c.ph)*.09
        ctx.save(); ctx.translate(c.x*W,c.y*H)
        const og=ctx.createRadialGradient(0,0,c.r,0,0,c.r*2.8); og.addColorStop(0,`hsla(${c.hue},75%,42%,.18)`); og.addColorStop(1,'transparent'); ctx.fillStyle=og; ctx.beginPath(); ctx.arc(0,0,c.r*2.8,0,Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.ellipse(0,0,Math.max(.1,c.r*pulse*st),Math.max(.1,c.r*pulse/st),0,0,Math.PI*2); ctx.strokeStyle=`hsla(${c.hue},85%,58%,.8)`; ctx.lineWidth=1.8; ctx.stroke(); ctx.fillStyle=`hsla(${c.hue},60%,14%,.5)`; ctx.fill()
        ctx.beginPath(); ctx.ellipse(0,0,Math.max(.1,c.r*.4*st),Math.max(.1,c.r*.4/st),0,0,Math.PI*2); ctx.fillStyle=`hsla(${c.hue},92%,62%,.65)`; ctx.fill()
        for(let f=0;f<3;f++){const fa=(Math.PI*2/3)*f+c.ph,bx=Math.cos(fa)*c.r,by=Math.sin(fa)*c.r; ctx.beginPath(); ctx.moveTo(bx,by); for(let i=1;i<8;i++){const fi=i/8; ctx.lineTo(bx+Math.cos(fa)*c.r*fi*1.5+Math.sin(t*3+f+i)*c.r*.28*fi,by+Math.sin(fa)*c.r*fi*1.5+Math.cos(t*2+f+i)*c.r*.28*fi)}; ctx.strokeStyle=`hsla(${c.hue},72%,52%,.35)`; ctx.lineWidth=.8; ctx.stroke()}
        ctx.restore()
      })
    }
  },

  // ── 3 CAMBRIAN (fixed) ──────────────────────────────────────────────────
  {
    name: 'Cambrian Explosion', year: '540 MYA', color: '#4a9fd5',
    init(s: S) {
      s.jelly = Array.from({length:5},()=>({x:rnd(.1,.9),y:rnd(.1,.8),vx:rnd(-.0005,.0005),vy:rnd(-.0004,.0004),r:rnd(18,35),hue:rnd(180,300),ph:rnd(0,Math.PI*2)}))
      s.trilos = Array.from({length:4},()=>({x:rnd(.05,.95),y:rnd(.2,.85),vx:rnd(-.0007,.0007),vy:rnd(-.0004,.0004),sz:rnd(14,24),hue:rnd(25,60),ph:rnd(0,Math.PI*2)}))
      s.spirals = Array.from({length:3},()=>({x:rnd(.1,.9),y:rnd(.1,.85),sz:rnd(12,22),hue:rnd(40,80),vx:rnd(-.0004,.0004),vy:rnd(-.0003,.0003),ph:rnd(0,Math.PI*2)}))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,'#052a42'); g.addColorStop(.55,'#073355'); g.addColorStop(1,'#0a2038'); ctx.fillStyle=g; ctx.fillRect(0,0,W,H)
      // light rays
      for(let i=0;i<5;i++){const lx=W*(.1+i*.2)+Math.sin(t*.3+i)*15; ctx.save(); ctx.globalAlpha=.07; ctx.fillStyle='rgba(80,180,255,1)'; ctx.beginPath(); ctx.moveTo(lx,0); ctx.lineTo(lx+40,H*.85); ctx.lineTo(lx-12,H*.85); ctx.closePath(); ctx.fill(); ctx.restore()}
      // sea floor
      const floorG=ctx.createLinearGradient(0,H*.82,0,H); floorG.addColorStop(0,'#1a1208'); floorG.addColorStop(1,'#0e0c05'); ctx.fillStyle=floorG; ctx.fillRect(0,H*.82,W,H*.18)
      // coral on floor
      for(let i=0;i<10;i++){const bx=W*(i/9+Math.sin(i)*.03),by=H*.82; ctx.save(); ctx.translate(bx,by); ctx.strokeStyle=`rgba(${180+i*5},${70+i*6},60,.8)`; ctx.lineWidth=2;
        function br(len:number,ang:number,d:number){if(d>3||len<3)return; ctx.save(); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-len); ctx.stroke(); ctx.translate(0,-len); br(len*.62,.45+Math.sin(t*.8+d)*.1,d+1); br(len*.62,-.45+Math.sin(t*.6+d)*.1,d+1); ctx.restore()}
        br(by*.3,0,0); ctx.restore()}
      // jellyfish
      s.jelly.forEach((j:any)=>{ j.x+=j.vx+Math.sin(t*.3+j.ph)*.0003; j.y+=j.vy+Math.cos(t*.25+j.ph)*.0002; if(j.x<.05||j.x>.95)j.vx*=-1; if(j.y<.05||j.y>.9)j.vy*=-1; const x=j.x*W,y=j.y*H,jb=1+Math.sin(t*1.8+j.ph)*.25
        ctx.save(); ctx.translate(x,y)
        const jg=ctx.createRadialGradient(0,0,0,0,0,j.r*1.5); jg.addColorStop(0,`hsla(${j.hue},80%,70%,.22)`); jg.addColorStop(1,'transparent'); ctx.fillStyle=jg; ctx.beginPath(); ctx.arc(0,0,j.r*1.5,0,Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.ellipse(0,-j.r*.2,Math.max(0,j.r*jb),Math.max(0,j.r*.7*jb),0,Math.PI,0); ctx.fillStyle=`hsla(${j.hue},75%,65%,.45)`; ctx.fill(); ctx.strokeStyle=`hsla(${j.hue},85%,75%,.75)`; ctx.lineWidth=1.2; ctx.stroke()
        for(let tt=0;tt<7;tt++){const ta=(Math.PI/6)*tt-Math.PI/2; const tx=Math.cos(ta)*j.r*jb,ty=0; ctx.beginPath(); ctx.moveTo(tx,ty); ctx.quadraticCurveTo(tx+Math.sin(t*1.5+tt)*12,j.r*.9,tx+Math.sin(t+tt)*5,j.r*1.6); ctx.strokeStyle=`hsla(${j.hue},65%,72%,.4)`; ctx.lineWidth=1; ctx.stroke()}
        ctx.restore()})
      // trilobites
      s.trilos.forEach((c:any)=>{ c.x+=c.vx+Math.sin(t*.4+c.ph)*.0003; c.y+=c.vy; if(c.x<.05||c.x>.95)c.vx*=-1; if(c.y<.08||c.y>.88)c.vy*=-1; const x=c.x*W,y=c.y*H; ctx.save(); ctx.translate(x,y); ctx.rotate(Math.atan2(c.vy,c.vx))
        ctx.fillStyle=`hsla(${c.hue},58%,42%,.8)`; ctx.strokeStyle=`hsla(${c.hue},68%,58%,.9)`; ctx.lineWidth=.8
        for(let sg=0;sg<5;sg++){ctx.beginPath(); ctx.ellipse(0,(sg-2)*c.sz*.3,c.sz*.48,c.sz*.17,0,0,Math.PI*2); ctx.fill(); ctx.stroke()}
        ctx.fillStyle='rgba(255,255,190,.9)'; ctx.beginPath(); ctx.arc(-c.sz*.18,-c.sz*1.05,2.5,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(c.sz*.18,-c.sz*1.05,2.5,0,Math.PI*2); ctx.fill(); ctx.restore()})
      // nautilus spirals
      s.spirals.forEach((sp:any)=>{ sp.x+=sp.vx; sp.y+=sp.vy; if(sp.x<.08||sp.x>.92)sp.vx*=-1; if(sp.y<.08||sp.y>.88)sp.vy*=-1; ctx.save(); ctx.translate(sp.x*W,sp.y*H); ctx.rotate(t*.3+sp.ph); ctx.beginPath(); for(let ri=0;ri<sp.sz;ri+=.6){const ang=ri*.42+t*.4; ctx.lineTo(Math.cos(ang)*ri,Math.sin(ang)*ri)}; ctx.strokeStyle=`hsla(${sp.hue},62%,62%,.75)`; ctx.lineWidth=1.8; ctx.stroke(); ctx.restore()})
    }
  },

  // ── 4 DINOSAURS + METEOR (complete redraw) ──────────────────────────────
  {
    name: 'Dinosaurs + Meteor', year: '230 MYA', color: '#8ab54a',
    init(s: S) {
      s.dinos=[{x:.15,y:.68,dir:1,sp:.0012,sz:32,type:'rex'},{x:.5,y:.7,dir:-1,sp:.001,sz:18,type:'raptor'},{x:.8,y:.66,dir:1,sp:.0006,sz:42,type:'brach'}]
      s.vt=0; s.trees=Array.from({length:8},(_,i)=>({x:i/7,h:rnd(.28,.52),sw:rnd(0,Math.PI*2)}))
      s.launched=false; s.mT=0; s.impT=-1; s.debris=[]; s.dust=[]; s.mX=0; s.mY=0
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      if(!s.launched&&t>3){s.launched=true;s.mT=0}
      const imp=s.impT>=0, skyDark=imp?Math.min(.7,s.impT*.09):0
      // sky
      const sky=ctx.createLinearGradient(0,0,0,H*.6); sky.addColorStop(0,`rgb(${Math.round(lerp(38,8,skyDark))},${Math.round(lerp(75,12,skyDark))},${Math.round(lerp(120,5,skyDark))})`); sky.addColorStop(1,`rgb(${Math.round(lerp(80,25,skyDark))},${Math.round(lerp(130,30,skyDark))},${Math.round(lerp(180,20,skyDark))})`); ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*.6)
      // clouds
      for(let i=0;i<4;i++){const cx2=W*(.1+i*.24+Math.sin(t*.15+i)*.04),cy2=H*(.1+Math.sin(i*.8)*.06); ctx.save(); ctx.globalAlpha=Math.max(0,.3-skyDark*.4); for(let b=0;b<4;b++){ctx.beginPath();ctx.arc(cx2+b*22,cy2+Math.sin(b)*.1*18,16+b*4,0,Math.PI*2);ctx.fillStyle='rgba(220,235,255,1)';ctx.fill()}; ctx.restore()}
      // sun / glow
      if(!imp){const sunG=ctx.createRadialGradient(W*.75,H*.08,0,W*.75,H*.08,55); sunG.addColorStop(0,'rgba(255,240,180,.8)'); sunG.addColorStop(.5,'rgba(255,210,80,.2)'); sunG.addColorStop(1,'transparent'); ctx.fillStyle=sunG; ctx.fillRect(0,0,W,H)}
      // ground layers
      const g1=ctx.createLinearGradient(0,H*.58,0,H); g1.addColorStop(0,`rgba(${Math.round(lerp(45,18,skyDark))},${Math.round(lerp(90,22,skyDark))},${Math.round(lerp(20,8,skyDark))},1)`); g1.addColorStop(1,`rgba(${Math.round(lerp(25,10,skyDark))},${Math.round(lerp(55,14,skyDark))},${Math.round(lerp(10,4,skyDark))},1)`); ctx.fillStyle=g1; ctx.fillRect(0,H*.58,W,H*.42)
      // trees
      s.trees.forEach((tr:any)=>{const tx=tr.x*W,ty=H*.6,th=tr.h*H,sw=Math.sin(t*.4+tr.sw)*.02; ctx.save(); ctx.translate(tx,ty); ctx.globalAlpha=Math.max(.2,1-skyDark*.7)
        ctx.fillStyle=`rgba(${Math.round(lerp(28,12,skyDark))},45,12,1)`; ctx.beginPath(); ctx.rect(-4,-th,8,th); ctx.fill()
        for(let l=0;l<5;l++){const ly=-th+l*(th/4.2),lw=18+l*10; ctx.beginPath(); ctx.moveTo(-lw,ly); ctx.lineTo(lw,ly); ctx.lineTo(sw*40,ly-th/5); ctx.closePath(); ctx.fillStyle=`rgba(${Math.round(lerp(35+l*4,12,skyDark))},${Math.round(lerp(82+l*6,20,skyDark))},18,.9)`; ctx.fill()}
        ctx.restore()})
      // ferns
      ctx.globalAlpha=Math.max(.1,1-skyDark*.8)
      for(let f=0;f<22;f++){const fx=W*(f/21+Math.sin(f)*.02),fy=H*.6; ctx.save(); ctx.translate(fx,fy); for(let b=0;b<4;b++){const ba=-Math.PI*.7+b*.4; ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(ba)*16,Math.sin(ba)*-12); ctx.strokeStyle=`rgba(${Math.round(lerp(55,20,skyDark))},${Math.round(lerp(110,30,skyDark))},22,.7)`; ctx.lineWidth=1; ctx.stroke()}; ctx.restore()}
      ctx.globalAlpha=1
      // dinos
      s.dinos.forEach((d:any)=>{const flee=imp?s.impT*.005:0; d.x+=(d.sp+flee)*d.dir; if(d.x<-.15)d.dir=1; if(d.x>1.15)d.dir=-1; const dx=d.x*W,dy=d.y*H,wk=Math.sin(t*3.5)*.18; ctx.save(); ctx.translate(dx,dy); ctx.scale(d.dir,1); ctx.globalAlpha=Math.max(.15,1-skyDark*.6); ctx.strokeStyle='rgba(60,45,25,.9)'; ctx.fillStyle='rgba(80,62,38,.85)'; ctx.lineWidth=1.8; ctx.lineCap='round'
        if(d.type==='rex'){ctx.beginPath();ctx.ellipse(0,0,d.sz*.65,d.sz*.3,-.1,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(d.sz*.45,-d.sz*.28,d.sz*.3,d.sz*.2,-.28,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-d.sz*.45,0);ctx.lineTo(-d.sz*1.1,.08*d.sz);ctx.lineWidth=d.sz*.13;ctx.stroke();ctx.beginPath();ctx.moveTo(0,d.sz*.22);ctx.lineTo(-d.sz*.16,d.sz*.75+Math.abs(wk)*d.sz*.2);ctx.lineWidth=d.sz*.1;ctx.stroke();ctx.beginPath();ctx.moveTo(0,d.sz*.22);ctx.lineTo(d.sz*.12,d.sz*.75-Math.abs(wk)*d.sz*.2);ctx.lineWidth=d.sz*.1;ctx.stroke()}
        else if(d.type==='brach'){ctx.beginPath();ctx.ellipse(0,0,d.sz*.85,d.sz*.28,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(d.sz*.42,-.08*d.sz);ctx.quadraticCurveTo(d.sz*.62,-d.sz,d.sz*.25+Math.sin(t*.7)*6,-d.sz*1.35);ctx.lineWidth=d.sz*.15;ctx.strokeStyle='rgba(70,55,30,.9)';ctx.stroke();for(let l=0;l<4;l++){ctx.beginPath();ctx.strokeStyle='rgba(80,62,38,.9)';ctx.lineWidth=d.sz*.08;ctx.moveTo((l-.5)*d.sz*.25*2,d.sz*.2);ctx.lineTo((l-.5)*d.sz*.25*2+wk*d.sz*.12*(l%2?1:-1),d.sz*.72);ctx.stroke()}}
        else{ctx.beginPath();ctx.ellipse(0,0,d.sz*.58,d.sz*.22,-.1,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(d.sz*.38,-d.sz*.18,d.sz*.22,d.sz*.15,-.2,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(0,d.sz*.18);ctx.lineTo(wk*d.sz*.22-d.sz*.08,d.sz*.62);ctx.lineWidth=d.sz*.07;ctx.stroke();ctx.beginPath();ctx.moveTo(0,d.sz*.18);ctx.lineTo(-wk*d.sz*.22+d.sz*.08,d.sz*.62);ctx.lineWidth=d.sz*.07;ctx.stroke()}
        ctx.restore()})
      // volcano far bg
      ctx.save(); ctx.globalAlpha=Math.max(.3,.7-skyDark*.3)
      const vx=W*.88,vb=H*.6; ctx.beginPath(); ctx.moveTo(vx-45,vb); ctx.lineTo(vx,H*.28); ctx.lineTo(vx+38,vb); ctx.closePath(); ctx.fillStyle='rgba(35,20,12,.9)'; ctx.fill()
      s.vt+=.01; if(Math.sin(s.vt)>.7){for(let e=0;e<6;e++){ctx.beginPath();ctx.arc(vx+Math.cos(rnd(-2.2,-1))*rnd(5,30)*(s.vt%1),H*.28+Math.sin(rnd(-2.2,-1))*rnd(5,30)*(s.vt%1)*1.5,rnd(1,4),0,Math.PI*2);ctx.fillStyle=`rgba(255,${rnd(60,150)},15,${rnd(.4,.9)})`;ctx.fill()}}
      ctx.restore()
      // ── METEOR ──
      if(s.launched&&s.impT<0){s.mT+=.016; const prog=Math.min(1,s.mT);
        s.mX=W*(.92-prog*.52); s.mY=-H*.05+prog*(H*.68)
        if(prog<1){
          // trail
          const tg=ctx.createLinearGradient(s.mX,s.mY,s.mX+W*.18,s.mY-H*.22); tg.addColorStop(0,'rgba(255,200,80,.9)'); tg.addColorStop(.5,'rgba(255,100,20,.4)'); tg.addColorStop(1,'transparent'); ctx.fillStyle=tg; ctx.beginPath(); ctx.moveTo(s.mX-5,s.mY-3); ctx.lineTo(s.mX+W*.18,s.mY-H*.22); ctx.lineTo(s.mX+5,s.mY+3); ctx.closePath(); ctx.fill()
          // glow
          const mg=ctx.createRadialGradient(s.mX,s.mY,0,s.mX,s.mY,20); mg.addColorStop(0,'rgba(255,255,200,1)'); mg.addColorStop(.4,'rgba(255,160,50,.9)'); mg.addColorStop(1,'transparent'); ctx.fillStyle=mg; ctx.beginPath(); ctx.arc(s.mX,s.mY,20,0,Math.PI*2); ctx.fill()
          ctx.beginPath(); ctx.arc(s.mX,s.mY,7,0,Math.PI*2); ctx.fillStyle='#fff'; ctx.fill()
        } else if(s.impT<0){
          s.impT=0
          s.debris=Array.from({length:70},()=>{const a=rnd(-Math.PI,0),sp=rnd(2,7); return{x:s.mX/W,y:s.mY/H,vx:Math.cos(a)*sp*.002,vy:Math.sin(a)*sp*.002-.005,life:1,sz:rnd(2,8),hue:rnd(8,48)}})
          s.dust=Array.from({length:16},()=>({x:s.mX/W+rnd(-.05,.05),y:s.mY/H,r:rnd(15,50),vx:rnd(-.001,.001),vy:-rnd(.001,.004),life:1}))
        }
      }
      if(s.impT>=0){s.impT+=.009
        // ground flash
        const ig=ctx.createRadialGradient(s.mX,s.mY,0,s.mX,s.mY,Math.min(130,s.impT*150)); ig.addColorStop(0,`rgba(255,200,60,${Math.max(0,.7-s.impT*.12)})`); ig.addColorStop(.5,`rgba(255,80,15,${Math.max(0,.35-s.impT*.07)})`); ig.addColorStop(1,'transparent'); ctx.fillStyle=ig; ctx.beginPath(); ctx.arc(s.mX,s.mY,Math.min(140,s.impT*160),0,Math.PI*2); ctx.fill()
        for(let ri=0;ri<3;ri++){const rr=(s.impT*250+ri*65)%400; ctx.beginPath(); ctx.arc(s.mX,s.mY,rr,0,Math.PI*2); ctx.strokeStyle=`rgba(255,170,45,${Math.max(0,.4-rr/400)})`; ctx.lineWidth=1.8; ctx.stroke()}
        s.debris.forEach((d:any)=>{d.x+=d.vx;d.y+=d.vy;d.vy+=.00013;d.life-=.01;d.sz*=.995; if(d.life<=0)return; ctx.beginPath(); ctx.arc(d.x*W,d.y*H,Math.max(0,d.sz),0,Math.PI*2); ctx.fillStyle=`hsla(${d.hue},90%,${40+d.life*25}%,${d.life})`; ctx.fill()})
        s.dust.forEach((dc:any)=>{dc.x+=dc.vx;dc.y+=dc.vy;dc.r+=.6;dc.life-=.006; if(dc.life<=0)return; ctx.beginPath(); ctx.arc(dc.x*W,dc.y*H,Math.max(0,dc.r),0,Math.PI*2); ctx.fillStyle=`rgba(180,140,80,${dc.life*.14})`; ctx.fill()})
        ctx.fillStyle=`rgba(10,5,2,${Math.min(.65,s.impT*.08)})`; ctx.fillRect(0,0,W,H)
      }
    }
  },

  // ── 5 MAMMALS ───────────────────────────────────────────────────────────
  {
    name: 'Rise of Mammals', year: '65 MYA', color: '#c4a35a',
    init(s: S) {
      s.ff=Array.from({length:28},()=>({x:rnd(0,1),y:rnd(.35,.9),ph:rnd(0,Math.PI*2),vx:rnd(-.0003,.0003),vy:rnd(-.0002,.0002)}))
      s.st=Array.from({length:120},()=>({x:rnd(0,1),y:rnd(0,.42),sz:rnd(.4,2.4),ph:rnd(0,Math.PI*2)}))
      s.mw=Array.from({length:130},()=>({x:rnd(.08,.92),y:rnd(.02,.3)+rnd(0,.05)*Math.random(),sz:rnd(.2,1.5),a:rnd(.1,.5)}))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      const sk=ctx.createLinearGradient(0,0,0,H*.52); sk.addColorStop(0,'#0e1030'); sk.addColorStop(.5,'#121e40'); sk.addColorStop(1,'#162e28'); ctx.fillStyle=sk; ctx.fillRect(0,0,W,H*.52)
      for(let au=0;au<5;au++){const ax=W*(.05+au*.22)+Math.sin(t*.2+au)*35; const ag=ctx.createLinearGradient(ax,0,ax+90,H*.42); ag.addColorStop(0,'transparent'); ag.addColorStop(.4,`rgba(${40+au*18},${175-au*8},${75+au*12},.1)`); ag.addColorStop(1,'transparent'); ctx.fillStyle=ag; ctx.beginPath(); ctx.moveTo(ax,0); ctx.lineTo(ax+70+Math.sin(t*.3+au)*28,H*.42); ctx.lineTo(ax-15,H*.42); ctx.closePath(); ctx.fill()}
      s.mw.forEach((m:any)=>{ctx.beginPath();ctx.arc(m.x*W,m.y*H,Math.max(0,m.sz),0,Math.PI*2);ctx.fillStyle=`rgba(200,180,255,${m.a*.3})`;ctx.fill()})
      s.st.forEach((st:any)=>{const tw=Math.abs(.4+.6*Math.sin(t*1.5+st.ph));ctx.beginPath();ctx.arc(st.x*W,st.y*H,Math.max(0,st.sz*tw),0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${tw*.88})`;ctx.fill()})
      // moon
      const mg=ctx.createRadialGradient(W*.82,H*.1,0,W*.82,H*.1,35); mg.addColorStop(0,'rgba(255,250,220,.98)'); mg.addColorStop(.65,'rgba(240,228,178,.85)'); mg.addColorStop(1,'transparent'); ctx.fillStyle=mg; ctx.beginPath(); ctx.arc(W*.82,H*.1,33,0,Math.PI*2); ctx.fill()
      // ground
      const gr=ctx.createLinearGradient(0,H*.48,0,H); gr.addColorStop(0,'#1e3015'); gr.addColorStop(.4,'#16240e'); gr.addColorStop(1,'#101a08'); ctx.fillStyle=gr; ctx.fillRect(0,H*.48,W,H)
      for(let g2=0;g2<50;g2++){const gx=W*(g2/49),gy=H*.49; ctx.save(); ctx.translate(gx,gy); const sw=Math.sin(t*.8+g2*.28); for(let b=0;b<3;b++){const ba=-.5+b*.5; ctx.beginPath(); ctx.moveTo(0,0); ctx.quadraticCurveTo(Math.cos(ba)*7+sw*5,-13,Math.cos(ba)*10+sw*7,-22); ctx.strokeStyle='rgba(32,65,18,.78)'; ctx.lineWidth=1.1; ctx.stroke()}; ctx.restore()}
      // fireflies
      s.ff.forEach((f:any)=>{f.x+=f.vx;f.y+=f.vy+Math.sin(t*1.5+f.ph)*.0003; if(f.x<0)f.x=1;if(f.x>1)f.x=0;if(f.y<.35)f.y=.9;if(f.y>.92)f.y=.35; const gl=Math.abs(.5+.5*Math.sin(t*3+f.ph)); if(gl>.62){const fg=ctx.createRadialGradient(f.x*W,f.y*H,0,f.x*W,f.y*H,10); fg.addColorStop(0,`rgba(195,255,95,${gl*.9})`); fg.addColorStop(1,'transparent'); ctx.fillStyle=fg; ctx.beginPath(); ctx.arc(f.x*W,f.y*H,10,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(f.x*W,f.y*H,2.2,0,Math.PI*2); ctx.fillStyle=`rgba(220,255,120,${gl})`; ctx.fill()}})
      // deer
      const dx=W*.38+Math.sin(t*.4)*W*.04,dy=H*.65,wk=Math.sin(t*2.5)*.14; ctx.save(); ctx.translate(dx,dy); ctx.strokeStyle='rgba(115,85,45,.92)'; ctx.fillStyle='rgba(98,72,38,.85)'; ctx.lineWidth=1.9; ctx.lineCap='round'; ctx.beginPath(); ctx.ellipse(0,0,22,10,0,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(15,-7); ctx.lineTo(14,-28+Math.sin(t*.8)*3); ctx.lineWidth=7; ctx.stroke(); ctx.beginPath(); ctx.ellipse(14,-28,7,5,.18,0,Math.PI*2); ctx.fill(); ctx.stroke(); ctx.strokeStyle='rgba(75,50,22,.82)'; ctx.lineWidth=1.3; for(let br=0;br<3;br++){const ba=-Math.PI*.88+br*.4; ctx.beginPath(); ctx.moveTo(14,-34); ctx.lineTo(14+Math.cos(ba)*14,-34+Math.sin(ba)*14); ctx.stroke()}; for(let lg=0;lg<4;lg++){ctx.beginPath(); ctx.strokeStyle='rgba(100,75,40,.9)'; ctx.lineWidth=9; ctx.moveTo((lg*.22-.28)*42,8); ctx.lineTo((lg*.22-.28)*42+(lg%2?wk:-wk)*8,32); ctx.stroke()}; ctx.restore()
    }
  },

  // ── 6 HOMO SAPIENS ──────────────────────────────────────────────────────
  {
    name: 'Homo Sapiens', year: '300 KYA', color: '#e8a44a',
    init(s: S) {
      s.fp=Array.from({length:55},()=>({x:.5,y:.7,vx:rnd(-.004,.004),vy:-rnd(.003,.009),life:rnd(0,1),sz:rnd(1.5,7),hue:rnd(8,45)}))
      s.ft=0
      s.st=Array.from({length:160},()=>({x:rnd(0,1),y:rnd(0,.4),sz:rnd(.3,2.4),p:rnd(0,Math.PI*2)}))
      s.mw=Array.from({length:200},()=>({x:rnd(.05,.95),y:rnd(.01,.32)+rnd(0,.06)*Math.random(),sz:rnd(.15,1.6),a:rnd(.08,.55)}))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      // rich night sky
      const sk=ctx.createLinearGradient(0,0,0,H*.42); sk.addColorStop(0,'#0a0828'); sk.addColorStop(.5,'#0e0c30'); sk.addColorStop(1,'#141238'); ctx.fillStyle=sk; ctx.fillRect(0,0,W,H*.42)
      s.mw.forEach((m:any)=>{ctx.beginPath();ctx.arc(m.x*W,m.y*H,Math.max(0,m.sz),0,Math.PI*2);ctx.fillStyle=`rgba(210,190,255,${m.a*.32})`;ctx.fill()})
      s.st.forEach((st:any)=>{const tw=Math.abs(.38+.62*Math.sin(t*1.5+st.p));ctx.beginPath();ctx.arc(st.x*W,st.y*H,Math.max(0,st.sz*tw),0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${tw})`;ctx.fill()})
      // orange horizon glow
      const hg=ctx.createLinearGradient(0,H*.32,0,H*.45); hg.addColorStop(0,'transparent'); hg.addColorStop(1,'rgba(200,90,20,.22)'); ctx.fillStyle=hg; ctx.fillRect(0,H*.32,W,H*.13)
      // rich dark ground
      const gr=ctx.createLinearGradient(0,H*.4,0,H); gr.addColorStop(0,'#3a2210'); gr.addColorStop(.2,'#2a1a0c'); gr.addColorStop(1,'#1e1408'); ctx.fillStyle=gr; ctx.fillRect(0,H*.4,W,H)
      // rocks
      for(let rk=0;rk<12;rk++){ctx.beginPath();ctx.ellipse(rk*W/11+rnd(0,W/12),H*.42+rnd(0,H*.08),rnd(8,25),rnd(2.5,7),rnd(0,.6),0,Math.PI*2);ctx.fillStyle='rgba(28,20,12,.9)';ctx.fill()}
      // FIRE — bright and visible
      s.ft+=.016
      s.fp.forEach((p:any)=>{p.x+=p.vx+Math.sin(s.ft*4+p.life*6)*.003;p.y+=p.vy;p.life-=.022;p.sz*=.98; if(p.life<=0){p.x=.5+rnd(-.03,.03);p.y=.7;p.vx=rnd(-.004,.004);p.vy=-rnd(.003,.009);p.life=rnd(.3,1);p.sz=rnd(1.5,7);p.hue=rnd(8,45)}
        ctx.beginPath();ctx.arc(p.x*W,p.y*H,Math.max(0,p.sz),0,Math.PI*2);ctx.fillStyle=`hsla(${p.hue},100%,${60+p.life*35}%,${Math.min(1,p.life*1.1)})`;ctx.fill()})
      // fire glow on ground
      const fg=ctx.createRadialGradient(W*.5,H*.7,5,W*.5,H*.7,100); fg.addColorStop(0,'rgba(255,140,25,.6)'); fg.addColorStop(.5,'rgba(200,80,10,.25)'); fg.addColorStop(1,'transparent'); ctx.beginPath(); ctx.arc(W*.5,H*.7,100,0,Math.PI*2); ctx.fillStyle=fg; ctx.fill()
      // 3 human silhouettes lit by fire
      ;([[.28,.62],[.5,.58],[.72,.63]] as [number,number][]).forEach((pair,i)=>{const hx=pair[0],hy=pair[1],x=hx*W,y=hy*H,sz=18,sw=Math.sin(t*1.2+i)*.04; ctx.save(); ctx.translate(x,y); ctx.globalAlpha=.92
        const fl=.5+.5*Math.sin(t*3+i); ctx.strokeStyle=`rgba(${210+fl*45},${145+fl*25},${65+fl*20},1)`; ctx.lineWidth=2.2; ctx.lineCap='round'
        ctx.beginPath();ctx.arc(sw*9,-sz*.85,sz*.27,0,Math.PI*2);ctx.stroke()
        ctx.beginPath();ctx.moveTo(sw*8,-sz*.58);ctx.lineTo(sw*5,0);ctx.stroke()
        ctx.beginPath();ctx.moveTo(sw*5,-sz*.32);ctx.lineTo(sw*5-sz*.42+(i===1?Math.sin(t*2)*sz*.2:0),-sz*.06);ctx.stroke()
        ctx.beginPath();ctx.moveTo(sw*5,0);ctx.lineTo(-sz*.28,sz*.42);ctx.stroke()
        ctx.beginPath();ctx.moveTo(sw*5,0);ctx.lineTo(sz*.2,sz*.42);ctx.stroke()
        ctx.restore()})
      // cave art left
      ctx.save();ctx.globalAlpha=.4;ctx.strokeStyle='rgba(220,150,75,1)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(W*.1,H*.52,20,10,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(W*.1+18,H*.52);ctx.lineTo(W*.1+30,H*.49);ctx.stroke();for(let l=0;l<3;l++){ctx.beginPath();ctx.moveTo(W*.1-8+l*9,H*.52+7);ctx.lineTo(W*.1-8+l*9+2,H*.52+18);ctx.stroke()};ctx.restore()
    }
  },

  // ── 7 TECH ERA ──────────────────────────────────────────────────────────
  {
    name: 'The Tech Era', year: '2024 CE', color: '#818cf8',
    init(s: S) {
      const pool=['01','async','await','const','let','=>','{}','[]','type','import','React','null','void','class','fn()','API','git','npm','ssh','TCP']
      s.rain=Array.from({length:18},()=>({x:rnd(0,1),chars:Array.from({length:14},()=>({c:pool[Math.floor(rnd(0,pool.length))],op:rnd(.08,.9)})),y:rnd(0,1.2),sp:rnd(.0008,.003),hue:rnd(200,280)}))
      s.nodes=[
        {x:.5,y:.42,label:'You',col:'#fff',r:14,pulse:0},
        {x:.22,y:.22,label:'React',col:'#60a5fa',r:8,pulse:rnd(0,Math.PI*2)},
        {x:.5,y:.14,label:'TypeScript',col:'#818cf8',r:7,pulse:rnd(0,Math.PI*2)},
        {x:.78,y:.22,label:'Spring',col:'#4ade80',r:8,pulse:rnd(0,Math.PI*2)},
        {x:.85,y:.5,label:'AWS',col:'#f59e0b',r:7,pulse:rnd(0,Math.PI*2)},
        {x:.72,y:.72,label:'PostgreSQL',col:'#38bdf8',r:7,pulse:rnd(0,Math.PI*2)},
        {x:.5,y:.78,label:'Git',col:'#f97316',r:7,pulse:rnd(0,Math.PI*2)},
        {x:.28,y:.72,label:'Docker',col:'#60a5fa',r:7,pulse:rnd(0,Math.PI*2)},
        {x:.15,y:.5,label:'C#',col:'#a78bfa',r:8,pulse:rnd(0,Math.PI*2)},
      ]
      s.packets=s.nodes.slice(1).map((_:any,i:number)=>({from:0,to:i+1,t:rnd(0,1),speed:rnd(.004,.012)}))
      s.floats=Array.from({length:12},()=>({x:rnd(0,1),y:rnd(0,1),label:['WiFi','HTTP','SSH','REST','JSON','TCP/IP','OAuth','CDN','CI/CD','K8s','Rust','Linux'][Math.floor(rnd(0,12))],vx:rnd(-.0002,.0002),vy:rnd(-.0002,.0002),alpha:rnd(.12,.3),size:rnd(9,13)}))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, s: S) {
      ctx.fillStyle='#070618'; ctx.fillRect(0,0,W,H)
      // grid
      ctx.save(); ctx.globalAlpha=.045
      for(let gx=0;gx<W;gx+=30){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.strokeStyle='rgba(120,140,255,1)';ctx.lineWidth=.5;ctx.stroke()}
      for(let gy=0;gy<H;gy+=30){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.strokeStyle='rgba(120,140,255,1)';ctx.lineWidth=.5;ctx.stroke()}
      ctx.restore()
      // code rain bg
      s.rain.forEach((col:any)=>{col.y=(col.y+col.sp)%1.3; col.chars.forEach((ch:any,i:number)=>{const cy=col.y*H-i*16,fade=1-i/col.chars.length; if(cy<0||cy>H)return; ctx.font=`${10+i*.15}px monospace`; ctx.textAlign='center'; ctx.fillStyle=`hsla(${col.hue},75%,60%,${fade*ch.op*.45})`; ctx.fillText(ch.c,col.x*W,cy)})})
      // floating tech labels
      s.floats.forEach((f:any)=>{f.x+=f.vx;f.y+=f.vy; if(f.x<0)f.x=1;if(f.x>1)f.x=0;if(f.y<0)f.y=1;if(f.y>1)f.y=0; ctx.font=`${f.size}px monospace`; ctx.textAlign='center'; ctx.fillStyle=`rgba(150,165,255,${f.alpha+.05*Math.sin(t+f.x*10)})`; ctx.fillText(f.label,f.x*W,f.y*H)})
      // edges
      const nodes=s.nodes; nodes.slice(1).forEach((n:any,i:number)=>{const center=nodes[0]; ctx.beginPath(); ctx.moveTo(center.x*W,center.y*H); ctx.lineTo(n.x*W,n.y*H); ctx.strokeStyle='rgba(255,255,255,.07)'; ctx.lineWidth=.8; ctx.stroke()})
      // packets
      s.packets.forEach((p:any)=>{p.t=(p.t+p.speed)%1; const a=nodes[p.from],b=nodes[p.to]; const px=lerp(a.x*W,b.x*W,p.t),py=lerp(a.y*H,b.y*H,p.t); const ng=ctx.createRadialGradient(px,py,0,px,py,5); ng.addColorStop(0,hexToRgba(b.col,1.0)); ng.addColorStop(1,hexToRgba(b.col,0)); ctx.fillStyle=ng; ctx.beginPath(); ctx.arc(px,py,5,0,Math.PI*2); ctx.fill()})
      // nodes
      nodes.forEach((n:any)=>{const x=n.x*W,y=n.y*H,pulse=1+Math.sin(t*1.8+n.pulse)*.12,r=n.r*pulse
        const ng=ctx.createRadialGradient(x,y,0,x,y,r*3.5); ng.addColorStop(0,hexToRgba(n.col,0.533)); ng.addColorStop(1,hexToRgba(n.col,0)); ctx.fillStyle=ng; ctx.beginPath(); ctx.arc(x,y,r*3.5,0,Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fillStyle=n===nodes[0]?'#fff':hexToRgba(n.col,0.8); ctx.fill()
        ctx.font=`bold ${n===nodes[0]?11:9}px monospace`; ctx.textAlign='center'; ctx.fillStyle=n===nodes[0]?'#08081a':'rgba(255,255,255,.85)'; ctx.fillText(n.label,x,y+3.5)})
    }
  },
]



// ── Draggable bouncing card ───────────────────────────────────────────────
function EraCard({
  era, index, visible, initPos
}: {
  era: typeof ERAS[0]
  index: number
  visible: boolean
  initPos: { x: number; y: number; w: number; h: number; rot: number; zIndex: number }
}) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const stateRef   = useRef<S>({})
  const rafRef     = useRef(0)
  const TRef       = useRef(0)
  const cardRef    = useRef<HTMLDivElement>(null)
  const [hov, setHov] = useState(false)
  const [pos, setPos] = useState({ x: initPos.x, y: initPos.y })
  const [zIdx, setZIdx] = useState(initPos.zIndex)
  const vel  = useRef({ x: (Math.random() - 0.5) * 0.8, y: (Math.random() - 0.5) * 0.8 })
  const drag = useRef({ active: false, ox: 0, oy: 0, startX: 0, startY: 0 })
  const posRef = useRef({ x: initPos.x, y: initPos.y })
  const bouncing = useRef(false)
  const animRef  = useRef(0)

  // canvas animation
  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    stateRef.current = {}; era.init(stateRef.current)
    let W = 0, H = 0
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize(); const ro = new ResizeObserver(resize); ro.observe(canvas)
    TRef.current = 0
    function tick() { TRef.current += .016; ctx.clearRect(0,0,W,H); era.draw(ctx,W,H,TRef.current,stateRef.current); rafRef.current = requestAnimationFrame(tick) }
    rafRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [visible])

  // gentle float animation when not dragging
  useEffect(() => {
    if (!visible) return
    let last = performance.now()
    function loop(now: number) {
      if (drag.current.active) { animRef.current = requestAnimationFrame(loop); return }
      const dt = (now - last) / 16.67; last = now
      const card = cardRef.current; if (!card) { animRef.current = requestAnimationFrame(loop); return }
      const W = window.innerWidth, H = window.innerHeight
      const cw = initPos.w, ch = initPos.h
      let { x, y } = posRef.current
      let { x: vx, y: vy } = vel.current
      if (bouncing.current) {
        vx *= 0.97; vy *= 0.97
        x += vx * dt; y += vy * dt
        if (x < 0)      { x = 0;      vx = 0 }
        if (x > W - cw) { x = W - cw; vx = 0 }
        if (y < 60)     { y = 60;     vy = 0 }
        if (y > H - ch) { y = H - ch; vy = 0 }
        // stop bouncing once nearly still
        if (Math.abs(vx) < 0.05 && Math.abs(vy) < 0.05) { vx = 0; vy = 0; bouncing.current = false }
        vel.current = { x: vx, y: vy }
      } else {
        // gentle drift
        x += Math.sin(now * 0.0004 + index) * 0.04
        y += Math.cos(now * 0.0003 + index * 1.3) * 0.04
      }
      posRef.current = { x, y }
      setPos({ x, y })
      animRef.current = requestAnimationFrame(loop)
    }
    animRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animRef.current)
  }, [visible])

  function onPointerDown(e: React.PointerEvent) {
    bouncing.current = false
    drag.current = { active: true, ox: e.clientX - posRef.current.x, oy: e.clientY - posRef.current.y, startX: e.clientX, startY: e.clientY }
    setZIdx(999)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    e.preventDefault()
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return
    const x = e.clientX - drag.current.ox
    const y = e.clientY - drag.current.oy
    posRef.current = { x, y }
    setPos({ x, y })
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!drag.current.active) return
    drag.current.active = false
    setZIdx(initPos.zIndex)
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    const dist = Math.sqrt(dx*dx + dy*dy)
    if (dist > 8) {
      // throw it — bounce mode
      vel.current = { x: dx * 0.04, y: dy * 0.04 }
      bouncing.current = true
    }
  }

  return (
    <div
      ref={cardRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'fixed',
        left: pos.x,
        top:  pos.y,
        width:  initPos.w,
        height: initPos.h,
        opacity: visible ? 1 : 0,
        transform: `rotate(${initPos.rot}deg) scale(${visible ? 1 : 0.85})`,
        transition: visible
          ? `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(.34,1.4,.64,1) ${index * 0.1}s, box-shadow 0.25s`
          : 'none',
        zIndex: hov ? 500 : zIdx,
        borderRadius: 14,
        overflow: 'hidden',
        border: `1px solid ${hov ? hexToRgba(era.color, 0.7) : hexToRgba(era.color, 0.28)}`,
        boxShadow: hov
          ? `0 0 0 1px ${hexToRgba(era.color,0.4)}, 0 24px 70px rgba(0,0,0,.8), 0 0 55px ${hexToRgba(era.color,0.22)}`
          : `0 10px 40px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.05)`,
        background: '#050510',
        cursor: drag.current.active ? 'grabbing' : 'grab',
        userSelect: 'none',
        willChange: 'transform, left, top',
      }}
    >
      {/* title bar */}
      <div style={{
        padding: '9px 14px 7px',
        borderBottom: `1px solid ${hexToRgba(era.color, 0.22)}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: `linear-gradient(90deg,${hexToRgba(era.color,0.18)},transparent)`,
        pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: era.color, letterSpacing: '.1em', fontWeight: 600 }}>{era.name}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(255,255,255,.45)', letterSpacing: '.08em' }}>{era.year}</span>
      </div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 'calc(100% - 36px)', display: 'block', pointerEvents: 'none' }} />
    </div>
  )
}

// initial scatter across viewport
function makePositions() {
  // [x%, y%, w, h, rot, z]
  const defs = [
    [0.02, 0.10, 420, 275, -1.8, 3],
    [0.33, 0.04, 390, 262, 1.3,  5],
    [0.62, 0.08, 435, 278, -0.9, 4],
    [0.04, 0.44, 405, 268, 1.6,  6],
    [0.37, 0.38, 445, 282, -2.0, 7],
    [0.65, 0.42, 395, 265, 1.0,  5],
    [0.10, 0.74, 415, 270, -1.3, 8],
    [0.47, 0.70, 455, 285, 1.7,  6],
  ]
  return defs.map(([xp, yp, w, h, rot, z]) => ({
    x: typeof window !== 'undefined' ? xp * window.innerWidth  : xp * 1400,
    y: typeof window !== 'undefined' ? yp * window.innerHeight : yp * 900,
    w: w as number, h: h as number, rot: rot as number, zIndex: z as number,
  }))
}

export default function AboutPage() {
  const [count, setCount] = useState(0)
  const [positions, setPositions] = useState<ReturnType<typeof makePositions>>([])

  useEffect(() => {
    setPositions(makePositions())
  }, [])

  useEffect(() => {
    if (count >= ERAS.length) return
    const id = setTimeout(() => setCount(c => c + 1), count === 0 ? 500 : 2000)
    return () => clearTimeout(id)
  }, [count])

  const finalPos = positions

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at 30% 40%, #1e1045 0%, #120828 50%, #080418 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* ambient */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse at 15% 55%, rgba(96,165,250,.12) 0%, transparent 55%), radial-gradient(ellipse at 85% 25%, rgba(167,139,250,.12) 0%, transparent 55%)', pointerEvents: 'none', zIndex: 0 }} />
      {/* header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 600, padding: '18px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: 'linear-gradient(to bottom,rgba(4,2,16,.9) 0%,transparent 100%)', pointerEvents: 'none' }}>
        <div>
          <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#555', letterSpacing: '.2em', textTransform: 'uppercase', margin: '0 0 4px 0' }}>about</p>
          <h1 style={{ fontFamily: 'system-ui,sans-serif', fontSize: '24px', fontWeight: 700, color: '#fff', letterSpacing: '-.03em', margin: 0, lineHeight: 1.1 }}>
            4 billion years<br /><span style={{ color: 'rgba(255,255,255,.35)', fontWeight: 400, fontSize: '20px' }}>in the making.</span>
          </h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, pointerEvents: 'auto' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#444', margin: 0 }}>drag cards · throw to bounce</p>
          <div style={{ display: 'flex', gap: 16 }}>
            {[{l:'github',h:'https://github.com/S-Netizen49'},{l:'linkedin',h:'https://www.linkedin.com/in/shawnn-cui/'},{l:'email',h:'mailto:zhzhang2002@gmail.com'}].map(x => (
              <a key={x.l} href={x.h} style={{ fontFamily: 'monospace', fontSize: '10px', color: '#666', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color='#fff'}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color='#666'}}>{x.l} ↗</a>
            ))}
          </div>
        </div>
      </div>
      {/* cards */}
      {finalPos.length > 0 && ERAS.map((era, i) => (
        <EraCard key={i} era={era} index={i} visible={i < count} initPos={finalPos[i] ?? { x: 100 + i*60, y: 100 + i*40, w: 420, h: 275, rot: 0, zIndex: i+1 }} />
      ))}
    </div>
  )
}
'use client'
import { useEffect, useRef } from 'react'

const DEFS = [
  {r:14,a:95, b:52, incl:0.10, speed:0.000170,phase:0.0,base:'#c2884a',atmos:'#e8a96a',ring:false},
  {r:9, a:152,b:82, incl:-0.22,speed:0.000125,phase:2.1,base:'#4a7fc2',atmos:'#6fa3e8',ring:false},
  {r:22,a:218,b:112,incl:0.26, speed:0.000080,phase:4.4,base:'#b87333',atmos:'#d4956a',ring:true },
  {r:11,a:298,b:132,incl:-0.12,speed:0.000062,phase:1.7,base:'#4ade80',atmos:'#7deaaa',ring:false},
  {r:18,a:172,b:148,incl:0.42, speed:0.000090,phase:3.3,base:'#a78bfa',atmos:'#c4acfc',ring:true },
  {r:8, a:258,b:78, incl:-0.33,speed:0.000105,phase:5.8,base:'#f59e0b',atmos:'#fbbf4a',ring:false},
]
const PALETTES = [
  {base:'#c2884a',light:'#d9a870',dark:'#9e6530'},
  {base:'#4a7fc2',light:'#6fa3e8',dark:'#2a5a9e'},
  {base:'#b87333',light:'#d49060',dark:'#8a5020'},
  {base:'#4ade80',light:'#7deaaa',dark:'#28b060'},
  {base:'#a78bfa',light:'#c4acfc',dark:'#7a5ae0'},
  {base:'#f59e0b',light:'#fbbf4a',dark:'#d47a00'},
]

const RESTORE=0.009,DAMPING=0.97,MAX_DEV=110,MAX_TRAIL=110,BH_R=18

type P={r:number;a:number;b:number;incl:number;speed:number;phase:number;base:string;atmos:string;ring:boolean;pal:typeof PALETTES[0];angle:number;x:number;y:number;ox:number;oy:number;dvx:number;dvy:number;trail:{x:number;y:number}[];warpAlpha:number;rotAngle:number;rotSpeed:number}

const STARS=Array.from({length:180},()=>({x:Math.random(),y:Math.random(),r:Math.random()*0.8+0.2,a:Math.random()*0.4+0.08}))

export default function ParticleCanvas() {
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const mouse=useRef({x:-9999,y:-9999,active:false})

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas)return
    const ctx=canvas.getContext('2d')!
    let W=0,H=0,cx=0,cy=0,rafId:number,planets:P[]=[]

    function resize(){
      W=canvas.width=window.innerWidth
      H=canvas.height=window.innerHeight
      cx=W/2;cy=H/2
      planets=DEFS.map((d,i)=>{
        const pos=oPos(d,d.phase)
        return{...d,pal:PALETTES[i],angle:d.phase,x:pos.x,y:pos.y,ox:pos.x,oy:pos.y,
          dvx:0,dvy:0,trail:[],warpAlpha:0,
          rotAngle:Math.random()*Math.PI*2,
          rotSpeed:(Math.random()*0.002+0.0006)*(Math.random()>.5?1:-1)}
      })
    }

    function oPos(d:typeof DEFS[0],a:number){
      const cI=Math.cos(d.incl),sI=Math.sin(d.incl)
      const ex=d.a*Math.cos(a),ey=d.b*Math.sin(a)
      return{x:cx+ex*cI-ey*sI,y:cy+ex*sI+ey*cI}
    }

    function drawPlanet(p:P){
      ctx.save();ctx.translate(p.x,p.y)
      const{r,pal,ring,atmos,rotAngle}=p

      // atmosphere glow
      const ag=ctx.createRadialGradient(0,0,r*0.8,0,0,r*1.6)
      ag.addColorStop(0,atmos+'35');ag.addColorStop(0.5,atmos+'12');ag.addColorStop(1,atmos+'00')
      ctx.beginPath();ctx.arc(0,0,r*1.6,0,Math.PI*2);ctx.fillStyle=ag;ctx.fill()

      // clip + base
      ctx.save();ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip()
      ctx.fillStyle=pal.base;ctx.fill()

      // surface bands
      ctx.rotate(rotAngle)
      const sc=Math.floor(r/3.5)+3
      for(let s=0;s<sc;s++){
        const sy=-r+(s/(sc-1))*r*2,hw=Math.sqrt(Math.max(0,r*r-sy*sy))
        ctx.beginPath();ctx.rect(-hw,sy-r*0.08,hw*2,r*0.11)
        ctx.fillStyle=s%2===0?pal.light+'50':pal.dark+'38';ctx.fill()
      }

      // cloud wisps
      for(let c=0;c<3;c++){
        const cy2=-r*0.6+c*r*0.5,cw=r*(0.4+c*0.15)
        ctx.beginPath();ctx.ellipse(r*0.1*c,cy2,cw,r*0.06,c*0.3,0,Math.PI*2)
        ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fill()
      }

      // polar cap
      ctx.beginPath();ctx.arc(0,-r*0.8,r*0.32,0,Math.PI*2)
      ctx.fillStyle='rgba(255,255,255,0.13)';ctx.fill()
      ctx.beginPath();ctx.arc(0,r*0.85,r*0.22,0,Math.PI*2)
      ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fill()

      // specular
      const sg=ctx.createRadialGradient(-r*0.3,-r*0.32,0,0,0,r)
      sg.addColorStop(0,'rgba(255,255,255,0.30)')
      sg.addColorStop(0.35,'rgba(255,255,255,0.06)')
      sg.addColorStop(1,'rgba(0,0,0,0.45)')
      ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fillStyle=sg;ctx.fill()
      ctx.restore() // unclip

      // limb darkening
      const ld=ctx.createRadialGradient(0,0,r*0.5,0,0,r)
      ld.addColorStop(0,'rgba(0,0,0,0)');ld.addColorStop(1,'rgba(0,0,0,0.32)')
      ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fillStyle=ld;ctx.fill()

      if(ring){
        ctx.save();ctx.rotate(0.44);ctx.scale(1,0.24)
        // outer ring
        ctx.beginPath();ctx.arc(0,0,r*2.2,0,Math.PI*2);ctx.arc(0,0,r*1.55,0,Math.PI*2,true)
        ctx.fillStyle=pal.base+'33';ctx.fill()
        // inner ring bright
        ctx.beginPath();ctx.arc(0,0,r*1.55,0,Math.PI*2);ctx.arc(0,0,r*1.32,0,Math.PI*2,true)
        ctx.fillStyle=pal.light+'55';ctx.fill()
        ctx.strokeStyle=pal.light+'22';ctx.lineWidth=0.5;ctx.stroke()
        ctx.restore()
      }
      ctx.restore()
    }

    function drawBH(x:number,y:number){
      ctx.save();ctx.translate(x,y)
      // accretion disk layers
      for(let ring=5;ring>=1;ring--){
        const ro=BH_R*(1+ring*0.52),ri=BH_R*(1+ring*0.38)
        ctx.save();ctx.rotate(ring*0.28);ctx.scale(1,0.18+ring*0.035)
        ctx.beginPath();ctx.arc(0,0,ro,0,Math.PI*2);ctx.arc(0,0,ri,0,Math.PI*2,true)
        const hue=ring<=2?`255,${160+ring*10},${30+ring*5}`:ring===3?'220,90,15':'140,45,8'
        ctx.fillStyle=`rgba(${hue},${0.05+ring*0.038})`;ctx.fill()
        ctx.restore()
      }
      // glow halo
      const lg=ctx.createRadialGradient(0,0,BH_R,0,0,BH_R*2.2)
      lg.addColorStop(0,'rgba(255,180,60,0.20)');lg.addColorStop(0.4,'rgba(255,100,20,0.08)');lg.addColorStop(1,'rgba(255,60,0,0)')
      ctx.beginPath();ctx.arc(0,0,BH_R*2.2,0,Math.PI*2);ctx.fillStyle=lg;ctx.fill()
      // event horizon
      ctx.beginPath();ctx.arc(0,0,BH_R,0,Math.PI*2);ctx.fillStyle='#000';ctx.fill()
      // photon ring
      ctx.beginPath();ctx.arc(0,0,BH_R,0,Math.PI*2)
      ctx.strokeStyle='rgba(255,210,90,0.45)';ctx.lineWidth=1.5;ctx.stroke()
      // inner depth
      const id=ctx.createRadialGradient(-BH_R*0.25,-BH_R*0.25,0,0,0,BH_R)
      id.addColorStop(0,'rgba(0,0,0,0)');id.addColorStop(1,'rgba(0,0,0,0.95)')
      ctx.beginPath();ctx.arc(0,0,BH_R,0,Math.PI*2);ctx.fillStyle=id;ctx.fill()
      ctx.restore()
    }

    let last=performance.now()
    function tick(now:number){
      const dt=Math.min((now-last)/16.67,2.5);last=now
      ctx.fillStyle='rgba(3,3,10,0.18)';ctx.fillRect(0,0,W,H)

      // stars
      for(const s of STARS){
        ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,255,255,${s.a})`;ctx.fill()
      }

      // sun
      const sg=ctx.createRadialGradient(cx,cy,0,cx,cy,55)
      sg.addColorStop(0,'rgba(255,230,140,0.20)');sg.addColorStop(1,'rgba(255,150,0,0)')
      ctx.beginPath();ctx.arc(cx,cy,55,0,Math.PI*2);ctx.fillStyle=sg;ctx.fill()
      ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.fillStyle='rgba(255,230,140,0.6)';ctx.fill()

      // orbit paths
      DEFS.forEach(d=>{
        const cI=Math.cos(d.incl),sI=Math.sin(d.incl)
        ctx.beginPath()
        for(let a=0;a<=Math.PI*2+0.01;a+=0.04){
          const ex=d.a*Math.cos(a),ey=d.b*Math.sin(a)
          const x=cx+ex*cI-ey*sI,y=cy+ex*sI+ey*cI
          a===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
        }
        ctx.closePath();ctx.strokeStyle='rgba(255,255,255,0.022)';ctx.lineWidth=0.5;ctx.stroke()
      })

      const mx=mouse.current.x,my=mouse.current.y,active=mouse.current.active
      planets.forEach(p=>{
        p.angle+=p.speed*60*dt;p.rotAngle+=p.rotSpeed*dt
        const orb=oPos(p,p.angle);p.ox=orb.x;p.oy=orb.y

        if(active){
          const dx=p.x-mx,dy=p.y-my,dist=Math.hypot(dx,dy),inf=200
          if(dist<inf&&dist>BH_R+p.r){
            const nx=dx/dist,ny=dy/dist,tx=-ny,ty=nx
            const f=(1-dist/inf)**2
            const ps=8000*f/Math.max(dist,12),ss=5000*f/Math.max(dist,12)
            p.dvx+=(nx*ps+tx*ss)*dt*0.016
            p.dvy+=(ny*ps+ty*ss)*dt*0.016
            p.warpAlpha=Math.min(1,p.warpAlpha+0.07)
          }
        }
        p.dvx+=(p.ox-p.x)*RESTORE*dt;p.dvy+=(p.oy-p.y)*RESTORE*dt
        p.dvx*=DAMPING;p.dvy*=DAMPING
        const dev=Math.hypot(p.dvx,p.dvy)
        if(dev>MAX_DEV){p.dvx=p.dvx/dev*MAX_DEV;p.dvy=p.dvy/dev*MAX_DEV}
        p.x=p.ox+p.dvx;p.y=p.oy+p.dvy
        if(!active||Math.hypot(p.x-mx,p.y-my)>200)p.warpAlpha=Math.max(0,p.warpAlpha-0.018)

        p.trail.push({x:p.x,y:p.y});if(p.trail.length>MAX_TRAIL)p.trail.shift()
        for(let t=2;t<p.trail.length;t++){
          const fr=t/p.trail.length
          ctx.beginPath();ctx.moveTo(p.trail[t-1].x,p.trail[t-1].y);ctx.lineTo(p.trail[t].x,p.trail[t].y)
          ctx.strokeStyle=`rgba(255,255,255,${fr*fr*0.08})`;ctx.lineWidth=fr*p.r*0.3;ctx.lineCap='round';ctx.stroke()
        }
        drawPlanet(p)
        if(p.warpAlpha>0.05){
          ctx.beginPath();ctx.arc(p.x,p.y,p.r*2.6,0,Math.PI*2)
          ctx.strokeStyle=`rgba(255,180,50,${p.warpAlpha*0.12})`;ctx.lineWidth=0.5;ctx.stroke()
        }
      })
      if(active)drawBH(mx,my)
      rafId=requestAnimationFrame(tick)
    }

    resize();window.addEventListener('resize',resize)
    rafId=requestAnimationFrame(tick)
    return()=>{cancelAnimationFrame(rafId);window.removeEventListener('resize',resize)}
  },[])

  return(
    <canvas
      ref={canvasRef}
      data-hero-canvas
      onMouseMove={e=>{mouse.current={x:e.clientX,y:e.clientY,active:true}}}
      onMouseLeave={()=>{mouse.current.active=false}}
      style={{position:'fixed',inset:0,width:'100%',height:'100%',zIndex:0,display:'block'}}
    />
  )
}
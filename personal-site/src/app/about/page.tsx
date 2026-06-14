'use client'
import { useEffect, useRef, useState } from 'react'

function r(a: number, b: number) { return a + Math.random() * (b - a) }

type EraState = Record<string, any>

const ERAS = [
  {
    name: 'The Big Bang',
    year: '13.8 BYA',
    color: '#ff8c42',
    init(s: EraState) {
      s.particles = Array.from({ length: 300 }, () => {
        const a = Math.random() * Math.PI * 2, spd = r(0.5, 4)
        return { x: .5, y: .5, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, life: Math.random(), size: r(1, 4), hue: r(0, 60) }
      })
      s.shockT = 0
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * .8)
      g.addColorStop(0, `rgba(255,200,100,${.35 * a})`); g.addColorStop(.3, `rgba(180,60,20,${.25 * a})`); g.addColorStop(1, `rgba(0,0,0,${a})`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      s.shockT += 0.015
      for (let i = 0; i < 5; i++) {
        const sr = (s.shockT * 180 + i * 70) % (Math.max(W, H) * 1.2)
        ctx.beginPath(); ctx.arc(W / 2, H / 2, sr, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,${180 - i * 25},50,${Math.max(0, .5 - sr / (Math.max(W, H))) * a})`; ctx.lineWidth = 2.5 - i * .3; ctx.stroke()
      }
      s.particles.forEach((p: any) => {
        p.x += p.vx * .004; p.y += p.vy * .004; p.life -= .002
        if (p.life <= 0) { const a2 = Math.random() * Math.PI * 2, spd = r(.5, 4); p.x = .5; p.y = .5; p.vx = Math.cos(a2) * spd; p.vy = Math.sin(a2) * spd; p.life = 1; p.hue = r(0, 60) }
        const glow = ctx.createRadialGradient(p.x * W, p.y * H, 0, p.x * W, p.y * H, p.size * 3)
        glow.addColorStop(0, `hsla(${p.hue},100%,80%,${p.life * .8 * a})`); glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.size * 3, 0, Math.PI * 2); ctx.fill()
      })
    }
  },
  {
    name: 'Primordial Ocean',
    year: '4.2 BYA',
    color: '#1a6b8a',
    init(s: EraState) {
      s.bubbles = Array.from({ length: 80 }, () => ({ x: r(0, 1), y: r(0, 1), rad: r(2, 9), vy: -r(.0003, .001), vx: r(-.0002, .0002), phase: r(0, Math.PI * 2) }))
      s.lightningT = 0
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      const layers: [string, string][] = [['#010810', '#02152a'], ['#021525', '#051e38'], ['#031d35', '#073050']]
      layers.forEach(([c1, c2], i) => {
        const g = ctx.createLinearGradient(0, H * i / 3, 0, H * (i + 1) / 3)
        g.addColorStop(0, c1); g.addColorStop(1, c2)
        ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(0, H * i / 3, W, H / 3 + 1); ctx.globalAlpha = 1
      })
      for (let i = 0; i < 8; i++) {
        const rx = W * (.1 + i * .11) + Math.sin(t * .4 + i) * 30
        const grad = ctx.createLinearGradient(rx, 0, rx + 40, H * .7)
        grad.addColorStop(0, `rgba(40,140,200,${.12 * a})`); grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad; ctx.beginPath(); ctx.moveTo(rx, 0); ctx.lineTo(rx + 60, H * .7); ctx.lineTo(rx - 10, H * .7); ctx.closePath(); ctx.fill()
      }
      for (let v = 0; v < 3; v++) {
        const vx = W * (.25 + v * .25), vbase = H * .95
        for (let p = 0; p < 8; p++) {
          const py = vbase - ((t * 80 + p * 40) % (H * .6)), px = vx + Math.sin(t * 2 + p + v) * 15 * (1 - (vbase - py) / H)
          ctx.beginPath(); ctx.arc(px, py, r(3, 8) * (1 - (vbase - py) / (H * .6)), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${100 + v * 30},${60 + v * 20},20,${.5 * a * (1 - (vbase - py) / (H * .6))})`; ctx.fill()
        }
      }
      s.bubbles.forEach((b: any) => {
        b.y += b.vy; b.x += b.vx + Math.sin(t * .8 + b.phase) * .0003
        if (b.y < -.05) { b.y = 1.05; b.x = r(0, 1) }
        const bx = b.x * W, by = b.y * H
        ctx.beginPath(); ctx.arc(bx, by, b.rad, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(120,200,255,${.4 * a})`; ctx.lineWidth = .8; ctx.stroke()
        ctx.fillStyle = `rgba(60,140,200,${.08 * a})`; ctx.fill()
        ctx.beginPath(); ctx.arc(bx - b.rad * .3, by - b.rad * .3, Math.max(0, b.rad * .25), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,240,255,${.5 * a})`; ctx.fill()
      })
      s.lightningT += .016
      if (Math.sin(s.lightningT * 3.7) > .92) {
        let lx = W * r(.2, .8), ly = 0; ctx.beginPath(); ctx.moveTo(lx, ly)
        ctx.save(); ctx.globalAlpha = .7 * a
        while (ly < H * .3) { ly += r(8, 20); lx += r(-25, 25); ctx.lineTo(lx, ly) }
        ctx.strokeStyle = 'rgba(160,220,255,.9)'; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.strokeStyle = 'rgba(160,220,255,.3)'; ctx.lineWidth = 8; ctx.stroke()
        ctx.restore()
      }
    }
  },
  {
    name: 'First Life',
    year: '3.8 BYA',
    color: '#2d8a4e',
    init(s: EraState) {
      s.cells = Array.from({ length: 14 }, () => ({ x: r(.05, .95), y: r(.05, .95), rad: r(10, 24), phase: r(0, Math.PI * 2), vx: r(-.0003, .0003), vy: r(-.0003, .0003), hue: r(110, 160), divT: -1 }))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      const g = ctx.createRadialGradient(W * .3, H * .3, 0, W * .5, H * .5, W * .8)
      g.addColorStop(0, `rgba(5,25,12,${a})`); g.addColorStop(1, `rgba(1,8,3,${a})`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 137 + t * 20) % 1) * W, sy = ((i * 97 + Math.sin(t * .3 + i) * .1) % 1) * H
        ctx.beginPath(); ctx.arc(sx, sy, r(.5, 2), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(80,255,140,${r(.1, .4) * a})`; ctx.fill()
      }
      s.cells.forEach((c: any) => {
        c.x += c.vx + Math.sin(t * .5 + c.phase) * .0002; c.y += c.vy + Math.cos(t * .4 + c.phase) * .0002
        if (c.x < .05 || c.x > .95) c.vx *= -1; if (c.y < .05 || c.y > .95) c.vy *= -1
        if (c.divT < 0 && Math.random() < .0004) c.divT = 0
        if (c.divT >= 0) { c.divT += .02; if (c.divT > 1) { c.divT = -1; if (s.cells.length < 22) s.cells.push({ ...c, x: c.x + .03, phase: r(0, Math.PI * 2), vx: r(-.0003, .0003), vy: r(-.0003, .0003), divT: -1 }) } }
        const stretch = c.divT >= 0 ? 1 + Math.sin(c.divT * Math.PI) * .4 : 1
        const x = c.x * W, y = c.y * H, pulse = 1 + Math.sin(t * 1.5 + c.phase) * .1
        ctx.save(); ctx.translate(x, y)
        const og = ctx.createRadialGradient(0, 0, c.rad, 0, 0, c.rad * 2.5)
        og.addColorStop(0, `hsla(${c.hue},70%,40%,${.15 * a})`); og.addColorStop(1, 'transparent')
        ctx.fillStyle = og; ctx.beginPath(); ctx.arc(0, 0, c.rad * 2.5, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.ellipse(0, 0, Math.max(0.01, c.rad * pulse * stretch), Math.max(0.01, c.rad * pulse / stretch), 0, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${c.hue},80%,55%,${.7 * a})`; ctx.lineWidth = 1.5; ctx.stroke()
        ctx.fillStyle = `hsla(${c.hue},60%,15%,${.4 * a})`; ctx.fill()
        ctx.beginPath(); ctx.ellipse(0, 0, Math.max(0.01, c.rad * .4 * stretch), Math.max(0.01, c.rad * .4 / stretch), 0, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${c.hue},90%,60%,${.6 * a})`; ctx.fill()
        for (let o = 0; o < 4; o++) {
          const oa = (Math.PI * 2 / 4) * o + t * .3, od = c.rad * .55
          ctx.beginPath(); ctx.ellipse(Math.cos(oa) * od, Math.sin(oa) * od, c.rad * .12, c.rad * .07, oa, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${c.hue + 30},70%,45%,${.5 * a})`; ctx.fill()
        }
        for (let f = 0; f < 3; f++) {
          const fa = (Math.PI * 2 / 3) * f + c.phase
          const bx = Math.cos(fa) * c.rad, by = Math.sin(fa) * c.rad
          ctx.beginPath(); ctx.moveTo(bx, by)
          for (let i = 1; i < 8; i++) { const fi = i / 8; ctx.lineTo(bx + Math.cos(fa) * c.rad * fi * 1.5 + Math.sin(t * 3 + f + i) * c.rad * .3 * fi, by + Math.sin(fa) * c.rad * fi * 1.5 + Math.cos(t * 2 + f + i) * c.rad * .3 * fi) }
          ctx.strokeStyle = `hsla(${c.hue},70%,50%,${.3 * a})`; ctx.lineWidth = .8; ctx.stroke()
        }
        ctx.restore()
      })
    }
  },
  {
    name: 'Cambrian Explosion',
    year: '540 MYA',
    color: '#4a8fb5',
    init(s: EraState) {
      s.creatures = Array.from({ length: 12 }, () => ({ x: r(.05, .95), y: r(.15, .85), vx: r(-.0008, .0008), vy: r(-.0005, .0005), angle: r(0, Math.PI * 2), type: Math.floor(r(0, 4)), size: r(15, 32), hue: r(0, 360), phase: r(0, Math.PI * 2) }))
      s.floor = Array.from({ length: 20 }, (_, i) => ({ x: i / 19, h: r(.05, .18), type: Math.floor(r(0, 3)) }))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, `rgba(2,30,60,${a})`); g.addColorStop(.5, `rgba(3,40,70,${a})`); g.addColorStop(1, `rgba(10,25,15,${a})`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      for (let i = 0; i < 6; i++) {
        const lx = W * (.1 + i * .16) + Math.sin(t * .3 + i) * 20
        ctx.save(); ctx.globalAlpha = .06 * a; ctx.fillStyle = 'rgba(100,200,255,1)'
        ctx.beginPath(); ctx.moveTo(lx, 0); ctx.lineTo(lx + 50, H * .8); ctx.lineTo(lx - 20, H * .8); ctx.closePath(); ctx.fill(); ctx.restore()
      }
      s.floor.forEach((sf: any, i: number) => {
        const bx = sf.x * W, floorY = H * (1 - sf.h)
        if (sf.type === 0) {
          ctx.save(); ctx.translate(bx, H); ctx.strokeStyle = `rgba(255,${100 + i * 8},80,.7)`; ctx.lineWidth = 3
          function branch(len: number, ang: number, depth: number) {
            if (depth > 4 || len < 3) return
            ctx.save(); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -len); ctx.stroke(); ctx.translate(0, -len)
            branch(len * .65, .4 + Math.sin(t + depth) * .1, depth + 1); branch(len * .65, -.4 + Math.sin(t * 1.3 + depth) * .1, depth + 1); ctx.restore()
          }
          branch(sf.h * H * .6, 0, 0); ctx.restore()
        } else if (sf.type === 1) {
          ctx.beginPath(); ctx.moveTo(bx, H)
          for (let k = 0; k < 8; k++) { const ky = H - k * (sf.h * H / 8); ctx.lineTo(bx + Math.sin(t * 1.5 + k + i) * 20, ky) }
          ctx.strokeStyle = 'rgba(60,160,40,.6)'; ctx.lineWidth = 4; ctx.stroke()
        } else {
          ctx.beginPath(); ctx.ellipse(bx, H, 20, sf.h * H * .3, 0, Math.PI, 0)
          ctx.fillStyle = 'rgba(60,50,40,.8)'; ctx.fill()
        }
      })
      s.creatures.forEach((c: any) => {
        c.x += c.vx + Math.sin(t * .4 + c.phase) * .0003; c.y += c.vy + Math.cos(t * .35 + c.phase) * .0002
        if (c.x < .05 || c.x > .95) c.vx *= -1; if (c.y < .1 || c.y > .88) c.vy *= -1
        const x = c.x * W, y = c.y * H
        ctx.save(); ctx.translate(x, y); ctx.rotate(c.angle + Math.atan2(c.vy, c.vx)); ctx.globalAlpha = a
        if (c.type === 0) {
          ctx.fillStyle = `hsla(${c.hue},60%,45%,.7)`; ctx.strokeStyle = `hsla(${c.hue},70%,60%,.9)`; ctx.lineWidth = .8
          for (let seg = 0; seg < 6; seg++) { ctx.beginPath(); ctx.ellipse(0, (seg - 2.5) * c.size * .35, Math.max(0, c.size * .5), Math.max(0, c.size * .2), 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke() }
        } else if (c.type === 1) {
          const jb = 1 + Math.sin(t * 2 + c.phase) * .3
          ctx.beginPath(); ctx.ellipse(0, -c.size * .3, c.size * jb, c.size * .7 * jb, 0, Math.PI, 0)
          ctx.fillStyle = `hsla(${c.hue},70%,65%,.4)`; ctx.fill(); ctx.strokeStyle = `hsla(${c.hue},80%,75%,.7)`; ctx.lineWidth = 1; ctx.stroke()
          for (let tt = 0; tt < 8; tt++) { const ta = (Math.PI / 7) * tt - Math.PI / 2; ctx.beginPath(); ctx.moveTo(Math.cos(ta) * c.size * jb, 0); ctx.quadraticCurveTo(Math.cos(ta) * c.size * jb + Math.sin(t * 1.5 + tt) * 15, c.size * .8, Math.cos(ta) * c.size * jb, c.size * 1.5); ctx.strokeStyle = `hsla(${c.hue},60%,70%,.4)`; ctx.lineWidth = 1; ctx.stroke() }
        } else if (c.type === 2) {
          ctx.fillStyle = `hsla(${c.hue},50%,40%,.8)`; ctx.beginPath(); ctx.ellipse(0, 0, c.size * 1.5, c.size * .4, 0, 0, Math.PI * 2); ctx.fill()
          for (let f = 0; f < 6; f++) { ctx.beginPath(); ctx.ellipse(-c.size * 1.2, f * .28 - c.size * .6, c.size * .5, c.size * .12, Math.sin(t * 2 + f) * .3, 0, Math.PI * 2); ctx.fillStyle = `hsla(${c.hue},60%,50%,.6)`; ctx.fill() }
        } else {
          ctx.beginPath()
          for (let ri2 = 0; ri2 < c.size; ri2 += .5) { const ang2 = ri2 * .4 + t * .5; ctx.lineTo(Math.cos(ang2) * ri2, Math.sin(ang2) * ri2) }
          ctx.strokeStyle = `hsla(${c.hue},60%,65%,.7)`; ctx.lineWidth = 2; ctx.stroke()
        }
        ctx.restore()
      })
    }
  },
  {
    name: 'Age of Dinosaurs',
    year: '230 MYA',
    color: '#6b8c3a',
    init(s: EraState) {
      s.trees = Array.from({ length: 12 }, (_, i) => ({ x: i / 11, h: r(.25, .55), type: Math.floor(r(0, 3)), sway: r(0, Math.PI * 2) }))
      s.dinos = [{ x: .15, y: .7, dir: 1, speed: .0015, size: 45, type: 'brach' }, { x: .6, y: .72, dir: -1, speed: .002, size: 25, type: 'raptor' }, { x: .85, y: .68, dir: 1, speed: .0008, size: 60, type: 'rex' }]
      s.clouds = Array.from({ length: 5 }, () => ({ x: r(0, 1), y: r(.05, .2), size: r(40, 80), vx: .0002 }))
      s.volcT = 0
      // METEOR
      s.meteorActive = false
      s.meteorT = 0
      s.meteorX = .85
      s.meteorY = -.1
      s.impactT = -1
      s.debris = []
      s.dustClouds = []
      s.launched = false
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      // trigger meteor after 3s in era
      if (!s.launched && t > 3) { s.launched = true; s.meteorActive = true; s.meteorT = 0 }

      // sky
      const skyCol = s.impactT > 0 ? `rgba(${Math.min(255, 80 + s.impactT * 80)},${Math.max(20, 50 - s.impactT * 30)},20,${a})` : `rgba(80,50,20,${a})`
      const sky = ctx.createLinearGradient(0, 0, 0, H * .65)
      sky.addColorStop(0, skyCol); sky.addColorStop(.4, `rgba(160,100,40,${a})`); sky.addColorStop(1, `rgba(200,140,60,${a})`)
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * .65)

      // clouds
      s.clouds.forEach((cl: any) => {
        cl.x = (cl.x + cl.vx) % 1.2
        ctx.save(); ctx.globalAlpha = .25 * a; ctx.fillStyle = 'rgba(220,180,120,1)'
        for (let b = 0; b < 4; b++) { ctx.beginPath(); ctx.arc((cl.x - .1) * W + b * cl.size * .4, cl.y * H + Math.sin(b) * .1 * cl.size, cl.size * .4, 0, Math.PI * 2); ctx.fill() }
        ctx.restore()
      })

      // volcano
      const vx = W * .8, vbase = H * .65
      ctx.beginPath(); ctx.moveTo(vx - 80, vbase); ctx.lineTo(vx, H * .2); ctx.lineTo(vx + 70, vbase); ctx.closePath()
      ctx.fillStyle = `rgba(50,30,20,${a * .9})`; ctx.fill()
      s.volcT += .01
      if (Math.sin(s.volcT) > .7) {
        for (let e = 0; e < 15; e++) {
          const ea = r(-Math.PI * .7, -Math.PI * .3), ed = r(20, 80), ex = vx + Math.cos(ea) * ed * (s.volcT % 1), ey = H * .2 + Math.sin(ea) * ed * (s.volcT % 1) * 2
          ctx.beginPath(); ctx.arc(ex, ey, r(2, 6), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,${r(50, 150)},20,${r(.3, .8) * a})`; ctx.fill()
        }
      }

      // ground
      [[H * .63, H * .72, 'rgba(60,80,20,'], [H * .7, H, 'rgba(40,60,15,'], [H * .72, H, 'rgba(30,45,10,']].forEach(([y1, y2, col]: any) => {
        ctx.fillStyle = col + `${a})`; ctx.fillRect(0, y1, W, y2 - y1)
      })

      // ferns
      for (let f = 0; f < 30; f++) {
        const fx = W * (f / 30 + Math.sin(f) * .03), fy = H * .72
        ctx.save(); ctx.translate(fx, fy); ctx.strokeStyle = `rgba(60,120,30,${.6 * a})`; ctx.lineWidth = 1
        for (let b = 0; b < 5; b++) { const ba = -Math.PI * .7 + b * .35; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(ba) * 20, Math.sin(ba) * -15); ctx.stroke() }
        ctx.restore()
      }

      // trees
      s.trees.forEach((tr: any) => {
        const tx = tr.x * W, ty = H * .68, th = tr.h * H, sw = Math.sin(t * .5 + tr.sway) * .02
        ctx.save(); ctx.translate(tx, ty); ctx.globalAlpha = a
        if (tr.type === 0) {
          ctx.fillStyle = 'rgba(30,50,15,.9)'; ctx.beginPath(); ctx.rect(-4, -th, 8, th); ctx.fill()
          for (let l = 0; l < 6; l++) { const ly = -th + l * (th / 5), lw = 20 + l * 8; ctx.beginPath(); ctx.moveTo(-lw, ly); ctx.lineTo(lw, ly); ctx.lineTo(sw * 50, ly - th / 6); ctx.closePath(); ctx.fillStyle = `rgba(${30 + l * 5},${80 + l * 8},20,.8)`; ctx.fill() }
        } else if (tr.type === 1) {
          ctx.strokeStyle = 'rgba(25,45,12,.9)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sw * 30, -th); ctx.stroke()
          for (let f2 = 0; f2 < 8; f2++) { const fa2 = -Math.PI * .9 + f2 * .25, flen = th * .5; ctx.beginPath(); ctx.moveTo(sw * 20, -th * .7); ctx.quadraticCurveTo(Math.cos(fa2) * flen * .5, -th * .7 + Math.sin(fa2) * flen * .5, Math.cos(fa2) * flen, -th * .7 + Math.sin(fa2) * flen); ctx.strokeStyle = 'rgba(50,100,20,.7)'; ctx.lineWidth = 3; ctx.stroke() }
        } else {
          ctx.fillStyle = 'rgba(60,35,15,1)'; ctx.beginPath(); ctx.rect(-8, -th, 16, th); ctx.fill()
          const cg = ctx.createRadialGradient(sw * 20, -th * .7, 0, sw * 20, -th * .7, tr.h * H * .5)
          cg.addColorStop(0, 'rgba(50,90,25,.8)'); cg.addColorStop(1, 'rgba(20,50,10,.3)')
          ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(sw * 20, -th * .7, tr.h * H * .45, 0, Math.PI * 2); ctx.fill()
        }
        ctx.restore()
      })

      // dinos
      s.dinos.forEach((d: any) => {
        // dinos flee after impact
        const flee = s.impactT > 0 ? s.impactT * .005 : 0
        d.x += (d.speed + flee) * d.dir; if (d.x < -.1) d.dir = 1; if (d.x > 1.1) d.dir = -1
        const dx = d.x * W, dy = d.y * H, walk = Math.sin(t * 4) * .2
        ctx.save(); ctx.translate(dx, dy); ctx.scale(d.dir, 1); ctx.globalAlpha = a * .9
        ctx.strokeStyle = 'rgba(80,65,40,.9)'; ctx.fillStyle = 'rgba(100,80,50,.8)'; ctx.lineWidth = 2; ctx.lineCap = 'round'
        if (d.type === 'rex') {
          ctx.beginPath(); ctx.ellipse(0, 0, d.size * .7, d.size * .35, -.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.beginPath(); ctx.ellipse(d.size * .5, -d.size * .3, d.size * .35, d.size * .22, -.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(-d.size * .5, 0); ctx.lineTo(-d.size * 1.2, .1 * d.size); ctx.lineWidth = d.size * .15; ctx.stroke()
          ctx.beginPath(); ctx.moveTo(0, d.size * .25); ctx.lineTo(-d.size * .2, d.size * .8 + Math.abs(Math.sin(t * 4)) * d.size * .2); ctx.lineWidth = d.size * .12; ctx.stroke()
          ctx.beginPath(); ctx.moveTo(0, d.size * .25); ctx.lineTo(d.size * .15, d.size * .8 - Math.abs(Math.sin(t * 4)) * d.size * .2); ctx.lineWidth = d.size * .12; ctx.stroke()
        } else if (d.type === 'brach') {
          ctx.beginPath(); ctx.ellipse(0, 0, d.size * .9, d.size * .3, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(d.size * .5, -.1 * d.size); ctx.quadraticCurveTo(d.size * .7, -d.size * 1.2, d.size * .3 + Math.sin(t * .8) * 10, -d.size * 1.5); ctx.lineWidth = d.size * .18; ctx.strokeStyle = 'rgba(90,70,40,.9)'; ctx.stroke()
          for (let l = 0; l < 4; l++) { ctx.beginPath(); ctx.strokeStyle = 'rgba(100,80,50,.9)'; ctx.lineWidth = d.size * .1; ctx.moveTo((l - .5) * d.size * .3 * 2, d.size * .25); ctx.lineTo((l - .5) * d.size * .3 * 2 + walk * d.size * .15 * (l % 2 ? 1 : -1), d.size * .8); ctx.stroke() }
        } else {
          ctx.beginPath(); ctx.ellipse(0, 0, d.size * .6, d.size * .25, -.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.beginPath(); ctx.ellipse(d.size * .4, -d.size * .2, d.size * .25, d.size * .18, -.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(0, d.size * .2); ctx.lineTo(walk * d.size * .3 - d.size * .1, d.size * .7); ctx.lineWidth = d.size * .08; ctx.stroke()
          ctx.beginPath(); ctx.moveTo(0, d.size * .2); ctx.lineTo(-walk * d.size * .3 + d.size * .1, d.size * .7); ctx.lineWidth = d.size * .08; ctx.stroke()
        }
        ctx.restore()
      })

      // ── METEOR ───────────────────────────────────────────────────────
      if (s.meteorActive) {
        s.meteorT += .012
        const progress = Math.min(1, s.meteorT)
        // travel from top-right to center-left ground
        const mx = W * (.85 - progress * .6), my = -H * .1 + progress * (H * .75)

        if (progress < 1) {
          // glowing meteor body
          const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 18)
          mg.addColorStop(0, `rgba(255,255,200,${a})`); mg.addColorStop(.4, `rgba(255,150,50,${.9 * a})`); mg.addColorStop(1, `rgba(255,80,20,0)`)
          ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mx, my, 18, 0, Math.PI * 2); ctx.fill()
          // core
          ctx.beginPath(); ctx.arc(mx, my, 7, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill()
          // trail
          const trailLen = 180
          const grad = ctx.createLinearGradient(mx, my, mx + trailLen * .7, my - trailLen * .85)
          grad.addColorStop(0, `rgba(255,200,100,${.8 * a})`); grad.addColorStop(.4, `rgba(255,100,30,${.3 * a})`); grad.addColorStop(1, 'transparent')
          ctx.beginPath(); ctx.moveTo(mx - 6, my - 4); ctx.lineTo(mx + trailLen * .7, my - trailLen * .85); ctx.lineTo(mx + 6, my + 4); ctx.closePath()
          ctx.fillStyle = grad; ctx.fill()
          // glow aura
          const aura = ctx.createRadialGradient(mx, my, 5, mx, my, 60)
          aura.addColorStop(0, `rgba(255,180,60,${.25 * a})`); aura.addColorStop(1, 'transparent')
          ctx.fillStyle = aura; ctx.beginPath(); ctx.arc(mx, my, 60, 0, Math.PI * 2); ctx.fill()
        } else if (s.impactT < 0) {
          // trigger impact
          s.impactT = 0
          s.meteorActive = false
          // spawn debris
          s.debris = Array.from({ length: 80 }, () => {
            const ang = r(-Math.PI, 0), spd = r(2, 8)
            return { x: mx / W, y: my / H, vx: Math.cos(ang) * spd * .002, vy: Math.sin(ang) * spd * .002 - .006, life: 1, size: r(2, 10), hue: r(10, 50) }
          })
          s.dustClouds = Array.from({ length: 20 }, () => ({ x: mx / W + r(-.05, .05), y: my / H, r: r(20, 60), vx: r(-.001, .001), vy: -r(.001, .004), life: 1 }))
          s.impactX = mx; s.impactY = my
        }
      }

      // impact aftermath
      if (s.impactT >= 0) {
        s.impactT += .008

        // ground crack glow at impact site
        const icx = s.impactX || W * .4, icy = s.impactY || H * .7
        const iGlow = ctx.createRadialGradient(icx, icy, 0, icx, icy, 150 * Math.min(1, s.impactT))
        iGlow.addColorStop(0, `rgba(255,200,50,${Math.max(0, .6 - s.impactT * .15) * a})`)
        iGlow.addColorStop(.5, `rgba(255,80,20,${Math.max(0, .3 - s.impactT * .08) * a})`)
        iGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = iGlow; ctx.beginPath(); ctx.arc(icx, icy, 150 * Math.min(1, s.impactT), 0, Math.PI * 2); ctx.fill()

        // shockwave rings from impact
        for (let ri = 0; ri < 4; ri++) {
          const rr = (s.impactT * 300 + ri * 60) % 500
          ctx.beginPath(); ctx.arc(icx, icy, rr, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255,180,50,${Math.max(0, .4 - rr / 500) * a})`; ctx.lineWidth = 2; ctx.stroke()
        }

        // debris chunks
        s.debris.forEach((d: any) => {
          d.x += d.vx; d.y += d.vy; d.vy += .00015; d.life -= .008; d.size *= .996
          if (d.life <= 0) return
          ctx.beginPath(); ctx.arc(d.x * W, d.y * H, Math.max(0, d.size), 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${d.hue},90%,${40 + d.life * 30}%,${d.life * a})`; ctx.fill()
          // small trail
          ctx.beginPath(); ctx.moveTo(d.x * W, d.y * H); ctx.lineTo(d.x * W - d.vx * W * 8, d.y * H - d.vy * H * 8)
          ctx.strokeStyle = `hsla(${d.hue},80%,60%,${d.life * .4 * a})`; ctx.lineWidth = d.size * .5; ctx.stroke()
        })

        // dust clouds expanding
        s.dustClouds.forEach((dc: any) => {
          dc.x += dc.vx; dc.y += dc.vy; dc.r += .8; dc.life -= .005
          if (dc.life <= 0) return
          ctx.beginPath(); ctx.arc(dc.x * W, dc.y * H, dc.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(180,140,80,${dc.life * .12 * a})`; ctx.fill()
        })

        // sky darkening with dust
        ctx.fillStyle = `rgba(20,10,5,${Math.min(.65, s.impactT * .08) * a})`
        ctx.fillRect(0, 0, W, H)

        // fire on ground
        if (s.impactT > .5) {
          for (let fi = 0; fi < 15; fi++) {
            const fx = icx + r(-120, 120), fy = H * (.7 + r(-.05, .05))
            const fl = Math.max(0, 1 - s.impactT * .03)
            ctx.beginPath(); ctx.arc(fx, fy - Math.abs(Math.sin(s.impactT * 3 + fi)) * 20, r(3, 12), 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255,${r(80, 160)},20,${r(.3, .7) * fl * a})`; ctx.fill()
          }
        }

        // cracks in ground
        if (s.impactT > .3) {
          ctx.save(); ctx.globalAlpha = Math.min(1, (s.impactT - .3) * 2) * .8 * a
          ctx.strokeStyle = `rgba(255,180,50,.9)`; ctx.lineWidth = 1.5
          for (let cr = 0; cr < 8; cr++) {
            const ca = (Math.PI * 2 / 8) * cr + cr * .3
            let cx2 = icx, cy2 = icy; ctx.beginPath(); ctx.moveTo(cx2, cy2)
            for (let cs = 0; cs < 6; cs++) { cx2 += Math.cos(ca + r(-.4, .4)) * r(15, 35); cy2 += Math.sin(ca + r(-.3, .3)) * r(8, 20); ctx.lineTo(cx2, cy2) }
            ctx.stroke()
          }
          ctx.restore()
        }
      }
    }
  },
  {
    name: 'Rise of Mammals',
    year: '65 MYA',
    color: '#c4a35a',
    init(s: EraState) {
      s.animals = [{ x: .2, y: .65, size: 22, type: 0 }, { x: .55, y: .7, size: 35, type: 1 }, { x: .78, y: .63, size: 18, type: 2 }]
      s.fireflies = Array.from({ length: 40 }, () => ({ x: r(0, 1), y: r(.3, .9), phase: r(0, Math.PI * 2), vx: r(-.0003, .0003), vy: r(-.0002, .0002) }))
      s.stars = Array.from({ length: 180 }, () => ({ x: r(0, 1), y: r(0, .4), size: r(.5, 2.5), phase: r(0, Math.PI * 2) }))
      s.milkyWay = Array.from({ length: 200 }, () => ({ x: r(.1, .9), y: r(.02, .28) + r(0, .04) * Math.random(), s: r(.2, 1.5), a: r(.1, .5) }))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      const sk = ctx.createLinearGradient(0, 0, 0, H * .5)
      sk.addColorStop(0, `rgba(5,5,20,${a})`); sk.addColorStop(.5, `rgba(10,20,40,${a})`); sk.addColorStop(1, `rgba(15,35,20,${a})`)
      ctx.fillStyle = sk; ctx.fillRect(0, 0, W, H * .5)
      // aurora
      for (let au = 0; au < 5; au++) {
        const ax = W * (.1 + au * .2) + Math.sin(t * .2 + au) * 40
        const ag = ctx.createLinearGradient(ax, 0, ax + 100, H * .4)
        ag.addColorStop(0, 'transparent'); ag.addColorStop(.4, `rgba(${40 + au * 20},${180 - au * 10},${80 + au * 15},${.1 * a})`); ag.addColorStop(1, 'transparent')
        ctx.fillStyle = ag; ctx.beginPath(); ctx.moveTo(ax, 0); ctx.lineTo(ax + 80 + Math.sin(t * .3 + au) * 30, H * .4); ctx.lineTo(ax - 20, H * .4); ctx.closePath(); ctx.fill()
      }
      s.milkyWay.forEach((mw: any) => { ctx.beginPath(); ctx.arc(mw.x * W, mw.y * H, Math.max(0, mw.s), 0, Math.PI * 2); ctx.fillStyle = `rgba(200,180,255,${mw.a * .3 * a})`; ctx.fill() })
      s.stars.forEach((st: any) => { const tw = Math.abs(.4 + .6 * Math.sin(t * 1.5 + st.phase)); ctx.beginPath(); ctx.arc(st.x * W, st.y * H, Math.max(0, st.size * tw), 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${tw * .9 * a})`; ctx.fill() })
      // moon
      ctx.save(); ctx.globalAlpha = a
      const mg = ctx.createRadialGradient(W * .85, H * .12, 0, W * .85, H * .12, 45)
      mg.addColorStop(0, 'rgba(255,250,220,.95)'); mg.addColorStop(.7, 'rgba(240,230,180,.8)'); mg.addColorStop(1, 'transparent')
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(W * .85, H * .12, 40, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
      const gr = ctx.createLinearGradient(0, H * .45, 0, H)
      gr.addColorStop(0, `rgba(25,40,15,${a})`); gr.addColorStop(1, `rgba(15,25,8,${a})`)
      ctx.fillStyle = gr; ctx.fillRect(0, H * .45, W, H)
      for (let g2 = 0; g2 < 60; g2++) { const gx = W * (g2 / 60), gy = H * .46; ctx.save(); ctx.translate(gx, gy); ctx.strokeStyle = `rgba(35,70,20,${.7 * a})`; ctx.lineWidth = 1.2; const sw2 = Math.sin(t * .8 + g2 * .3); for (let b = 0; b < 3; b++) { const ba = -.5 + b * .5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(Math.cos(ba) * 8 + sw2 * 5, -15, Math.cos(ba) * 12 + sw2 * 8, -25); ctx.stroke() } ctx.restore() }
      s.fireflies.forEach((f: any) => {
        f.x += f.vx; f.y += f.vy + Math.sin(t * 1.5 + f.phase) * .0003
        if (f.x < 0) f.x = 1; if (f.x > 1) f.x = 0; if (f.y < .4) f.y = .9; if (f.y > .92) f.y = .4
        const glow = .5 + .5 * Math.sin(t * 3 + f.phase)
        if (glow > .7) { ctx.beginPath(); ctx.arc(f.x * W, f.y * H, Math.max(0, 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(200,255,100,${glow * .9 * a})`; ctx.fill() }
      })
      s.animals.forEach((an: any, i: number) => {
        const ax = an.x * W, ay = an.y * H, walk2 = Math.sin(t * 3) * .15
        ctx.save(); ctx.translate(ax, ay); ctx.globalAlpha = a * .85; ctx.strokeStyle = 'rgba(120,90,50,.9)'; ctx.fillStyle = 'rgba(100,75,40,.8)'; ctx.lineCap = 'round'
        if (an.type === 0) {
          ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(0, 0, an.size * .7, an.size * .3, -.1, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.beginPath(); ctx.ellipse(an.size * .5, -an.size * .15, an.size * .3, an.size * .2, -.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          for (let l2 = 0; l2 < 4; l2++) { ctx.beginPath(); ctx.moveTo((l2 * .3 - .3) * an.size, an.size * .2); ctx.lineTo((l2 * .3 - .3) * an.size + (l2 % 2 ? walk2 : -walk2) * an.size * .3, an.size * .7); ctx.lineWidth = an.size * .1; ctx.stroke() }
        } else if (an.type === 1) {
          ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 0, an.size * .6, an.size * .3, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.beginPath(); ctx.moveTo(an.size * .3, -.2 * an.size); ctx.lineTo(an.size * .3, -an.size * .9 + Math.sin(t * .8) * 5); ctx.lineWidth = an.size * .15; ctx.stroke()
          ctx.beginPath(); ctx.ellipse(an.size * .3, -an.size * .9, an.size * .2, an.size * .15, .2, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          ctx.strokeStyle = 'rgba(80,55,25,.8)'; ctx.lineWidth = 1.5
          for (let br = 0; br < 3; br++) { const ba2 = -Math.PI * .9 + br * .4; ctx.beginPath(); ctx.moveTo(an.size * .3, -an.size); ctx.lineTo(an.size * .3 + Math.cos(ba2) * 18, -an.size + Math.sin(ba2) * 18); ctx.stroke() }
          for (let leg = 0; leg < 4; leg++) { ctx.beginPath(); ctx.strokeStyle = 'rgba(100,75,40,.9)'; ctx.lineWidth = an.size * .09; ctx.moveTo((leg * .25 - .25) * an.size, an.size * .2); ctx.lineTo((leg * .25 - .25) * an.size + (leg % 2 ? walk2 : -walk2) * an.size * .25, an.size * .85); ctx.stroke() }
        } else {
          ctx.beginPath(); ctx.ellipse(0, 0, an.size * .8, an.size * .22, .1, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
          const wf = Math.sin(t * 5) * .4
          ctx.beginPath(); ctx.moveTo(0, -an.size * .1); ctx.quadraticCurveTo(-an.size * .5, -an.size * .3 - wf * an.size * .5, -an.size, -an.size * .1 + wf * an.size * .3); ctx.lineWidth = an.size * .12; ctx.stroke()
          ctx.beginPath(); ctx.moveTo(0, -an.size * .1); ctx.quadraticCurveTo(an.size * .5, -an.size * .3 - wf * an.size * .5, an.size, -an.size * .1 + wf * an.size * .3); ctx.stroke()
        }
        ctx.restore()
      })
    }
  },
  {
    name: 'Homo Sapiens',
    year: '300 KYA',
    color: '#e8a44a',
    init(s: EraState) {
      s.fireP = Array.from({ length: 60 }, () => ({ x: .5, y: .72, vx: r(-.003, .003), vy: -r(.003, .008), life: r(0, 1), size: r(2, 8), hue: r(10, 40) }))
      s.fireT = 0
      s.humans = [{ x: .3, y: .65 }, { x: .5, y: .62 }, { x: .7, y: .66 }]
      s.stars2 = Array.from({ length: 200 }, () => ({ x: r(0, 1), y: r(0, .35), s: r(.3, 2.5), p: r(0, Math.PI * 2) }))
      s.mw = Array.from({ length: 300 }, () => ({ x: r(.1, .9), y: r(.02, .3) + r(0, .05) * Math.random(), s: r(.2, 1.5), a: r(.1, .6) }))
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      ctx.fillStyle = `rgba(3,4,15,${a})`; ctx.fillRect(0, 0, W, H * .38)
      s.mw.forEach((m: any) => { ctx.beginPath(); ctx.arc(m.x * W, m.y * H, Math.max(0, m.s), 0, Math.PI * 2); ctx.fillStyle = `rgba(200,180,255,${m.a * .3 * a})`; ctx.fill() })
      s.stars2.forEach((st: any) => { const tw = Math.abs(.4 + .6 * Math.sin(t * 1.5 + st.p)); ctx.beginPath(); ctx.arc(st.x * W, st.y * H, Math.max(0, st.s * tw), 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${tw * .9 * a})`; ctx.fill() })
      const hg = ctx.createLinearGradient(0, H * .3, 0, H * .45)
      hg.addColorStop(0, 'transparent'); hg.addColorStop(1, `rgba(180,80,20,${.15 * a})`)
      ctx.fillStyle = hg; ctx.fillRect(0, H * .3, W, H * .15)
      ctx.fillStyle = `rgba(15,10,5,${a})`; ctx.fillRect(0, H * .38, W, H * .62)
      for (let r2 = 0; r2 < 20; r2++) { const rx = r2 * W / 20 + r(0, W / 20), ry = H * .38 + r(0, H * .1); ctx.beginPath(); ctx.ellipse(rx, ry, r(10, 30), r(3, 8), r(0, .5), 0, Math.PI * 2); ctx.fillStyle = `rgba(30,22,15,${a * .8})`; ctx.fill() }
      s.fireT += .016
      s.fireP.forEach((p: any) => {
        p.x += p.vx + Math.sin(s.fireT * 3 + p.life * 5) * .002; p.y += p.vy; p.life -= .02; p.size *= .98
        if (p.life <= 0) { p.x = .5 + r(-.03, .03); p.y = .72; p.vx = r(-.003, .003); p.vy = -r(.003, .008); p.life = r(.3, 1); p.size = r(2, 8); p.hue = r(10, 50) }
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, Math.max(0, p.size), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},100%,${50 + p.life * 30}%,${p.life * .85 * a})`; ctx.fill()
      })
      const fg = ctx.createRadialGradient(W * .5, H * .72, 5, W * .5, H * .72, 120)
      fg.addColorStop(0, `rgba(255,150,30,${.3 * a})`); fg.addColorStop(1, 'transparent')
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(W * .5, H * .72, 120, 0, Math.PI * 2); ctx.fill()
      s.humans.forEach((h: any, i: number) => {
        const hx = h.x * W, hy = h.y * H, sz = 22, sw3 = Math.sin(t * 1.2 + i) * .05
        ctx.save(); ctx.translate(hx, hy); ctx.globalAlpha = a * .9
        const fl = .5 + .5 * Math.sin(t * 3 + i)
        ctx.strokeStyle = `rgba(${180 + fl * 40},${120 + fl * 20},${60 + fl * 15},.85)`; ctx.lineWidth = 2.2; ctx.lineCap = 'round'
        ctx.beginPath(); ctx.arc(sw3 * 10, -sz * .9, sz * .28, 0, Math.PI * 2); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(sw3 * 8, -sz * .62); ctx.lineTo(sw3 * 6, 0); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(sw3 * 6, -sz * .4); ctx.lineTo(sw3 * 6 - sz * .4 + (i === 1 ? Math.sin(t * 2) * sz * .2 : 0), -sz * .1); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(sw3 * 6, 0); ctx.lineTo(-sz * .3, sz * .4); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(sw3 * 6, 0); ctx.lineTo(sz * .2, sz * .4); ctx.stroke()
        ctx.restore()
      })
      ctx.save(); ctx.globalAlpha = .35 * a; ctx.strokeStyle = 'rgba(220,150,80,1)'; ctx.lineWidth = 2
      ctx.beginPath(); ctx.ellipse(W * .1, H * .55, 25, 12, 0, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(W * .1 + 20, H * .55); ctx.lineTo(W * .1 + 35, H * .52); ctx.stroke()
      for (let l3 = 0; l3 < 4; l3++) { ctx.beginPath(); ctx.moveTo(W * .1 - 15 + l3 * 12, H * .55 + 8); ctx.lineTo(W * .1 - 15 + l3 * 12 + 3, H * .55 + 20); ctx.stroke() }
      ctx.restore()
    }
  },
  {
    name: 'Shawn Cui — Engineer',
    year: '2002 CE',
    color: '#818cf8',
    init(s: EraState) {
      const pool = ['01', 'アイ', 'ウエ', '{}', '[]', 'const', 'let', 'async', 'await', '=>', 'import', 'export', 'type', 'null', 'void']
      s.code = Array.from({ length: 25 }, () => ({ x: r(0, 1), chars: Array.from({ length: 12 }, () => ({ c: pool[Math.floor(r(0, pool.length))], opacity: r(.1, .9) })), y: r(0, 1), speed: r(.0008, .003), hue: r(200, 280) }))
      s.orbit = [{ rad: 70, speed: 1.0, col: '#60a5fa', size: 6, angle: 0 }, { rad: 105, speed: .65, col: '#a78bfa', size: 8, angle: 2.1 }, { rad: 145, speed: .4, col: '#4ade80', size: 5, angle: 4.2 }, { rad: 185, speed: .25, col: '#f59e0b', size: 7, angle: 1.0 }]
    },
    draw(ctx: CanvasRenderingContext2D, W: number, H: number, t: number, a: number, s: EraState) {
      ctx.fillStyle = `rgba(4,4,16,${a})`; ctx.fillRect(0, 0, W, H)
      ctx.save(); ctx.globalAlpha = .04 * a
      for (let gx = 0; gx < W; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.strokeStyle = 'rgba(100,120,255,1)'; ctx.lineWidth = .5; ctx.stroke() }
      for (let gy = 0; gy < H; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.strokeStyle = 'rgba(100,120,255,1)'; ctx.lineWidth = .5; ctx.stroke() }
      ctx.restore()
      s.code.forEach((col: any) => {
        col.y = (col.y + col.speed) % 1.2
        col.chars.forEach((ch: any, i: number) => {
          const cy = col.y * H - i * 18, fade = 1 - i / col.chars.length
          if (cy < 0 || cy > H) return
          ctx.font = `${11 + i * .3}px monospace`; ctx.textAlign = 'center'
          ctx.fillStyle = `hsla(${col.hue},80%,65%,${fade * ch.opacity * .6 * a})`; ctx.fillText(ch.c, col.x * W, cy)
        })
      })
      const cx = W / 2, cy2 = H * .45
      for (let ri = 0; ri < 4; ri++) { ctx.beginPath(); ctx.arc(cx, cy2, 220 + ri * 30 + Math.sin(t * .5) * 10, 0, Math.PI * 2); ctx.strokeStyle = `rgba(100,120,255,${.03 * a})`; ctx.lineWidth = 1; ctx.stroke() }
      s.orbit.forEach((orb: any) => {
        orb.angle += orb.speed * .016
        const ox = cx + Math.cos(orb.angle) * orb.rad, oy = cy2 + Math.sin(orb.angle) * orb.rad
        ctx.beginPath(); ctx.arc(cx, cy2, orb.rad, 0, Math.PI * 2); ctx.strokeStyle = `rgba(255,255,255,${.06 * a})`; ctx.lineWidth = .5; ctx.stroke()
        const ng = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size * 3)
        ng.addColorStop(0, orb.col + 'cc'); ng.addColorStop(1, orb.col + '00')
        ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(ox, oy, orb.size * 3, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(ox, oy, orb.size, 0, Math.PI * 2); ctx.fillStyle = orb.col; ctx.fill()
        ctx.beginPath(); ctx.moveTo(cx, cy2); ctx.lineTo(ox, oy); ctx.strokeStyle = `rgba(255,255,255,${.06 * a})`; ctx.lineWidth = .5; ctx.stroke()
      })
      ctx.save(); ctx.translate(cx, cy2); ctx.globalAlpha = a
      const pg = ctx.createRadialGradient(0, 0, 10, 0, 0, 80)
      pg.addColorStop(0, 'rgba(140,150,255,.35)'); pg.addColorStop(1, 'transparent')
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(0, 0, 80, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = 'rgba(200,210,255,.95)'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'
      ctx.beginPath(); ctx.arc(0, -48, 15, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, -33); ctx.lineTo(0, 15); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(-22, 5); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(22, 5); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, 15); ctx.lineTo(-14, 55); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, 15); ctx.lineTo(14, 55); ctx.stroke()
      ctx.restore()
      const labels = [{ text: 'React Native', a: 1.2 }, { text: 'TypeScript', a: 2.8 }, { text: 'Spring Boot', a: 4.5 }, { text: 'Genetec', a: 0.4 }, { text: 'Concordia', a: 3.5 }]
      labels.forEach(lb => {
        const la = lb.a + t * .1, lr = r(160, 230)
        ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = `rgba(150,160,255,${.35 * a})`
        ctx.fillText(lb.text, cx + Math.cos(la) * lr, cy2 + Math.sin(la) * lr)
      })
    }
  },
]

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statesRef = useRef<EraState[]>([])
  const curRef = useRef(0)
  const tgtRef = useRef(0)
  const eraTRef = useRef(0)
  const TRef = useRef(0)
  const progRef = useRef(0)
  const rafRef = useRef(0)
  const [eraIdx, setEraIdx] = useState(0)
  const [progPct, setProgPct] = useState(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize(); const ro = new ResizeObserver(resize); ro.observe(canvas)
    statesRef.current = ERAS.map(e => { const s: EraState = {}; e.init(s); return s })

    const DURATION = 5000
    let lastAuto = performance.now()

    function go(i: number) {
      tgtRef.current = i; setEraIdx(i)
      statesRef.current[i] = {}; ERAS[i].init(statesRef.current[i])
    }

    function tick(now: number) {
      const elapsed = now - lastAuto
      const p = Math.min(1, elapsed / DURATION)
      progRef.current = p; setProgPct(p)
      if (p >= 1) { lastAuto = now; go((tgtRef.current + 1) % ERAS.length) }

      TRef.current += .016
      if (curRef.current !== tgtRef.current) eraTRef.current = Math.min(1, eraTRef.current + .035)
      else eraTRef.current = 0

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#04040e'; ctx.fillRect(0, 0, W, H)
      const cur = curRef.current, tgt = tgtRef.current
      if (eraTRef.current < 1) ERAS[cur].draw(ctx, W, H, TRef.current, 1 - eraTRef.current, statesRef.current[cur])
      if (eraTRef.current > 0) ERAS[tgt].draw(ctx, W, H, TRef.current, eraTRef.current, statesRef.current[tgt])
      if (eraTRef.current >= 1) { curRef.current = tgtRef.current; eraTRef.current = 0 }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [])

  function go(i: number) {
    tgtRef.current = i; setEraIdx(i)
    statesRef.current[i] = {}; ERAS[i].init(statesRef.current[i])
  }

  const era = ERAS[eraIdx]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#04040e', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      {/* top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '22px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>About</span>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>{era.year}</span>
      </div>

      {/* era name */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '11px', color: era.color, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.8, margin: 0 }}>{era.name}</p>
      </div>

      {/* bottom controls */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: '0 32px 28px' }}>
        {/* era dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '14px' }}>
          {ERAS.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.12)' }} />}
              <button onClick={() => go(i)} style={{
                width: eraIdx === i ? '10px' : '7px', height: eraIdx === i ? '10px' : '7px',
                borderRadius: '50%', background: eraIdx === i ? e.color : 'rgba(255,255,255,0.18)',
                border: `1px solid ${eraIdx === i ? e.color : 'rgba(255,255,255,0.2)'}`,
                cursor: 'pointer', padding: 0,
                boxShadow: eraIdx === i ? `0 0 10px ${e.color}88` : 'none',
                transition: 'all 0.3s',
              }} />
            </div>
          ))}
        </div>

        {/* progress bar */}
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px' }}>
          <div style={{ height: '100%', background: era.color, width: `${progPct * 100}%`, borderRadius: '1px', transition: 'background 0.5s' }} />
        </div>
      </div>

      {/* links */}
      <div style={{ position: 'absolute', bottom: '28px', right: '32px', display: 'flex', gap: '20px', zIndex: 10 }}>
        {[{ label: 'github', href: 'https://github.com/S-Netizen49' }, { label: 'linkedin', href: 'https://www.linkedin.com/in/shawnn-cui/' }].map(l => (
          <a key={l.label} href={l.href} style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)' }}>
            {l.label} ↗
          </a>
        ))}
      </div>
    </div>
  )
}
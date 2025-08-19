import{a as P}from"./chunk-KH26CASC.js";import{D as w,G as b,Sc as x,d as g,f as r,k as p,r as j,x as v}from"./chunk-EYPZOMIL.js";import{a as h,b as f}from"./chunk-CRC5ZNR6.js";var y=(()=>{let c=class c{constructor(e,s){this.supabaseClientService=e,this.dataUpdateService=s,this.presupuestosSubject=new g([]),this.presupuestos$=this.presupuestosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}getPresupuestos(e=1,s=10,t,a,u,i){let o=this.supabase.from("presupuestos").select(`
        *,
        aviso:avisos(
          *,
          cliente:clientes(*)
        )
      `,{count:"exact"});t&&(o=o.or(`aviso.nombre_cliente_aviso.ilike.%${t}%`)),i&&(o=o.eq("estado",i));let n=(e-1)*s;return o=o.range(n,n+s-1).order(a||"fecha_creacion",{ascending:u==="asc"}),r(o).pipe(p(({data:l,error:S,count:A})=>{if(S)throw S;let m=l;return this.presupuestosSubject.next(m),{presupuestos:m,total:A||0,pagina:e,por_pagina:s}}),j(l=>{throw console.error("Error al obtener presupuestos:",l),l}))}getPresupuesto(e){return console.log("Servicio: Buscando presupuesto con ID:",e),r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          materiales_estimados
        `).eq("id",e).single()).pipe(p(({data:s,error:t})=>{if(console.log("Servicio: Respuesta de Supabase:",{data:s,error:t}),t)throw t;return s}))}crearPresupuesto(e){let s=f(h({},e),{fecha_creacion:new Date().toISOString(),estado:"Pendiente"});return r(this.supabase.from("presupuestos").insert([s]).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(v(({data:t,error:a})=>{if(a)throw a;let u=t,i=this.presupuestosSubject.value;return this.presupuestosSubject.next([u,...i]),this.dataUpdateService.notifyCreated("presupuestos"),r([u])}))}actualizarPresupuesto(e,s){console.log("Servicio: Actualizando presupuesto con ID:",e),console.log("Servicio: Datos recibidos:",s);let t=f(h({},s),{fecha_actualizacion:new Date().toISOString()});return console.log("Servicio: Datos del presupuesto:",t),r(this.supabase.from("presupuestos").update(t).eq("id",e).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(v(({data:a,error:u})=>{if(u)throw u;let i=a;console.log("Servicio: Presupuesto actualizado:",i),console.log("Servicio: Presupuesto actualizado:",i);let o=this.presupuestosSubject.value,n=o.findIndex(l=>l.id===e);return n!==-1&&(o[n]=i,this.presupuestosSubject.next([...o])),this.dataUpdateService.notifyUpdated("presupuestos"),r([i])}))}eliminarPresupuesto(e){return r(this.supabase.from("presupuestos").delete().eq("id",e)).pipe(p(({error:s})=>{if(s)throw s;let a=this.presupuestosSubject.value.filter(u=>u.id!==e);this.presupuestosSubject.next(a),this.dataUpdateService.notifyDeleted("presupuestos")}))}buscarPresupuestos(e){return r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).or(`aviso.nombre_cliente_aviso.ilike.%${e}%`).limit(10)).pipe(p(({data:s,error:t})=>{if(t)throw t;return s}))}getPresupuestosPorEstado(e){return r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado",e).order("fecha_creacion",{ascending:!1})).pipe(p(({data:s,error:t})=>{if(t)throw t;return s}))}getPresupuestosPorAviso(e){return r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("aviso_id",e).order("fecha_creacion",{ascending:!1})).pipe(p(({data:s,error:t})=>{if(t)throw t;return s}))}cambiarEstado(e,s){return r(this.supabase.from("presupuestos").update({estado:s,fecha_actualizacion:new Date().toISOString()}).eq("id",e).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(p(({data:t,error:a})=>{if(a)throw a;let u=t,i=this.presupuestosSubject.value,o=i.findIndex(n=>n.id===e);return o!==-1&&(i[o]=u,this.presupuestosSubject.next([...i])),u}))}getPresupuestosActuales(){return this.presupuestosSubject.value}limpiarPresupuestos(){this.presupuestosSubject.next([])}};c.\u0275fac=function(s){return new(s||c)(b(x),b(P))},c.\u0275prov=w({token:c,factory:c.\u0275fac,providedIn:"root"});let d=c;return d})();export{y as a};

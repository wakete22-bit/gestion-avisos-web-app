import{b as _}from"./chunk-EZQHEP6E.js";import{B as j,E as w,c as S,e as o,i as n,p as g,v as d}from"./chunk-YCXETNVK.js";import{a as h,b as f}from"./chunk-CRC5ZNR6.js";var z=(()=>{let l=class l{constructor(s){this.supabaseClientService=s,this.presupuestosSubject=new S([]),this.presupuestos$=this.presupuestosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}getPresupuestos(s=1,e=10,t,r,i,a){let u=this.supabase.from("presupuestos").select(`
        *,
        aviso:avisos(
          *,
          cliente:clientes(*)
        )
      `,{count:"exact"});t&&(u=u.or(`aviso.nombre_cliente_aviso.ilike.%${t}%`)),a&&(u=u.eq("estado",a));let p=(s-1)*e;return u=u.range(p,p+e-1).order(r||"fecha_creacion",{ascending:i==="asc"}),o(u).pipe(n(({data:c,error:m,count:x})=>{if(m)throw m;let v=c;return this.presupuestosSubject.next(v),{presupuestos:v,total:x||0,pagina:s,por_pagina:e}}),g(c=>{throw console.error("Error al obtener presupuestos:",c),c}))}getPresupuesto(s){return console.log("Servicio: Buscando presupuesto con ID:",s),o(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          materiales:materiales_presupuesto(
            *,
            material:inventario(*)
          )
        `).eq("id",s).single()).pipe(n(({data:e,error:t})=>{if(console.log("Servicio: Respuesta de Supabase:",{data:e,error:t}),t)throw t;return e}))}crearPresupuesto(s){let e=f(h({},s),{fecha_creacion:new Date().toISOString(),estado:"Pendiente"});return o(this.supabase.from("presupuestos").insert([e]).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(d(({data:t,error:r})=>{if(r)throw r;let i=t;if(!e.materiales||e.materiales.length===0){let u=this.presupuestosSubject.value;return this.presupuestosSubject.next([i,...u]),o([i])}let a=e.materiales.map(u=>f(h({},u),{presupuesto_id:i.id,fecha_creacion:new Date().toISOString()}));return o(this.supabase.from("materiales_presupuesto").insert(a).select()).pipe(n(({data:u,error:p})=>{if(p)throw p;let c=this.presupuestosSubject.value;return this.presupuestosSubject.next([i,...c]),i}))}))}actualizarPresupuesto(s,e){let t=f(h({},e),{fecha_actualizacion:new Date().toISOString()});return o(this.supabase.from("presupuestos").update(t).eq("id",s).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(n(({data:r,error:i})=>{if(i)throw i;let a=r,u=this.presupuestosSubject.value,p=u.findIndex(c=>c.id===s);return p!==-1&&(u[p]=a,this.presupuestosSubject.next([...u])),a}))}eliminarPresupuesto(s){return o(this.supabase.from("materiales_presupuesto").delete().eq("presupuesto_id",s)).pipe(d(({error:e})=>{if(e)throw e;return o(this.supabase.from("presupuestos").delete().eq("id",s))}),n(({error:e})=>{if(e)throw e;let r=this.presupuestosSubject.value.filter(i=>i.id!==s);this.presupuestosSubject.next(r)}))}buscarPresupuestos(s){return o(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).or(`aviso.nombre_cliente_aviso.ilike.%${s}%`).limit(10)).pipe(n(({data:e,error:t})=>{if(t)throw t;return e}))}getPresupuestosPorEstado(s){return o(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado",s).order("fecha_creacion",{ascending:!1})).pipe(n(({data:e,error:t})=>{if(t)throw t;return e}))}getPresupuestosPorAviso(s){return o(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("aviso_id",s).order("fecha_creacion",{ascending:!1})).pipe(n(({data:e,error:t})=>{if(t)throw t;return e}))}cambiarEstado(s,e){return o(this.supabase.from("presupuestos").update({estado:e,fecha_actualizacion:new Date().toISOString()}).eq("id",s).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(n(({data:t,error:r})=>{if(r)throw r;let i=t,a=this.presupuestosSubject.value,u=a.findIndex(p=>p.id===s);return u!==-1&&(a[u]=i,this.presupuestosSubject.next([...a])),i}))}getPresupuestosActuales(){return this.presupuestosSubject.value}limpiarPresupuestos(){this.presupuestosSubject.next([])}};l.\u0275fac=function(e){return new(e||l)(w(_))},l.\u0275prov=j({token:l,factory:l.\u0275fac,providedIn:"root"});let b=l;return b})();export{z as a};

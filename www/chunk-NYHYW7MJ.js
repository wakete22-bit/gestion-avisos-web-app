import{a as j}from"./chunk-5YRB7RVB.js";import{b as w}from"./chunk-A72QMOGB.js";import{B as _,F as g,I as m,d as S,f as i,j as n,s as f,z as h}from"./chunk-4AY4VQCP.js";var q=(()=>{let c=class c{constructor(t,e){this.supabaseClientService=t,this.dataUpdateService=e,this.presupuestosSubject=new S([]),this.presupuestos$=this.presupuestosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}getPresupuestos(t=1,e=10,s,u,r,a){let o=this.supabase.from("presupuestos").select(`
        *,
        aviso:avisos(
          *,
          cliente:clientes(*)
        )
      `,{count:"exact"});s&&(o=o.or(`aviso.nombre_cliente_aviso.ilike.%${s}%`)),a&&(o=o.eq("estado",a));let l=(t-1)*e;return o=o.range(l,l+e-1).order(u||"fecha_creacion",{ascending:r==="asc"}),i(o).pipe(n(({data:p,error:v,count:P})=>{if(v)throw v;let b=p;return this.presupuestosSubject.next(b),{presupuestos:b,total:P||0,pagina:t,por_pagina:e}}),f(p=>{throw console.error("Error al obtener presupuestos:",p),p}))}getPresupuesto(t){return console.log("Servicio: Buscando presupuesto con ID:",t),i(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          albaran:albaranes(*),
          materiales_estimados
        `).eq("id",t).single()).pipe(n(({data:e,error:s})=>{if(console.log("Servicio: Respuesta de Supabase:",{data:e,error:s}),s)throw s;return e}))}crearPresupuesto(t){let e={aviso_id:t.aviso_id,horas_estimadas:t.horas_estimadas,total_estimado:t.total_estimado,fecha_creacion:new Date().toISOString(),estado:"Pendiente"};return t.albaran_id&&(e.albaran_id=t.albaran_id),t.materiales&&t.materiales.length>0&&(e.materiales_estimados=t.materiales),console.log("Servicio: Creando presupuesto con datos:",e),i(this.supabase.from("presupuestos").insert([e]).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(h(({data:s,error:u})=>{if(u)throw u;let r=s,a=this.presupuestosSubject.value;return this.presupuestosSubject.next([r,...a]),this.dataUpdateService.notifyCreated("presupuestos"),i([r])}))}actualizarPresupuesto(t,e){console.log("Servicio: Actualizando presupuesto con ID:",t),console.log("Servicio: Datos recibidos:",e);let s={fecha_actualizacion:new Date().toISOString()};return e.aviso_id!==void 0&&(s.aviso_id=e.aviso_id),e.horas_estimadas!==void 0&&(s.horas_estimadas=e.horas_estimadas),e.total_estimado!==void 0&&(s.total_estimado=e.total_estimado),e.estado!==void 0&&(s.estado=e.estado),e.pdf_url!==void 0&&(s.pdf_url=e.pdf_url),e.materiales&&e.materiales.length>0&&(s.materiales_estimados=e.materiales),console.log("Servicio: Datos del presupuesto a actualizar:",s),i(this.supabase.from("presupuestos").update(s).eq("id",t).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(h(({data:u,error:r})=>{if(r)throw r;let a=u;console.log("Servicio: Presupuesto actualizado:",a),console.log("Servicio: Presupuesto actualizado:",a);let o=this.presupuestosSubject.value,l=o.findIndex(p=>p.id===t);return l!==-1&&(o[l]=a,this.presupuestosSubject.next([...o])),this.dataUpdateService.notifyUpdated("presupuestos"),i([a])}))}eliminarPresupuesto(t){return console.log("\u{1F50D} eliminarPresupuesto llamado con ID:",t),i(this.supabase.from("presupuestos").delete().eq("id",t)).pipe(n(({data:e,error:s})=>{if(console.log("\u{1F50D} Respuesta de Supabase:",{data:e,error:s}),s)throw console.error("\u274C Error de Supabase:",s),s;console.log("\u2705 Presupuesto eliminado exitosamente de la BD");let r=this.presupuestosSubject.value.filter(a=>a.id!==t);this.presupuestosSubject.next(r),this.dataUpdateService.notifyDeleted("presupuestos"),console.log("\u2705 Estado local actualizado")}),f(e=>{throw console.error("\u274C Error en eliminarPresupuesto:",e),e}))}buscarPresupuestos(t){return i(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).or(`aviso.nombre_cliente_aviso.ilike.%${t}%`).limit(10)).pipe(n(({data:e,error:s})=>{if(s)throw s;return e}))}getPresupuestosPorEstado(t){return i(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado",t).order("fecha_creacion",{ascending:!1})).pipe(n(({data:e,error:s})=>{if(s)throw s;return e}))}getPresupuestosPorAviso(t){return i(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("aviso_id",t).order("fecha_creacion",{ascending:!1})).pipe(n(({data:e,error:s})=>{if(s)throw s;return e}))}cambiarEstado(t,e){return i(this.supabase.from("presupuestos").update({estado:e,fecha_actualizacion:new Date().toISOString()}).eq("id",t).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(n(({data:s,error:u})=>{if(u)throw u;let r=s,a=this.presupuestosSubject.value,o=a.findIndex(l=>l.id===t);return o!==-1&&(a[o]=r,this.presupuestosSubject.next([...a])),r}))}getPresupuestosActuales(){return this.presupuestosSubject.value}aprobarPresupuesto(t){return console.log("Servicio: Aprobando presupuesto con ID:",t),i(this.supabase.from("presupuestos").update({estado:"Aprobado",fecha_actualizacion:new Date().toISOString()}).eq("id",t).select()).pipe(_(({data:e,error:s})=>{s?console.error("Error al actualizar presupuesto:",s):console.log("Presupuesto actualizado exitosamente:",e)}),n(({data:e,error:s})=>{if(s)throw s;return e}))}limpiarPresupuestos(){this.presupuestosSubject.next([])}};c.\u0275fac=function(e){return new(e||c)(m(w),m(j))},c.\u0275prov=g({token:c,factory:c.\u0275fac,providedIn:"root"});let d=c;return d})();export{q as a};

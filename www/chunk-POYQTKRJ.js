import{a as j}from"./chunk-4YIX43F7.js";import{b as g}from"./chunk-CSU5APV4.js";import{F as _,I as m,d as S,f as r,j as u,s as f,z as h}from"./chunk-ICGOMMV6.js";var A=(()=>{let c=class c{constructor(s,e){this.supabaseClientService=s,this.dataUpdateService=e,this.presupuestosSubject=new S([]),this.presupuestos$=this.presupuestosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}getPresupuestos(s=1,e=10,t,n,o,i){let a=this.supabase.from("presupuestos").select(`
        *,
        aviso:avisos(
          *,
          cliente:clientes(*)
        )
      `,{count:"exact"});t&&(a=a.or(`aviso.nombre_cliente_aviso.ilike.%${t}%`)),i&&(a=a.eq("estado",i));let l=(s-1)*e;return a=a.range(l,l+e-1).order(n||"fecha_creacion",{ascending:o==="asc"}),r(a).pipe(u(({data:p,error:v,count:w})=>{if(v)throw v;let b=p;return this.presupuestosSubject.next(b),{presupuestos:b,total:w||0,pagina:s,por_pagina:e}}),f(p=>{throw console.error("Error al obtener presupuestos:",p),p}))}getPresupuesto(s){return console.log("Servicio: Buscando presupuesto con ID:",s),r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          albaran:albaranes(*),
          materiales_estimados
        `).eq("id",s).single()).pipe(u(({data:e,error:t})=>{if(console.log("Servicio: Respuesta de Supabase:",{data:e,error:t}),t)throw t;return e}))}crearPresupuesto(s){let e={aviso_id:s.aviso_id,horas_estimadas:s.horas_estimadas,total_estimado:s.total_estimado,fecha_creacion:new Date().toISOString(),estado:"Pendiente"};return s.albaran_id&&(e.albaran_id=s.albaran_id),s.materiales&&s.materiales.length>0&&(e.materiales_estimados=s.materiales),console.log("Servicio: Creando presupuesto con datos:",e),r(this.supabase.from("presupuestos").insert([e]).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(h(({data:t,error:n})=>{if(n)throw n;let o=t,i=this.presupuestosSubject.value;return this.presupuestosSubject.next([o,...i]),this.dataUpdateService.notifyCreated("presupuestos"),r([o])}))}actualizarPresupuesto(s,e){console.log("Servicio: Actualizando presupuesto con ID:",s),console.log("Servicio: Datos recibidos:",e);let t={fecha_actualizacion:new Date().toISOString()};return e.aviso_id!==void 0&&(t.aviso_id=e.aviso_id),e.horas_estimadas!==void 0&&(t.horas_estimadas=e.horas_estimadas),e.total_estimado!==void 0&&(t.total_estimado=e.total_estimado),e.estado!==void 0&&(t.estado=e.estado),e.pdf_url!==void 0&&(t.pdf_url=e.pdf_url),e.materiales&&e.materiales.length>0&&(t.materiales_estimados=e.materiales),console.log("Servicio: Datos del presupuesto a actualizar:",t),r(this.supabase.from("presupuestos").update(t).eq("id",s).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(h(({data:n,error:o})=>{if(o)throw o;let i=n;console.log("Servicio: Presupuesto actualizado:",i),console.log("Servicio: Presupuesto actualizado:",i);let a=this.presupuestosSubject.value,l=a.findIndex(p=>p.id===s);return l!==-1&&(a[l]=i,this.presupuestosSubject.next([...a])),this.dataUpdateService.notifyUpdated("presupuestos"),r([i])}))}eliminarPresupuesto(s){return console.log("\u{1F50D} eliminarPresupuesto llamado con ID:",s),r(this.supabase.from("presupuestos").delete().eq("id",s)).pipe(u(({data:e,error:t})=>{if(console.log("\u{1F50D} Respuesta de Supabase:",{data:e,error:t}),t)throw console.error("\u274C Error de Supabase:",t),t;console.log("\u2705 Presupuesto eliminado exitosamente de la BD");let o=this.presupuestosSubject.value.filter(i=>i.id!==s);this.presupuestosSubject.next(o),this.dataUpdateService.notifyDeleted("presupuestos"),console.log("\u2705 Estado local actualizado")}),f(e=>{throw console.error("\u274C Error en eliminarPresupuesto:",e),e}))}buscarPresupuestos(s){return r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).or(`aviso.nombre_cliente_aviso.ilike.%${s}%`).limit(10)).pipe(u(({data:e,error:t})=>{if(t)throw t;return e}))}getPresupuestosPorEstado(s){return r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado",s).order("fecha_creacion",{ascending:!1})).pipe(u(({data:e,error:t})=>{if(t)throw t;return e}))}getPresupuestosPorAviso(s){return r(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("aviso_id",s).order("fecha_creacion",{ascending:!1})).pipe(u(({data:e,error:t})=>{if(t)throw t;return e}))}cambiarEstado(s,e){return r(this.supabase.from("presupuestos").update({estado:e,fecha_actualizacion:new Date().toISOString()}).eq("id",s).select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).single()).pipe(u(({data:t,error:n})=>{if(n)throw n;let o=t,i=this.presupuestosSubject.value,a=i.findIndex(l=>l.id===s);return a!==-1&&(i[a]=o,this.presupuestosSubject.next([...i])),o}))}getPresupuestosActuales(){return this.presupuestosSubject.value}limpiarPresupuestos(){this.presupuestosSubject.next([])}};c.\u0275fac=function(e){return new(e||c)(m(g),m(j))},c.\u0275prov=_({token:c,factory:c.\u0275fac,providedIn:"root"});let d=c;return d})();export{A as a};

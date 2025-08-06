import{b as S}from"./chunk-EZQHEP6E.js";import{B as A,E as C,c as j,e as l,i as u,p as d,v as h}from"./chunk-YCXETNVK.js";import{a as b,b as g}from"./chunk-CRC5ZNR6.js";var D=(()=>{let v=class v{constructor(t){this.supabaseClientService=t,this.avisosSubject=new j([]),this.avisos$=this.avisosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}getAvisos(t=1,e=20,s,a,i,o,n=!1){let r=this.supabase.from("avisos").select(`
                id,
                cliente_id,
                tecnico_asignado_id,
                fecha_creacion,
                fecha_actualizacion,
                nombre_cliente_aviso,
                direccion_cliente_aviso,
                telefono_cliente_aviso,
                nombre_contacto,
                tipo,
                descripcion_problema,
                estado,
                urgencia,
                es_urgente,
                latitud,
                longitud,
                fecha_finalizacion,
                requiere_presupuesto,
                requiere_nueva_visita,
                cliente:clientes!inner(id, nombre_completo, direccion, telefono_contacto, email, nivel_urgencia_habitual, es_activo, fecha_creacion, fecha_actualizacion),
                tecnico_asignado:usuarios(id, nombre_completo, email, telefono, rol_id, fecha_creacion, fecha_actualizacion)
            `,{count:"exact"});s&&(r=r.or(`nombre_cliente_aviso.ilike.%${s}%,descripcion_problema.ilike.%${s}%`)),o?r=r.eq("estado",o):n||(r=r.neq("estado","Completado"));let c=(t-1)*e;return r=r.range(c,c+e-1).order(a||"fecha_creacion",{ascending:i==="asc"}),l(r).pipe(u(({data:p,error:f,count:m})=>{if(f)throw f;let _=p;return this.avisosSubject.next(_),{avisos:_,total:m||0,pagina:t,por_pagina:e}}),d(p=>{throw console.error("Error al obtener avisos:",p),p}))}getAviso(t){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes!inner(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(id, url, descripcion, fecha_subida)
                `).eq("id",t).single()).pipe(u(({data:e,error:s})=>{if(s)throw s;return e}),d(e=>{throw console.error("Error al obtener aviso:",e),e}))}crearAviso(t){let e=g(b({},t),{urgencia:t.es_urgente?"Alta":"Normal",fecha_creacion:new Date().toISOString(),estado:"No visitado",requiere_presupuesto:!1,requiere_nueva_visita:!1});return l(this.supabase.from("avisos").insert([e]).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(u(({data:s,error:a})=>{if(a)throw a;let i=s,o=this.avisosSubject.value;return this.avisosSubject.next([i,...o]),i}))}actualizarAviso(t,e){let s=g(b({},e),{fecha_actualizacion:new Date().toISOString()});return l(this.supabase.from("avisos").update(s).eq("id",t).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(u(({data:a,error:i})=>{if(i)throw i;let o=a,n=this.avisosSubject.value,r=n.findIndex(c=>c.id===t);return r!==-1&&(n[r]=o,this.avisosSubject.next([...n])),o}))}eliminarAviso(t){return l(this.supabase.from("avisos").delete().eq("id",t)).pipe(u(({error:e})=>{if(e)throw e;let a=this.avisosSubject.value.filter(i=>i.id!==t);this.avisosSubject.next(a)}),d(e=>{if(e.code==="23503"&&e.message.includes("fotos_aviso"))return this.eliminarFotosAviso(t).pipe(h(()=>l(this.supabase.from("avisos").delete().eq("id",t))),u(({error:s})=>{if(s)throw s;let i=this.avisosSubject.value.filter(o=>o.id!==t);this.avisosSubject.next(i)}));throw e}))}eliminarFotosAviso(t){return l(this.supabase.from("fotos_aviso").select("*").eq("aviso_id",t)).pipe(h(({data:e,error:s})=>{if(s)throw s;let a=e;if(a.length===0)return l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",t)).pipe(u(({error:o})=>{if(o)throw o}));let i=a.map(o=>{let n=o.url.split("/"),r=n[n.length-1];return`${t}/${r}`});return l(this.supabase.storage.from("fotos-avisos").remove(i)).pipe(h(({error:o})=>(o&&console.warn("Error al eliminar archivos del storage:",o),l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",t)))),u(({error:o})=>{if(o)throw o}))}),d(e=>{throw console.error("Error al eliminar fotos del aviso:",e),e}))}subirFoto(t,e,s){let a=this.sanitizeFileName(e.name),i=`${t}/${Date.now()}_${a}`;return l(this.supabase.storage.from("fotos-avisos").upload(i,e)).pipe(u(({data:o,error:n})=>{if(n)throw console.error("Error al subir archivo a storage:",n),n.message==="Bucket not found"?new Error("El bucket de storage no est\xE1 configurado. Contacta al administrador."):n;let{data:r}=this.supabase.storage.from("fotos-avisos").getPublicUrl(i);return r.publicUrl}),h(o=>l(this.supabase.from("fotos_aviso").insert([{aviso_id:t,url:o,descripcion:s}]).select().single())),u(({data:o,error:n})=>{if(n)throw n;return o}),d(o=>{throw console.error("Error completo al subir foto:",o),o}))}eliminarFoto(t){return l(this.supabase.from("fotos_aviso").select("*").eq("id",t).single()).pipe(h(({data:e,error:s})=>{if(s)throw s;let a=e,i=a.url.split("/"),o=i[i.length-1],r=`${a.aviso_id}/${o}`;return l(this.supabase.storage.from("fotos-avisos").remove([r])).pipe(h(({error:c})=>(c&&console.warn("Error al eliminar archivo del storage:",c),l(this.supabase.from("fotos_aviso").delete().eq("id",t)))),u(({error:c})=>{if(c)throw c}))}),d(e=>{throw console.error("Error al eliminar foto:",e),e}))}buscarAvisos(t){return l(this.supabase.from("avisos").select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).or(`nombre_cliente_aviso.ilike.%${t}%,descripcion_problema.ilike.%${t}%`).neq("estado","Completado").limit(10)).pipe(u(({data:e,error:s})=>{if(s)throw s;return e}))}getAvisosActivos(t=1,e=10,s,a,i,o){return this.getAvisos(t,e,s,a,i,o,!1)}getAvisosCompletados(t=1,e=10,s,a,i){return this.getAvisos(t,e,s,a,i,"Completado",!0)}getAvisosActuales(){return this.avisosSubject.value}limpiarAvisos(){this.avisosSubject.next([])}sanitizeFileName(t){return t.replace(/[^a-zA-Z0-9.-]/g,"_").replace(/_{2,}/g,"_").replace(/^_+|_+$/g,"").toLowerCase()}crearFacturaDesdeTrabajos(t){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes(*),
                    trabajos:trabajos_realizados(
                        *,
                        materiales:materiales_trabajo(
                            *,
                            material:inventario(*)
                        )
                    )
                `).eq("id",t).single()).pipe(u(({data:e,error:s})=>{var n;if(s)throw s;let a=e,i=((n=a.trabajos)==null?void 0:n.filter(r=>r.estado==="Completado"))||[];if(i.length===0)throw new Error("No hay trabajos completados para facturar");return{avisoId:a.id,cliente:a.cliente||{nombre_completo:a.nombre_cliente_aviso,direccion:a.direccion_cliente_aviso,email:"sin-email@ejemplo.com",cif:"Sin CIF"},trabajos:i,resumen:this.calcularResumenFacturacion(i)}}),d(e=>{throw console.error("Error al preparar factura desde trabajos:",e),e}))}calcularResumenFacturacion(t){let e=[],s=0;return t.forEach(a=>{var r;let i=new Date(`2000-01-01T${a.hora_inicio}`),n=(new Date(`2000-01-01T${a.hora_fin}`).getTime()-i.getTime())/(1e3*60*60);s+=Math.max(0,n),(r=a.materiales)==null||r.forEach(c=>{var f,m;let p=e.find(_=>_.material_id===c.material_id);p?p.cantidad_total+=c.cantidad_utilizada:e.push({material_id:c.material_id,nombre:((f=c.material)==null?void 0:f.nombre)||"Material desconocido",cantidad_total:c.cantidad_utilizada,precio_unitario:c.precio_neto_al_momento,descripcion:((m=c.material)==null?void 0:m.descripcion)||""})})}),{materiales:e,horasTotales:s,numeroTrabajos:t.length}}getResumenCompletoAviso(t){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(*),
                    trabajos:trabajos_realizados(
                        *,
                        materiales:materiales_trabajo(
                            *,
                            material:inventario(*)
                        )
                    ),
                    presupuesto:presupuestos(
                        *,
                        materiales:materiales_presupuesto(
                            *,
                            material:inventario(*)
                        )
                    ),
                    facturas:facturas(*)
                `).eq("id",t).single()).pipe(u(({data:e,error:s})=>{var n,r,c,p,f;if(s)throw s;let a=e,i=((n=a.trabajos)==null?void 0:n.filter(m=>m.estado==="Completado"))||[],o=((r=a.facturas)==null?void 0:r.filter(m=>m.estado!=="Completado"))||[];return g(b({},a),{estadisticas:{totalTrabajos:((c=a.trabajos)==null?void 0:c.length)||0,trabajosCompletados:i.length,tienePresupuesto:!!a.presupuesto,estadoPresupuesto:((p=a.presupuesto)==null?void 0:p.estado)||null,totalFacturas:((f=a.facturas)==null?void 0:f.length)||0,facturasPendientes:o.length,puedeFacturar:i.length>0&&o.length===0}})}),d(e=>{throw console.error("Error al obtener resumen completo:",e),e}))}actualizarEstadoAutomatico(t){return this.getResumenCompletoAviso(t).pipe(h(e=>{var a,i;let s=e.estado;return e.estadisticas.trabajosCompletados>0&&!e.estadisticas.tienePresupuesto?s="Completado":e.estadisticas.tienePresupuesto&&((a=e.presupuesto)==null?void 0:a.estado)==="Pendiente"?s="Pendiente de presupuesto":e.estadisticas.tienePresupuesto&&((i=e.presupuesto)==null?void 0:i.estado)==="Completado"?s="En curso":e.estadisticas.trabajosCompletados>0&&e.estadisticas.facturasPendientes===0&&(s="Completado"),s!==e.estado?this.actualizarAviso(t,{estado:s}):l([e])}))}};v.\u0275fac=function(e){return new(e||v)(C(S))},v.\u0275prov=A({token:v,factory:v.\u0275fac,providedIn:"root"});let w=v;return w})();export{D as a};

import{a as x}from"./chunk-JTEH53SE.js";import{F as q,I as w,Wc as $,d as F,f as l,k as u,t as d,z as v}from"./chunk-GZDKEEK6.js";import{a as g,b as A}from"./chunk-CRC5ZNR6.js";var k=(()=>{let b=class b{constructor(a,e){this.supabaseClientService=a,this.cacheService=e,this.avisosSubject=new F([]),this.avisos$=this.avisosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}debugConnection(){return console.log("\u{1F50D} AvisosService: Probando conexi\xF3n b\xE1sica..."),l(this.supabase.from("avisos").select("id").limit(1)).pipe(u(({data:a,error:e})=>{if(e)throw console.error("\u274C AvisosService: Error en conexi\xF3n:",e),e;return console.log("\u2705 AvisosService: Conexi\xF3n exitosa, datos:",a),{success:!0,data:a}}),d(a=>(console.error("\u274C AvisosService: Error cr\xEDtico:",a),l(Promise.resolve({success:!1,error:a})))))}getAvisos(a=1,e=15,s,t,i,o,n=!1){let r=this.supabase.from("avisos").select(`
                id,
                numero_secuencial,
                cliente_id,
                tecnico_asignado_id,
                fecha_creacion,
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
                cliente:clientes!inner(id, nombre_completo, direccion, telefono_contacto),
                tecnico_asignado:usuarios(id, nombre_completo, email)
            `,{count:"exact"});s&&(r=r.or(`nombre_cliente_aviso.ilike.%${s}%,descripcion_problema.ilike.%${s}%`)),o?r=r.eq("estado",o):n||(r=r.neq("estado","Completado"));let c=(a-1)*e;return r=r.range(c,c+e-1).order(t||"numero_secuencial",{ascending:i==="asc"}),l(r).pipe(u(({data:f,error:p,count:m})=>{if(p)throw p;let _=f;return this.avisosSubject.next(_),{avisos:_,total:m||0,pagina:a,por_pagina:e}}),d(f=>{throw console.error("Error al obtener avisos:",f),f}))}getAviso(a){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes!inner(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(id, url, descripcion, fecha_subida)
                `).eq("id",a).single()).pipe(u(({data:e,error:s})=>{if(s)throw s;return e}),d(e=>{throw console.error("Error al obtener aviso:",e),e}))}crearAviso(a){let e=A(g({},a),{urgencia:a.es_urgente?"Alta":"Normal",fecha_creacion:new Date().toISOString(),estado:"Pendiente",requiere_presupuesto:!1,requiere_nueva_visita:!1});return l(this.supabase.from("avisos").insert([e]).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(u(({data:s,error:t})=>{if(t)throw t;let i=s,o=this.avisosSubject.value;return this.avisosSubject.next([i,...o]),this.cacheService.clearCache("avisos"),i}))}actualizarAviso(a,e){let s=A(g({},e),{fecha_actualizacion:new Date().toISOString()});return l(this.supabase.from("avisos").update(s).eq("id",a).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(u(({data:t,error:i})=>{if(i)throw i;let o=t,n=this.avisosSubject.value,r=n.findIndex(c=>c.id===a);return r!==-1&&(n[r]=o,this.avisosSubject.next([...n])),this.cacheService.clearCache("avisos"),o}))}eliminarAviso(a){return l(this.supabase.from("avisos").delete().eq("id",a)).pipe(u(({error:e})=>{if(e)throw e;let t=this.avisosSubject.value.filter(i=>i.id!==a);this.avisosSubject.next(t),this.cacheService.clearCache("avisos")}),d(e=>{if(e.code==="23503"&&e.message.includes("fotos_aviso"))return this.eliminarFotosAviso(a).pipe(v(()=>l(this.supabase.from("avisos").delete().eq("id",a))),u(({error:s})=>{if(s)throw s;let i=this.avisosSubject.value.filter(o=>o.id!==a);this.avisosSubject.next(i),this.cacheService.clearCache("avisos")}));throw e}))}eliminarFotosAviso(a){return l(this.supabase.from("fotos_aviso").select("*").eq("aviso_id",a)).pipe(v(({data:e,error:s})=>{if(s)throw s;let t=e;if(t.length===0)return l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",a)).pipe(u(({error:o})=>{if(o)throw o}));let i=t.map(o=>{let n=o.url.split("/"),r=n[n.length-1];return`${a}/${r}`});return l(this.supabase.storage.from("fotos-avisos").remove(i)).pipe(v(({error:o})=>(o&&console.warn("Error al eliminar archivos del storage:",o),l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",a)))),u(({error:o})=>{if(o)throw o}))}),d(e=>{throw console.error("Error al eliminar fotos del aviso:",e),e}))}subirFoto(a,e,s){let t=this.sanitizeFileName(e.name),i=`${a}/${Date.now()}_${t}`;return l(this.supabase.storage.from("fotos-avisos").upload(i,e)).pipe(u(({data:o,error:n})=>{if(n)throw console.error("Error al subir archivo a storage:",n),n.message==="Bucket not found"?new Error("El bucket de storage no est\xE1 configurado. Contacta al administrador."):n;let{data:r}=this.supabase.storage.from("fotos-avisos").getPublicUrl(i);return r.publicUrl}),v(o=>l(this.supabase.from("fotos_aviso").insert([{aviso_id:a,url:o,descripcion:s}]).select().single())),u(({data:o,error:n})=>{if(n)throw n;return o}),d(o=>{throw console.error("Error completo al subir foto:",o),o}))}eliminarFoto(a){return l(this.supabase.from("fotos_aviso").select("*").eq("id",a).single()).pipe(v(({data:e,error:s})=>{if(s)throw s;let t=e,i=t.url.split("/"),o=i[i.length-1],r=`${t.aviso_id}/${o}`;return l(this.supabase.storage.from("fotos-avisos").remove([r])).pipe(v(({error:c})=>(c&&console.warn("Error al eliminar archivo del storage:",c),l(this.supabase.from("fotos_aviso").delete().eq("id",a)))),u(({error:c})=>{if(c)throw c}))}),d(e=>{throw console.error("Error al eliminar foto:",e),e}))}buscarAvisos(a){return l(this.supabase.from("avisos").select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).or(`nombre_cliente_aviso.ilike.%${a}%,descripcion_problema.ilike.%${a}%`).neq("estado","Completado").limit(10)).pipe(u(({data:e,error:s})=>{if(s)throw s;return e}))}getAvisosActivos(a=1,e=10,s,t,i,o){return this.getAvisos(a,e,s,t,i,o,!1)}getAvisosCompletados(a=1,e=10,s,t,i){return this.getAvisos(a,e,s,t,i,"Completado",!0)}getAvisosActuales(){return this.avisosSubject.value}limpiarAvisos(){this.avisosSubject.next([])}sanitizeFileName(a){return a.replace(/[^a-zA-Z0-9.-]/g,"_").replace(/_{2,}/g,"_").replace(/^_+|_+$/g,"").toLowerCase()}crearFacturaDesdeTrabajos(a){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes(*),
                    trabajos:trabajos_realizados(
                        *,
                        materiales:materiales_trabajo(
                            *,
                            material:inventario(*)
                        ),
                        albaran:albaranes!trabajos_realizados_albaran_id_fkey(*)
                    )
                `).eq("id",a).single()).pipe(u(({data:e,error:s})=>{var n;if(s)throw s;let t=e,i=((n=t.trabajos)==null?void 0:n.filter(r=>{var c;return r.estado==="Finalizado"||((c=r.albaran)==null?void 0:c.estado_cierre)==="Finalizado"}))||[];if(i.length===0)throw new Error("No hay trabajos finalizados para facturar. Debes crear un albar\xE1n primero.");return{avisoId:t.id,cliente:t.cliente||{nombre_completo:t.nombre_cliente_aviso,direccion:t.direccion_cliente_aviso,email:"sin-email@ejemplo.com",cif:"Sin CIF"},trabajos:i,resumen:this.calcularResumenFacturacion(i)}}),d(e=>{throw console.error("Error al preparar factura desde trabajos:",e),e}))}calcularResumenFacturacion(a){let e=[],s=0;return a.forEach(t=>{var r;let i=new Date(`2000-01-01T${t.hora_inicio}`),n=(new Date(`2000-01-01T${t.hora_fin}`).getTime()-i.getTime())/(1e3*60*60);s+=Math.max(0,n),(r=t.materiales)==null||r.forEach(c=>{var p,m;let f=e.find(_=>_.material_id===c.material_id);f?f.cantidad_total+=c.cantidad_utilizada:e.push({material_id:c.material_id,nombre:((p=c.material)==null?void 0:p.nombre)||"Material desconocido",cantidad_total:c.cantidad_utilizada,precio_unitario:c.precio_neto_al_momento,descripcion:((m=c.material)==null?void 0:m.descripcion)||""})})}),{materiales:e,horasTotales:s,numeroTrabajos:a.length}}getResumenCompletoAviso(a){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(*),
                    albaranes:albaranes(
                        *,
                        repuestos_utilizados,
                        repuestos:repuestos_albaran(*)
                    ),
                    presupuestos:presupuestos(*),
                    facturas:facturas(*)
                `).eq("id",a).single()).pipe(u(({data:e,error:s})=>{var p,m,_,S,C,z,P;if(s)throw s;let t=e,i=((p=t.albaranes)==null?void 0:p.filter(h=>h.estado_cierre&&h.estado_cierre!=="Otra visita"))||[],o=((m=t.albaranes)==null?void 0:m.filter(h=>h.estado_cierre==="Presupuesto pendiente"))||[],n=((_=t.albaranes)==null?void 0:_.filter(h=>h.estado_cierre==="Otra visita"))||[],r=((S=t.facturas)==null?void 0:S.filter(h=>h.estado!=="Completado"))||[],c=o.length>0,f=n.length>0;return A(g({},t),{estadisticas:{totalAlbaranes:((C=t.albaranes)==null?void 0:C.length)||0,albaranesCerrados:i.length,albaranesPresupuestoPendiente:o.length,albaranesOtraVisita:n.length,tienePresupuesto:c,requiereOtraVisita:f,estadoPresupuesto:c?"Pendiente":null,totalFacturas:((z=t.facturas)==null?void 0:z.length)||0,facturasPendientes:r.length,totalTrabajos:((P=t.albaranes)==null?void 0:P.length)||0,trabajosConAlbaran:i.length,trabajosFinalizados:i.length,puedeFacturar:i.length>0&&r.length===0}})}),d(e=>{throw console.error("Error al obtener resumen completo:",e),e}))}actualizarEstadoAutomatico(a){return this.getResumenCompletoAviso(a).pipe(v(e=>{var t,i;let s=e.estado;return console.log("\u{1F50D} Analizando estado del aviso:",{estadoActual:e.estado,estadisticas:e.estadisticas,trabajos:((t=e.trabajos)==null?void 0:t.length)||0,albaranes:((i=e.albaranes)==null?void 0:i.length)||0}),e.estadisticas.trabajosFinalizados>0&&e.estadisticas.totalFacturas>0?s="Completado":e.estadisticas.trabajosFinalizados>0&&e.estadisticas.facturasPendientes===0?s="Listo para facturar":e.estadisticas.trabajosPresupuestoPendiente>0?s="Pendiente de presupuesto":e.estadisticas.trabajosOtraVisita>0?s="Otra visita requerida":e.estadisticas.trabajosConAlbaran>0&&e.estadisticas.tienePresupuesto?s="Pendiente de presupuesto":e.estadisticas.trabajosConAlbaran>0||e.estadisticas.totalTrabajos>0?s="En curso":e.estadisticas.totalTrabajos===0&&e.estadisticas.trabajosConAlbaran===0&&(e.estado==="Pendiente"?s=e.estado:s="Pendiente"),console.log("\u{1F50D} Estado calculado:",{estadoAnterior:e.estado,estadoNuevo:s,cambio:e.estado!==s}),s!==e.estado?(console.log(`\u{1F504} Actualizando estado del aviso ${a} de "${e.estado}" a "${s}"`),this.actualizarAviso(a,{estado:s})):l([e])}))}};b.\u0275fac=function(e){return new(e||b)(w($),w(x))},b.\u0275prov=q({token:b,factory:b.\u0275fac,providedIn:"root"});let j=b;return j})();export{k as a};

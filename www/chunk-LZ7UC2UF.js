import{a as x}from"./chunk-F6DTYNTW.js";import{b as $}from"./chunk-QYHMYRPA.js";import{C as F,F as w,c as C,e as l,j as u,q as f,w as h}from"./chunk-JSLDYZN7.js";import{a as g,b as j}from"./chunk-CRC5ZNR6.js";var T=(()=>{let b=class b{constructor(e,a){this.supabaseClientService=e,this.cacheService=a,this.avisosSubject=new C([]),this.avisos$=this.avisosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}debugConnection(){return console.log("\u{1F50D} AvisosService: Probando conexi\xF3n b\xE1sica..."),l(this.supabase.from("avisos").select("id").limit(1)).pipe(u(({data:e,error:a})=>{if(a)throw console.error("\u274C AvisosService: Error en conexi\xF3n:",a),a;return console.log("\u2705 AvisosService: Conexi\xF3n exitosa, datos:",e),{success:!0,data:e}}),f(e=>(console.error("\u274C AvisosService: Error cr\xEDtico:",e),l(Promise.resolve({success:!1,error:e})))))}getAvisos(e=1,a=15,s,t,i,o,n=!1){let r=this.supabase.from("avisos").select(`
                id,
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
            `,{count:"exact"});s&&(r=r.or(`nombre_cliente_aviso.ilike.%${s}%,descripcion_problema.ilike.%${s}%`)),o?r=r.eq("estado",o):n||(r=r.neq("estado","Completado"));let c=(e-1)*a;return r=r.range(c,c+a-1).order(t||"fecha_creacion",{ascending:i==="asc"}),l(r).pipe(u(({data:d,error:v,count:m})=>{if(v)throw v;let _=d;return this.avisosSubject.next(_),{avisos:_,total:m||0,pagina:e,por_pagina:a}}),f(d=>{throw console.error("Error al obtener avisos:",d),d}))}getAviso(e){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes!inner(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(id, url, descripcion, fecha_subida)
                `).eq("id",e).single()).pipe(u(({data:a,error:s})=>{if(s)throw s;return a}),f(a=>{throw console.error("Error al obtener aviso:",a),a}))}crearAviso(e){let a=j(g({},e),{urgencia:e.es_urgente?"Alta":"Normal",fecha_creacion:new Date().toISOString(),estado:"No visitado",requiere_presupuesto:!1,requiere_nueva_visita:!1});return l(this.supabase.from("avisos").insert([a]).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(u(({data:s,error:t})=>{if(t)throw t;let i=s,o=this.avisosSubject.value;return this.avisosSubject.next([i,...o]),this.cacheService.clearCache("avisos"),i}))}actualizarAviso(e,a){let s=j(g({},a),{fecha_actualizacion:new Date().toISOString()});return l(this.supabase.from("avisos").update(s).eq("id",e).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(u(({data:t,error:i})=>{if(i)throw i;let o=t,n=this.avisosSubject.value,r=n.findIndex(c=>c.id===e);return r!==-1&&(n[r]=o,this.avisosSubject.next([...n])),this.cacheService.clearCache("avisos"),o}))}eliminarAviso(e){return l(this.supabase.from("avisos").delete().eq("id",e)).pipe(u(({error:a})=>{if(a)throw a;let t=this.avisosSubject.value.filter(i=>i.id!==e);this.avisosSubject.next(t),this.cacheService.clearCache("avisos")}),f(a=>{if(a.code==="23503"&&a.message.includes("fotos_aviso"))return this.eliminarFotosAviso(e).pipe(h(()=>l(this.supabase.from("avisos").delete().eq("id",e))),u(({error:s})=>{if(s)throw s;let i=this.avisosSubject.value.filter(o=>o.id!==e);this.avisosSubject.next(i),this.cacheService.clearCache("avisos")}));throw a}))}eliminarFotosAviso(e){return l(this.supabase.from("fotos_aviso").select("*").eq("aviso_id",e)).pipe(h(({data:a,error:s})=>{if(s)throw s;let t=a;if(t.length===0)return l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",e)).pipe(u(({error:o})=>{if(o)throw o}));let i=t.map(o=>{let n=o.url.split("/"),r=n[n.length-1];return`${e}/${r}`});return l(this.supabase.storage.from("fotos-avisos").remove(i)).pipe(h(({error:o})=>(o&&console.warn("Error al eliminar archivos del storage:",o),l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",e)))),u(({error:o})=>{if(o)throw o}))}),f(a=>{throw console.error("Error al eliminar fotos del aviso:",a),a}))}subirFoto(e,a,s){let t=this.sanitizeFileName(a.name),i=`${e}/${Date.now()}_${t}`;return l(this.supabase.storage.from("fotos-avisos").upload(i,a)).pipe(u(({data:o,error:n})=>{if(n)throw console.error("Error al subir archivo a storage:",n),n.message==="Bucket not found"?new Error("El bucket de storage no est\xE1 configurado. Contacta al administrador."):n;let{data:r}=this.supabase.storage.from("fotos-avisos").getPublicUrl(i);return r.publicUrl}),h(o=>l(this.supabase.from("fotos_aviso").insert([{aviso_id:e,url:o,descripcion:s}]).select().single())),u(({data:o,error:n})=>{if(n)throw n;return o}),f(o=>{throw console.error("Error completo al subir foto:",o),o}))}eliminarFoto(e){return l(this.supabase.from("fotos_aviso").select("*").eq("id",e).single()).pipe(h(({data:a,error:s})=>{if(s)throw s;let t=a,i=t.url.split("/"),o=i[i.length-1],r=`${t.aviso_id}/${o}`;return l(this.supabase.storage.from("fotos-avisos").remove([r])).pipe(h(({error:c})=>(c&&console.warn("Error al eliminar archivo del storage:",c),l(this.supabase.from("fotos_aviso").delete().eq("id",e)))),u(({error:c})=>{if(c)throw c}))}),f(a=>{throw console.error("Error al eliminar foto:",a),a}))}buscarAvisos(e){return l(this.supabase.from("avisos").select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).or(`nombre_cliente_aviso.ilike.%${e}%,descripcion_problema.ilike.%${e}%`).neq("estado","Completado").limit(10)).pipe(u(({data:a,error:s})=>{if(s)throw s;return a}))}getAvisosActivos(e=1,a=10,s,t,i,o){return this.getAvisos(e,a,s,t,i,o,!1)}getAvisosCompletados(e=1,a=10,s,t,i){return this.getAvisos(e,a,s,t,i,"Completado",!0)}getAvisosActuales(){return this.avisosSubject.value}limpiarAvisos(){this.avisosSubject.next([])}sanitizeFileName(e){return e.replace(/[^a-zA-Z0-9.-]/g,"_").replace(/_{2,}/g,"_").replace(/^_+|_+$/g,"").toLowerCase()}crearFacturaDesdeTrabajos(e){return l(this.supabase.from("avisos").select(`
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
                `).eq("id",e).single()).pipe(u(({data:a,error:s})=>{var n;if(s)throw s;let t=a,i=((n=t.trabajos)==null?void 0:n.filter(r=>{var c;return r.estado==="Finalizado"||((c=r.albaran)==null?void 0:c.estado_cierre)==="Finalizado"}))||[];if(i.length===0)throw new Error("No hay trabajos finalizados para facturar. Debes crear un albar\xE1n primero.");return{avisoId:t.id,cliente:t.cliente||{nombre_completo:t.nombre_cliente_aviso,direccion:t.direccion_cliente_aviso,email:"sin-email@ejemplo.com",cif:"Sin CIF"},trabajos:i,resumen:this.calcularResumenFacturacion(i)}}),f(a=>{throw console.error("Error al preparar factura desde trabajos:",a),a}))}calcularResumenFacturacion(e){let a=[],s=0;return e.forEach(t=>{var r;let i=new Date(`2000-01-01T${t.hora_inicio}`),n=(new Date(`2000-01-01T${t.hora_fin}`).getTime()-i.getTime())/(1e3*60*60);s+=Math.max(0,n),(r=t.materiales)==null||r.forEach(c=>{var v,m;let d=a.find(_=>_.material_id===c.material_id);d?d.cantidad_total+=c.cantidad_utilizada:a.push({material_id:c.material_id,nombre:((v=c.material)==null?void 0:v.nombre)||"Material desconocido",cantidad_total:c.cantidad_utilizada,precio_unitario:c.precio_neto_al_momento,descripcion:((m=c.material)==null?void 0:m.descripcion)||""})})}),{materiales:a,horasTotales:s,numeroTrabajos:e.length}}getResumenCompletoAviso(e){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(*),
                                           trabajos:trabajos_realizados(
                           *,
                           materiales:materiales_trabajo(
                               *,
                               material:inventario(*)
                           ),
                           albaran:albaranes!trabajos_realizados_albaran_id_fkey(*)
                       ),
                    albaranes:albaranes(*),
                    presupuestos:presupuestos(*),
                    facturas:facturas(*)
                `).eq("id",e).single()).pipe(u(({data:a,error:s})=>{var c,d,v,m,_,S;if(s)throw s;let t=a,i=((c=t.trabajos)==null?void 0:c.filter(p=>{var z;return p.estado==="Finalizado"||((z=p.albaran)==null?void 0:z.estado_cierre)==="Finalizado"}))||[],o=((d=t.trabajos)==null?void 0:d.filter(p=>p.albaran_id!==null))||[],n=((v=t.facturas)==null?void 0:v.filter(p=>p.estado!=="Completado"))||[],r=((m=t.albaranes)==null?void 0:m.some(p=>p.estado_cierre==="Presupuesto pendiente"))||!1;return j(g({},t),{estadisticas:{totalTrabajos:((_=t.trabajos)==null?void 0:_.length)||0,trabajosConAlbaran:o.length,trabajosFinalizados:i.length,tienePresupuesto:r,estadoPresupuesto:r?"Pendiente":null,totalFacturas:((S=t.facturas)==null?void 0:S.length)||0,facturasPendientes:n.length,puedeFacturar:i.length>0&&n.length===0}})}),f(a=>{throw console.error("Error al obtener resumen completo:",a),a}))}actualizarEstadoAutomatico(e){return this.getResumenCompletoAviso(e).pipe(h(a=>{var t,i;let s=a.estado;return console.log("\u{1F50D} Analizando estado del aviso:",{estadoActual:a.estado,estadisticas:a.estadisticas,trabajos:((t=a.trabajos)==null?void 0:t.length)||0,albaranes:((i=a.albaranes)==null?void 0:i.length)||0}),a.estadisticas.trabajosFinalizados>0&&a.estadisticas.totalFacturas>0?s="Completado":a.estadisticas.trabajosFinalizados>0&&a.estadisticas.facturasPendientes===0?s="Listo para facturar":a.estadisticas.trabajosConAlbaran>0&&a.estadisticas.tienePresupuesto?s="Pendiente de presupuesto":a.estadisticas.trabajosConAlbaran>0||a.estadisticas.totalTrabajos>0?s="En curso":a.estadisticas.totalTrabajos===0&&a.estadisticas.trabajosConAlbaran===0&&(a.estado==="No visitado"||a.estado==="Pendiente"?s=a.estado:s="Pendiente"),console.log("\u{1F50D} Estado calculado:",{estadoAnterior:a.estado,estadoNuevo:s,cambio:a.estado!==s}),s!==a.estado?(console.log(`\u{1F504} Actualizando estado del aviso ${e} de "${a.estado}" a "${s}"`),this.actualizarAviso(e,{estado:s})):l([a])}))}};b.\u0275fac=function(a){return new(a||b)(w($),w(x))},b.\u0275prov=F({token:b,factory:b.\u0275fac,providedIn:"root"});let A=b;return A})();export{T as a};

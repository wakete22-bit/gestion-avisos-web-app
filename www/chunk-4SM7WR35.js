import{a as N}from"./chunk-N55KPTHA.js";import{D,G as S,Sc as O,d as E,f as l,k as d,r as p,x as b}from"./chunk-EYPZOMIL.js";import{a as j,b as A}from"./chunk-CRC5ZNR6.js";var I=(()=>{let h=class h{constructor(a,e){this.supabaseClientService=a,this.cacheService=e,this.avisosSubject=new E([]),this.avisos$=this.avisosSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}debugConnection(){return console.log("\u{1F50D} AvisosService: Probando conexi\xF3n b\xE1sica..."),l(this.supabase.from("avisos").select("id").limit(1)).pipe(d(({data:a,error:e})=>{if(e)throw console.error("\u274C AvisosService: Error en conexi\xF3n:",e),e;return console.log("\u2705 AvisosService: Conexi\xF3n exitosa, datos:",a),{success:!0,data:a}}),p(a=>(console.error("\u274C AvisosService: Error cr\xEDtico:",a),l(Promise.resolve({success:!1,error:a})))))}getAvisos(a=1,e=15,s,t,o,i,n=!1){let r=this.supabase.from("avisos").select(`
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
            `,{count:"exact"});s&&(r=r.or(`nombre_cliente_aviso.ilike.%${s}%,descripcion_problema.ilike.%${s}%`)),i?r=r.eq("estado",i):n||(r=r.neq("estado","Completado"));let c=(a-1)*e;return r=r.range(c,c+e-1).order(t||"fecha_creacion",{ascending:o==="asc"}),l(r).pipe(d(({data:f,error:_,count:m})=>{if(_)throw _;let g=f;return this.avisosSubject.next(g),{avisos:g,total:m||0,pagina:a,por_pagina:e}}),p(f=>{throw console.error("Error al obtener avisos:",f),f}))}getAviso(a){return l(this.supabase.from("avisos").select(`
                    *,
                    cliente:clientes!inner(*),
                    tecnico_asignado:usuarios(*),
                    fotos:fotos_aviso(id, url, descripcion, fecha_subida)
                `).eq("id",a).single()).pipe(d(({data:e,error:s})=>{if(s)throw s;return e}),p(e=>{throw console.error("Error al obtener aviso:",e),e}))}crearAviso(a){let e=A(j({},a),{urgencia:a.es_urgente?"Alta":"Normal",fecha_creacion:new Date().toISOString(),estado:"No visitado",requiere_presupuesto:!1,requiere_nueva_visita:!1});return l(this.supabase.from("avisos").insert([e]).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(d(({data:s,error:t})=>{if(t)throw t;let o=s,i=this.avisosSubject.value;return this.avisosSubject.next([o,...i]),this.cacheService.clearCache("avisos"),o}))}actualizarAviso(a,e){let s=A(j({},e),{fecha_actualizacion:new Date().toISOString()});return l(this.supabase.from("avisos").update(s).eq("id",a).select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).single()).pipe(d(({data:t,error:o})=>{if(o)throw o;let i=t,n=this.avisosSubject.value,r=n.findIndex(c=>c.id===a);return r!==-1&&(n[r]=i,this.avisosSubject.next([...n])),this.cacheService.clearCache("avisos"),i}))}eliminarAviso(a){return l(this.supabase.from("avisos").delete().eq("id",a)).pipe(d(({error:e})=>{if(e)throw e;let t=this.avisosSubject.value.filter(o=>o.id!==a);this.avisosSubject.next(t),this.cacheService.clearCache("avisos")}),p(e=>{if(e.code==="23503"&&e.message.includes("fotos_aviso"))return this.eliminarFotosAviso(a).pipe(b(()=>l(this.supabase.from("avisos").delete().eq("id",a))),d(({error:s})=>{if(s)throw s;let o=this.avisosSubject.value.filter(i=>i.id!==a);this.avisosSubject.next(o),this.cacheService.clearCache("avisos")}));throw e}))}eliminarFotosAviso(a){return l(this.supabase.from("fotos_aviso").select("*").eq("aviso_id",a)).pipe(b(({data:e,error:s})=>{if(s)throw s;let t=e;if(t.length===0)return l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",a)).pipe(d(({error:i})=>{if(i)throw i}));let o=t.map(i=>{let n=i.url.split("/"),r=n[n.length-1];return`${a}/${r}`});return l(this.supabase.storage.from("fotos-avisos").remove(o)).pipe(b(({error:i})=>(i&&console.warn("Error al eliminar archivos del storage:",i),l(this.supabase.from("fotos_aviso").delete().eq("aviso_id",a)))),d(({error:i})=>{if(i)throw i}))}),p(e=>{throw console.error("Error al eliminar fotos del aviso:",e),e}))}subirFoto(a,e,s){let t=this.sanitizeFileName(e.name),o=`${a}/${Date.now()}_${t}`;return l(this.supabase.storage.from("fotos-avisos").upload(o,e)).pipe(d(({data:i,error:n})=>{if(n)throw console.error("Error al subir archivo a storage:",n),n.message==="Bucket not found"?new Error("El bucket de storage no est\xE1 configurado. Contacta al administrador."):n;let{data:r}=this.supabase.storage.from("fotos-avisos").getPublicUrl(o);return r.publicUrl}),b(i=>l(this.supabase.from("fotos_aviso").insert([{aviso_id:a,url:i,descripcion:s}]).select().single())),d(({data:i,error:n})=>{if(n)throw n;return i}),p(i=>{throw console.error("Error completo al subir foto:",i),i}))}eliminarFoto(a){return l(this.supabase.from("fotos_aviso").select("*").eq("id",a).single()).pipe(b(({data:e,error:s})=>{if(s)throw s;let t=e,o=t.url.split("/"),i=o[o.length-1],r=`${t.aviso_id}/${i}`;return l(this.supabase.storage.from("fotos-avisos").remove([r])).pipe(b(({error:c})=>(c&&console.warn("Error al eliminar archivo del storage:",c),l(this.supabase.from("fotos_aviso").delete().eq("id",a)))),d(({error:c})=>{if(c)throw c}))}),p(e=>{throw console.error("Error al eliminar foto:",e),e}))}buscarAvisos(a){return l(this.supabase.from("avisos").select(`
          *,
          cliente:clientes(*),
          tecnico_asignado:usuarios(*),
          fotos:fotos_aviso(*)
        `).or(`nombre_cliente_aviso.ilike.%${a}%,descripcion_problema.ilike.%${a}%`).neq("estado","Completado").limit(10)).pipe(d(({data:e,error:s})=>{if(s)throw s;return e}))}getAvisosActivos(a=1,e=10,s,t,o,i){return this.getAvisos(a,e,s,t,o,i,!1)}getAvisosCompletados(a=1,e=10,s,t,o){return this.getAvisos(a,e,s,t,o,"Completado",!0)}getAvisosActuales(){return this.avisosSubject.value}limpiarAvisos(){this.avisosSubject.next([])}sanitizeFileName(a){return a.replace(/[^a-zA-Z0-9.-]/g,"_").replace(/_{2,}/g,"_").replace(/^_+|_+$/g,"").toLowerCase()}crearFacturaDesdeTrabajos(a){return l(this.supabase.from("avisos").select(`
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
                `).eq("id",a).single()).pipe(d(({data:e,error:s})=>{var n;if(s)throw s;let t=e,o=((n=t.trabajos)==null?void 0:n.filter(r=>{var c;return r.estado==="Finalizado"||((c=r.albaran)==null?void 0:c.estado_cierre)==="Finalizado"}))||[];if(o.length===0)throw new Error("No hay trabajos finalizados para facturar. Debes crear un albar\xE1n primero.");return{avisoId:t.id,cliente:t.cliente||{nombre_completo:t.nombre_cliente_aviso,direccion:t.direccion_cliente_aviso,email:"sin-email@ejemplo.com",cif:"Sin CIF"},trabajos:o,resumen:this.calcularResumenFacturacion(o)}}),p(e=>{throw console.error("Error al preparar factura desde trabajos:",e),e}))}calcularResumenFacturacion(a){let e=[],s=0;return a.forEach(t=>{var r;let o=new Date(`2000-01-01T${t.hora_inicio}`),n=(new Date(`2000-01-01T${t.hora_fin}`).getTime()-o.getTime())/(1e3*60*60);s+=Math.max(0,n),(r=t.materiales)==null||r.forEach(c=>{var _,m;let f=e.find(g=>g.material_id===c.material_id);f?f.cantidad_total+=c.cantidad_utilizada:e.push({material_id:c.material_id,nombre:((_=c.material)==null?void 0:_.nombre)||"Material desconocido",cantidad_total:c.cantidad_utilizada,precio_unitario:c.precio_neto_al_momento,descripcion:((m=c.material)==null?void 0:m.descripcion)||""})})}),{materiales:e,horasTotales:s,numeroTrabajos:a.length}}getResumenCompletoAviso(a){return l(this.supabase.from("avisos").select(`
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
                    albaranes:albaranes(
                        *,
                        repuestos_utilizados
                    ),
                    presupuestos:presupuestos(*),
                    facturas:facturas(*)
                `).eq("id",a).single()).pipe(d(({data:e,error:s})=>{var m,g,z,C,F,P,q,$,x;if(s)throw s;let t=e,o=((m=t.trabajos)==null?void 0:m.filter(u=>{var v;return u.estado==="Finalizado"||((v=u.albaran)==null?void 0:v.estado_cierre)==="Finalizado"}))||[],i=((g=t.trabajos)==null?void 0:g.filter(u=>u.albaran_id!==null))||[],n=((z=t.trabajos)==null?void 0:z.filter(u=>{var v;return u.estado==="Presupuesto pendiente"||((v=u.albaran)==null?void 0:v.estado_cierre)==="Presupuesto pendiente"}))||[],r=((C=t.trabajos)==null?void 0:C.filter(u=>{var v;return u.estado==="Otra visita"||((v=u.albaran)==null?void 0:v.estado_cierre)==="Otra visita"}))||[],c=((F=t.facturas)==null?void 0:F.filter(u=>u.estado!=="Completado"))||[],f=((P=t.albaranes)==null?void 0:P.some(u=>u.estado_cierre==="Presupuesto pendiente"))||!1,_=((q=t.albaranes)==null?void 0:q.some(u=>u.estado_cierre==="Otra visita"))||!1;return A(j({},t),{estadisticas:{totalTrabajos:(($=t.trabajos)==null?void 0:$.length)||0,trabajosConAlbaran:i.length,trabajosFinalizados:o.length,trabajosPresupuestoPendiente:n.length,trabajosOtraVisita:r.length,tienePresupuesto:f,requiereOtraVisita:_,estadoPresupuesto:f?"Pendiente":null,totalFacturas:((x=t.facturas)==null?void 0:x.length)||0,facturasPendientes:c.length,puedeFacturar:o.length>0&&c.length===0}})}),p(e=>{throw console.error("Error al obtener resumen completo:",e),e}))}actualizarEstadoAutomatico(a){return this.getResumenCompletoAviso(a).pipe(b(e=>{var t,o;let s=e.estado;return console.log("\u{1F50D} Analizando estado del aviso:",{estadoActual:e.estado,estadisticas:e.estadisticas,trabajos:((t=e.trabajos)==null?void 0:t.length)||0,albaranes:((o=e.albaranes)==null?void 0:o.length)||0}),e.estadisticas.trabajosFinalizados>0&&e.estadisticas.totalFacturas>0?s="Completado":e.estadisticas.trabajosFinalizados>0&&e.estadisticas.facturasPendientes===0?s="Listo para facturar":e.estadisticas.trabajosPresupuestoPendiente>0?s="Pendiente de presupuesto":e.estadisticas.trabajosOtraVisita>0?s="Otra visita requerida":e.estadisticas.trabajosConAlbaran>0&&e.estadisticas.tienePresupuesto?s="Pendiente de presupuesto":e.estadisticas.trabajosConAlbaran>0||e.estadisticas.totalTrabajos>0?s="En curso":e.estadisticas.totalTrabajos===0&&e.estadisticas.trabajosConAlbaran===0&&(e.estado==="No visitado"||e.estado==="Pendiente"?s=e.estado:s="Pendiente"),console.log("\u{1F50D} Estado calculado:",{estadoAnterior:e.estado,estadoNuevo:s,cambio:e.estado!==s}),s!==e.estado?(console.log(`\u{1F504} Actualizando estado del aviso ${a} de "${e.estado}" a "${s}"`),this.actualizarAviso(a,{estado:s})):l([e])}))}};h.\u0275fac=function(e){return new(e||h)(S(O),S(N))},h.\u0275prov=D({token:h,factory:h.\u0275fac,providedIn:"root"});let w=h;return w})();export{I as a};

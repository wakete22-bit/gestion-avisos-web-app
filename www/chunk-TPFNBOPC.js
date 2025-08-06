import{b as $}from"./chunk-EZQHEP6E.js";import{B as D,E as q,c as I,e as c,i as u,p as S,v as p,x}from"./chunk-YCXETNVK.js";import{a as _,b as v,d as F}from"./chunk-CRC5ZNR6.js";var z=(()=>{let m=class m{constructor(e){this.supabaseClientService=e,this.facturasSubject=new I([]),this.facturas$=this.facturasSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}getFacturas(e=1,t=10,a,s,i,r){let o=this.supabase.from("facturas").select(`
        *,
        cliente:clientes(*),
        aviso:avisos(*)
      `,{count:"exact"});a&&(o=o.or(`numero_factura.ilike.%${a}%,nombre_cliente.ilike.%${a}%`)),r&&(o=o.eq("estado",r));let f=(e-1)*t;return o=o.range(f,f+t-1).order(s||"fecha_creacion",{ascending:i==="asc"}),c(o).pipe(u(({data:l,error:d,count:n})=>{if(d)throw d;let h=l;return this.facturasSubject.next(h),{facturas:h,total:n||0,pagina:e,por_pagina:t}}),S(l=>{throw console.error("Error al obtener facturas:",l),l}))}getFactura(e){return c(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("id",e).single()).pipe(p(({data:t,error:a})=>{if(a)throw a;return c(this.supabase.from("lineas_factura").select("*").eq("factura_id",e).order("fecha_creacion",{ascending:!0})).pipe(u(({data:s,error:i})=>{if(i)throw i;return{factura:t,lineas:s}}))}))}crearFactura(e){let i=e,{lineas:t}=i,a=F(i,["lineas"]),s=v(_({},a),{fecha_creacion:new Date().toISOString(),fecha_actualizacion:new Date().toISOString()});return c(this.supabase.from("facturas").insert([s]).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(p(({data:r,error:o})=>{if(o){if(o.code==="23505"&&o.message.includes("numero_factura"))return console.warn("N\xFAmero de factura duplicado, generando nuevo n\xFAmero..."),this.getSiguienteNumero().pipe(p(f=>{let l=v(_({},s),{numero_factura:f});return c(this.supabase.from("facturas").insert([l]).select(`
                      *,
                      cliente:clientes(*),
                      aviso:avisos(*)
                    `).single()).pipe(p(({data:d,error:n})=>{if(n)throw n;return this.procesarLineasFactura(d,t)}))}));throw o}return this.procesarLineasFactura(r,t)}))}procesarLineasFactura(e,t){if(!t||t.length===0){let s=this.facturasSubject.value;return this.facturasSubject.next([e,...s]),c([{factura:e,lineas:[]}])}let a=t.map(s=>v(_({},s),{factura_id:e.id,fecha_creacion:new Date().toISOString()}));return c(this.supabase.from("lineas_factura").insert(a).select()).pipe(u(({data:s,error:i})=>{if(i)throw i;let r=this.facturasSubject.value;return this.facturasSubject.next([e,...r]),{factura:e,lineas:s}}))}actualizarFactura(e,t){let r=t,{lineas:a}=r,s=F(r,["lineas"]),i=v(_({},s),{fecha_actualizacion:new Date().toISOString()});return c(this.supabase.from("facturas").update(i).eq("id",e).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(p(({data:o,error:f})=>{if(f)throw f;let l=o;return a?c(this.supabase.from("lineas_factura").delete().eq("factura_id",e)).pipe(p(({error:d})=>{if(d)throw d;if(a.length===0)return c([{factura:l,lineas:[]}]);let n=a.map(h=>v(_({},h),{factura_id:e,fecha_creacion:new Date().toISOString()}));return c(this.supabase.from("lineas_factura").insert(n).select()).pipe(u(({data:h,error:g})=>{if(g)throw g;let b=this.facturasSubject.value,j=b.findIndex(k=>k.id===e);return j!==-1&&(b[j]=l,this.facturasSubject.next([...b])),{factura:l,lineas:h}}))})):this.getFactura(e)}))}eliminarFactura(e){return c(this.supabase.from("lineas_factura").delete().eq("factura_id",e)).pipe(p(({error:t})=>{if(t)throw t;return c(this.supabase.from("facturas").delete().eq("id",e))}),u(({error:t})=>{if(t)throw t;let s=this.facturasSubject.value.filter(i=>i.id!==e);this.facturasSubject.next(s)}))}buscarFacturas(e){return c(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).or(`numero_factura.ilike.%${e}%,nombre_cliente.ilike.%${e}%`).limit(10)).pipe(u(({data:t,error:a})=>{if(a)throw a;return t}))}getFacturasPorEstado(e){return c(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("estado",e).order("fecha_creacion",{ascending:!1})).pipe(u(({data:t,error:a})=>{if(a)throw a;return t}))}getFacturasPorCliente(e){return c(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("cliente_id",e).order("fecha_creacion",{ascending:!1})).pipe(u(({data:t,error:a})=>{if(a)throw a;return t}))}getFacturasPorAviso(e){return c(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("aviso_id",e).order("fecha_creacion",{ascending:!1})).pipe(u(({data:t,error:a})=>{if(a)throw a;return t}))}cambiarEstado(e,t){return c(this.supabase.from("facturas").update({estado:t,fecha_actualizacion:new Date().toISOString()}).eq("id",e).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(u(({data:a,error:s})=>{if(s)throw s;let i=a,r=this.facturasSubject.value,o=r.findIndex(f=>f.id===e);return o!==-1&&(r[o]=i,this.facturasSubject.next([...r])),i}))}getSiguienteNumero(){return c(this.supabase.rpc("obtener_siguiente_numero_factura")).pipe(u(({data:e,error:t})=>t?(console.error("Error al obtener n\xFAmero de factura:",t),this.getSiguienteNumeroFallback()):e),S(e=>(console.error("Error en RPC, usando fallback:",e),this.getSiguienteNumeroFallback())))}getSiguienteNumeroFallback(){let e=new Date().getFullYear();return c(this.supabase.from("facturas").select("numero_factura").like("numero_factura",`F${e}-%`).order("numero_factura",{ascending:!1}).limit(1)).pipe(u(({data:t,error:a})=>{if(a)throw a;if(!t||t.length===0)return`F${e}-001`;let i=t[0].numero_factura.match(/F\d{4}-(\d{3})/);if(i){let r=parseInt(i[1])+1;return`F${e}-${r.toString().padStart(3,"0")}`}return`F${e}-001`}),x(()=>new Promise(t=>setTimeout(t,100))))}calcularTotales(e){let t=e.reduce((i,r)=>i+r.cantidad*r.precio_pvp,0),a=+(t*.21).toFixed(2),s=+(t+a).toFixed(2);return{subtotal:t,iva:a,total:s}}getFacturasActuales(){return this.facturasSubject.value}limpiarFacturas(){this.facturasSubject.next([])}crearFacturaDesdePresupuesto(e){return c(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          materiales:materiales_presupuesto(
            *,
            material:inventario(*)
          )
        `).eq("id",e).single()).pipe(p(({data:t,error:a})=>{if(a)throw a;let s=t;if(s.estado!=="Completado")throw new Error("Solo se pueden facturar presupuestos aprobados");if(!s.aviso)throw new Error("El presupuesto no tiene un aviso asociado");return this.getSiguienteNumero().pipe(p(i=>{var d;let r=s.aviso.cliente,o={numero_factura:i,fecha_emision:new Date().toISOString().split("T")[0],cliente_id:r==null?void 0:r.id,nombre_cliente:(r==null?void 0:r.nombre_completo)||s.aviso.nombre_cliente_aviso,direccion_cliente:(r==null?void 0:r.direccion)||s.aviso.direccion_cliente_aviso,cif_cliente:(r==null?void 0:r.cif)||"Sin CIF",email_cliente:(r==null?void 0:r.email)||"sin-email@ejemplo.com",aviso_id:s.aviso_id,subtotal:0,iva:0,total:0,estado:"Pendiente",notas:`Factura generada desde presupuesto ${e}`,lineas:[]},f=((d=s.materiales)==null?void 0:d.map(n=>{var h,g,b;return{tipo:"repuesto",nombre:((h=n.material)==null?void 0:h.nombre)||"Material desconocido",cantidad:n.cantidad_estimada,precio_neto:((g=n.material)==null?void 0:g.precio_neto)||0,precio_pvp:n.precio_unitario_al_momento,descripcion:`Material del presupuesto: ${((b=n.material)==null?void 0:b.descripcion)||""}`}}))||[];s.horas_estimadas&&s.horas_estimadas>0&&f.push({tipo:"mano_obra",nombre:"Mano de obra",cantidad:s.horas_estimadas,precio_pvp:50,descripcion:`${s.horas_estimadas} horas de trabajo t\xE9cnico`}),o.lineas=f;let l=this.calcularTotales(f);return o.subtotal=l.subtotal,o.iva=l.iva,o.total=l.total,this.crearFactura(o).pipe(p(n=>c(this.supabase.from("presupuestos").update({estado:"Facturado",fecha_actualizacion:new Date().toISOString()}).eq("id",e)).pipe(u(()=>n))))}))}),S(t=>{throw console.error("Error al crear factura desde presupuesto:",t),t}))}getPresupuestosListosParaFacturar(){return c(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado","Completado").order("fecha_creacion",{ascending:!1})).pipe(u(({data:e,error:t})=>{if(t)throw t;return e||[]}))}};m.\u0275fac=function(t){return new(t||m)(q($))},m.\u0275prov=D({token:m,factory:m.\u0275fac,providedIn:"root"});let w=m;return w})();export{z as a};

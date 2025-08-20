import{a as x}from"./chunk-E2XHCINJ.js";import{D as I,G as j,Sc as D,d as N,f as o,k as l,r as g,x as d,z as C}from"./chunk-7PIWZYGA.js";import{a as v,b as _,d as F}from"./chunk-CRC5ZNR6.js";var z=(()=>{let b=class b{constructor(e,t){this.supabaseClientService=e,this.dataUpdateService=t,this.facturasSubject=new N([]),this.facturas$=this.facturasSubject.asObservable(),this.supabase=this.supabaseClientService.getClient()}getFacturas(e=1,t=10,s,a,r,i){let c=this.supabase.from("facturas").select(`
        *,
        cliente:clientes(*),
        aviso:avisos(*)
      `,{count:"exact"});s&&(c=c.or(`numero_factura.ilike.%${s}%,nombre_cliente.ilike.%${s}%`)),i&&(c=c.eq("estado",i));let f=(e-1)*t;return c=c.range(f,f+t-1).order(a||"fecha_creacion",{ascending:r==="asc"}),o(c).pipe(l(({data:u,error:h,count:n})=>{if(h)throw h;let m=u;return this.facturasSubject.next(m),{facturas:m,total:n||0,pagina:e,por_pagina:t}}),g(u=>{throw console.error("Error al obtener facturas:",u),u}))}getFactura(e){return o(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("id",e).single()).pipe(d(({data:t,error:s})=>{if(s)throw s;return o(this.supabase.from("lineas_factura").select("*").eq("factura_id",e).order("fecha_creacion",{ascending:!0})).pipe(l(({data:a,error:r})=>{if(r)throw r;return{factura:t,lineas:a}}))}))}crearFactura(e){let r=e,{lineas:t}=r,s=F(r,["lineas"]),a=_(v({},s),{subtotal:s.subtotal||0,iva:s.iva||0,total:s.total||0,fecha_creacion:new Date().toISOString(),fecha_actualizacion:new Date().toISOString()});return(isNaN(a.subtotal)||!isFinite(a.subtotal))&&(console.error("\u274C Subtotal inv\xE1lido:",a.subtotal),a.subtotal=0),(isNaN(a.iva)||!isFinite(a.iva))&&(console.error("\u274C IVA inv\xE1lido:",a.iva),a.iva=0),(isNaN(a.total)||!isFinite(a.total))&&(console.error("\u274C Total inv\xE1lido:",a.total),a.total=0),console.log("\u{1F4CB} Insertando factura con datos:",a),o(this.supabase.from("facturas").insert([a]).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(d(({data:i,error:c})=>{if(c){if(c.code==="23505"&&c.message.includes("numero_factura"))return console.warn("N\xFAmero de factura duplicado, generando nuevo n\xFAmero..."),this.getSiguienteNumero().pipe(d(f=>{let u=_(v({},a),{numero_factura:f});return o(this.supabase.from("facturas").insert([u]).select(`
                      *,
                      cliente:clientes(*),
                      aviso:avisos(*)
                    `).single()).pipe(d(({data:h,error:n})=>{if(n)throw n;return this.procesarLineasFactura(h,t)}))}));throw c}return this.procesarLineasFactura(i,t)}))}procesarLineasFactura(e,t){if(!t||t.length===0){let a=this.facturasSubject.value;return this.facturasSubject.next([e,...a]),this.dataUpdateService.notifyCreated("facturas"),o([{factura:e,lineas:[]}])}let s=t.map(a=>_(v({},a),{factura_id:e.id,fecha_creacion:new Date().toISOString()}));return o(this.supabase.from("lineas_factura").insert(s).select()).pipe(l(({data:a,error:r})=>{if(r)throw r;let i=this.facturasSubject.value;return this.facturasSubject.next([e,...i]),this.dataUpdateService.notifyCreated("facturas"),{factura:e,lineas:a}}))}actualizarFactura(e,t){let i=t,{lineas:s}=i,a=F(i,["lineas"]),r=_(v({},a),{fecha_actualizacion:new Date().toISOString()});return o(this.supabase.from("facturas").update(r).eq("id",e).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(d(({data:c,error:f})=>{if(f)throw f;let u=c;return s?o(this.supabase.from("lineas_factura").delete().eq("factura_id",e)).pipe(d(({error:h})=>{if(h)throw h;if(s.length===0)return o([{factura:u,lineas:[]}]);let n=s.map(m=>_(v({},m),{factura_id:e,fecha_creacion:new Date().toISOString()}));return o(this.supabase.from("lineas_factura").insert(n).select()).pipe(l(({data:m,error:p})=>{if(p)throw p;let w=this.facturasSubject.value,A=w.findIndex(q=>q.id===e);return A!==-1&&(w[A]=u,this.facturasSubject.next([...w])),this.dataUpdateService.notifyUpdated("facturas"),{factura:u,lineas:m}}))})):this.getFactura(e)}))}eliminarFactura(e){return o(this.supabase.from("lineas_factura").delete().eq("factura_id",e)).pipe(d(({error:t})=>{if(t)throw t;return o(this.supabase.from("facturas").delete().eq("id",e))}),l(({error:t})=>{if(t)throw t;let a=this.facturasSubject.value.filter(r=>r.id!==e);this.facturasSubject.next(a),this.dataUpdateService.notifyDeleted("facturas")}))}buscarFacturas(e){return o(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).or(`numero_factura.ilike.%${e}%,nombre_cliente.ilike.%${e}%`).limit(10)).pipe(l(({data:t,error:s})=>{if(s)throw s;return t}))}getFacturasPorEstado(e){return o(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("estado",e).order("fecha_creacion",{ascending:!1})).pipe(l(({data:t,error:s})=>{if(s)throw s;return t}))}getFacturasPorCliente(e){return o(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("cliente_id",e).order("fecha_creacion",{ascending:!1})).pipe(l(({data:t,error:s})=>{if(s)throw s;return t}))}getFacturasPorAviso(e){return o(this.supabase.from("facturas").select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).eq("aviso_id",e).order("fecha_creacion",{ascending:!1})).pipe(l(({data:t,error:s})=>{if(s)throw s;return t}))}cambiarEstado(e,t){return o(this.supabase.from("facturas").update({estado:t,fecha_actualizacion:new Date().toISOString()}).eq("id",e).select(`
          *,
          cliente:clientes(*),
          aviso:avisos(*)
        `).single()).pipe(l(({data:s,error:a})=>{if(a)throw a;let r=s,i=this.facturasSubject.value,c=i.findIndex(f=>f.id===e);return c!==-1&&(i[c]=r,this.facturasSubject.next([...i])),this.dataUpdateService.notifyUpdated("facturas"),r}))}getSiguienteNumero(){return o(this.supabase.rpc("obtener_siguiente_numero_factura")).pipe(l(({data:e,error:t})=>t?(console.error("Error al obtener n\xFAmero de factura:",t),this.getSiguienteNumeroFallback()):e),g(e=>(console.error("Error en RPC, usando fallback:",e),this.getSiguienteNumeroFallback())))}getSiguienteNumeroFallback(){let e=new Date().getFullYear();return o(this.supabase.from("facturas").select("numero_factura").like("numero_factura",`FAC-${e}-%`).order("numero_factura",{ascending:!1}).limit(1)).pipe(l(({data:t,error:s})=>{if(s)throw s;if(!t||t.length===0)return`FAC-${e}-001`;let r=t[0].numero_factura.match(/FAC-\d{4}-(\d{3})/);if(r){let i=parseInt(r[1])+1;return`FAC-${e}-${i.toString().padStart(3,"0")}`}return`FAC-${e}-001`}),C(()=>new Promise(t=>setTimeout(t,100))))}calcularTotales(e){if(!e||!Array.isArray(e)||e.length===0)return console.warn("\u26A0\uFE0F No hay l\xEDneas de factura para calcular totales"),{subtotal:0,iva:0,total:0};let t=e.reduce((r,i)=>{let c=i.cantidad||0,f=i.precio_pvp||0,u=c*f;return isNaN(u)||!isFinite(u)?(console.warn("\u26A0\uFE0F L\xEDnea con valores inv\xE1lidos:",i),r):r+u},0);if(isNaN(t)||!isFinite(t))return console.warn("\u26A0\uFE0F Subtotal calculado es inv\xE1lido, usando 0"),{subtotal:0,iva:0,total:0};let s=+(t*.21).toFixed(2),a=+(t+s).toFixed(2);return console.log("\u{1F9EE} C\xE1lculo de totales:",{lineas:e.length,subtotal:t,iva:s,total:a}),{subtotal:t,iva:s,total:a}}getFacturasActuales(){return this.facturasSubject.value}limpiarFacturas(){this.facturasSubject.next([])}crearFacturaDesdePresupuesto(e){return o(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          ),
          materiales_estimados
        `).eq("id",e).single()).pipe(d(({data:t,error:s})=>{if(s)throw s;let a=t;if(a.estado!=="Completado")throw new Error("Solo se pueden facturar presupuestos aprobados");if(!a.aviso)throw new Error("El presupuesto no tiene un aviso asociado");return this.getSiguienteNumero().pipe(d(r=>{let i=[];a.materiales_estimados&&Array.isArray(a.materiales_estimados)&&a.materiales_estimados.forEach(p=>{i.push({tipo:"repuesto",nombre:p.nombre||"Material desconocido",cantidad:p.cantidad||0,precio_neto:p.precio_neto||0,precio_pvp:p.precio_pvp||0,descripcion:`Material del presupuesto: ${p.descripcion||""}`})}),a.horas_estimadas&&a.horas_estimadas>0&&i.push({tipo:"mano_obra",nombre:"Mano de obra",cantidad:a.horas_estimadas,precio_pvp:50,descripcion:`${a.horas_estimadas} horas de trabajo t\xE9cnico`});let c=this.calcularTotales(i),f=c.subtotal||0,u=c.iva||0,h=c.total||0;console.log("\u{1F4CA} Totales calculados:",{subtotal:f,iva:u,total:h});let n=a.aviso.cliente,m={numero_factura:r,fecha_emision:new Date().toISOString().split("T")[0],cliente_id:n==null?void 0:n.id,nombre_cliente:(n==null?void 0:n.nombre_completo)||a.aviso.nombre_cliente_aviso||"Cliente",direccion_cliente:(n==null?void 0:n.direccion)||a.aviso.direccion_cliente_aviso||"Sin direcci\xF3n",cif_cliente:(n==null?void 0:n.cif)||"Sin CIF",email_cliente:(n==null?void 0:n.email)||"sin-email@ejemplo.com",aviso_id:a.aviso_id,subtotal:f,iva:u,total:h,estado:"Pendiente",notas:`Factura generada desde presupuesto ${e}`,lineas:i};return console.log("\u{1F4CB} Datos de factura a crear:",m),this.crearFactura(m).pipe(d(p=>o(this.supabase.from("presupuestos").update({estado:"Facturado",fecha_actualizacion:new Date().toISOString()}).eq("id",e)).pipe(l(()=>p))))}))}),g(t=>{throw console.error("Error al crear factura desde presupuesto:",t),t}))}getPresupuestosListosParaFacturar(){return o(this.supabase.from("presupuestos").select(`
          *,
          aviso:avisos(
            *,
            cliente:clientes(*)
          )
        `).eq("estado","Completado").order("fecha_creacion",{ascending:!1})).pipe(l(({data:e,error:t})=>{if(t)throw t;return e||[]}))}};b.\u0275fac=function(t){return new(t||b)(j(D),j(x))},b.\u0275prov=I({token:b,factory:b.\u0275fac,providedIn:"root"});let S=b;return S})();export{z as a};

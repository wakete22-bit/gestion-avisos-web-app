import{a as F}from"./chunk-RP6VPHKN.js";import{a as Z}from"./chunk-5ZJTCSBL.js";import{a as oo}from"./chunk-KYCVJEX4.js";import{F as Y,I as X,j as V,k}from"./chunk-4AY4VQCP.js";import{a as R,h as Q,k as j}from"./chunk-CRC5ZNR6.js";var B=Q(oo());var J=()=>new F,E={colores:{primario:[79,70,229],secundario:[107,114,128],exito:[39,194,108],texto:[17,24,39],fondo:[249,250,251]},fuentes:{titulo:20,subtitulo:16,normal:12,peque\u00F1o:10},m\u00E1rgenes:{izquierda:20,derecha:20,superior:20,inferior:20}},H=(P,$="normal")=>{P.setFont("helvetica"),P.setFontSize(E.fuentes[$]),$==="titulo"?P.setTextColor(E.colores.primario[0],E.colores.primario[1],E.colores.primario[2]):P.setTextColor(E.colores.texto[0],E.colores.texto[1],E.colores.texto[2])},q=(P,$,K,n,f)=>{P.setDrawColor(E.colores.secundario[0],E.colores.secundario[1],E.colores.secundario[2]),P.line($,K,n,f)};var so=(()=>{let $=class ${constructor(n){this.configuracionService=n}generarPdfFactura(n,f="factura.pdf"){return j(this,null,function*(){try{console.log("\u{1F527} Generando PDF de factura...");let l=yield(0,B.default)(n,{scale:2,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",width:n.offsetWidth,height:n.offsetHeight,scrollX:0,scrollY:0}),a=l.toDataURL("image/png"),b=new F("p","mm","a4"),i=210,d=295,t=l.height*i/l.width,o=t,c=0;for(b.addImage(a,"PNG",0,c,i,t),o-=d;o>=0;)c=o-t,b.addPage(),b.addImage(a,"PNG",0,c,i,t),o-=d;b.save(f),console.log("\u2705 PDF generado exitosamente:",f)}catch(l){throw console.error("\u274C Error al generar PDF:",l),l}})}generarPdfFacturaOptimizado(n,f="factura.pdf"){return j(this,null,function*(){try{console.log("\u{1F527} Generando PDF optimizado de factura...");let l=yield(0,B.default)(n,{scale:1.5,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",width:n.offsetWidth,height:n.offsetHeight,scrollX:0,scrollY:0,logging:!1,removeContainer:!0}),a=new F("p","mm","a4"),b=l.toDataURL("image/jpeg",.95),i=190,d=277,t=l.height*i/l.width,o=t,c=10;for(a.addImage(b,"JPEG",10,c,i,t),o-=d;o>=0;)c=o-t+10,a.addPage(),a.addImage(b,"JPEG",10,c,i,t),o-=d;a.save(f),console.log("\u2705 PDF optimizado generado exitosamente:",f)}catch(l){throw console.error("\u274C Error al generar PDF optimizado:",l),l}})}imprimirFacturaNativa(n,f="factura_imprimir.pdf"){return j(this,null,function*(){var l,a,b,i;try{console.log("\u{1F527} Imprimiendo factura nativa...");let d=new F("p","mm","a4"),t=d.internal.pageSize.getWidth(),o=d.internal.pageSize.getHeight(),c=15,s=t-c*2,e=c,y=(z,w,O,L,I,N)=>{d.setFillColor(N[0],N[1],N[2]),d.roundedRect(z,w,O,L,I,I,"F")},r=(z,w,O,L={})=>{let N=R(R({},{fontSize:12,fontStyle:"normal",color:[17,24,39],align:"left"}),L);d.setFontSize(N.fontSize),d.setFont("helvetica",N.fontStyle),d.setTextColor(N.color[0],N.color[1],N.color[2]),d.text(z,w,O,{align:N.align})},C=(z,w,O,L,I=[229,231,235])=>{d.setDrawColor(I[0],I[1],I[2]),d.line(z,w,O,L)};y(c,e,s,35,6,[79,70,229]),d.setFillColor(255,255,255),d.circle(c+20,e+17.5,12,"F"),r("FACTURA",t/2,e+22,{fontSize:28,fontStyle:"bold",color:[255,255,255],align:"center"}),e+=45;let v=c,u=t/2+5;r("DATOS DE LA EMPRESA",v,e,{fontSize:13,fontStyle:"bold",color:[79,70,229]}),e+=8,r("TECNICOS CLIMATIZACI\xD3N S.L.",v,e,{fontSize:11,fontStyle:"bold"}),e+=6,r("Calle de la Tecnolog\xEDa, 123",v,e,{fontSize:10}),e+=5,r("28001 Madrid, Espa\xF1a",v,e,{fontSize:10}),e+=5,r("CIF: B12345678",v,e,{fontSize:10}),e+=5,r("info@tecnicosclimatizacion.es",v,e,{fontSize:10}),e+=5,r("+34 91 123 45 67",v,e,{fontSize:10}),e=c+45,r("INFORMACI\xD3N DE LA FACTURA",u,e,{fontSize:13,fontStyle:"bold",color:[79,70,229]}),e+=8,r("N\xFAmero:",u,e,{fontSize:10,fontStyle:"bold"}),r(n.numero_factura||"N/A",u+25,e,{fontSize:10}),e+=6,r("Fecha de emisi\xF3n:",u,e,{fontSize:10,fontStyle:"bold"}),r(n.fecha_emision||"N/A",u+35,e,{fontSize:10}),e+=6,r("Estado:",u,e,{fontSize:10,fontStyle:"bold"}),r(n.estado||"Pendiente",u+20,e,{fontSize:10}),e+=20,r("DATOS DEL CLIENTE",c,e,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),e+=10;let g=50;y(c,e,s,g,6,[249,250,251]),C(c+10,e+25,t-c-10,e+25,[229,231,235]),r("Nombre:",c+15,e+12,{fontSize:10,fontStyle:"bold"}),r(n.nombre_cliente||"N/A",c+35,e+12,{fontSize:10}),r("Direcci\xF3n:",c+15,e+22,{fontSize:10,fontStyle:"bold"}),r(n.direccion_cliente||"N/A",c+35,e+22,{fontSize:10}),r("CIF:",c+15,e+32,{fontSize:10,fontStyle:"bold"}),r(n.cif_cliente||"N/A",c+35,e+32,{fontSize:10}),r("Email:",c+15,e+42,{fontSize:10,fontStyle:"bold"}),r(n.email_cliente||"N/A",c+35,e+42,{fontSize:10}),e+=g+20;let x=((l=n.lineas)==null?void 0:l.filter(z=>z.tipo==="repuesto"))||[];if(x.length>0){r("REPUESTOS UTILIZADOS",c,e,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),e+=10;let z=e;y(c,z,s,18,4,[79,70,229]);let w=c+8,O=c+100,L=c+140,I=c+170;r("DESCRIPCI\xD3N",w,z+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("CANT.",O,z+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("NETO",L,z+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("PVP",I,z+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),e+=22,x.forEach((_,U)=>{var G;let W=U%2===0?[255,255,255]:[249,250,251];y(c,e,s,15,2,W),r(_.nombre||"Sin nombre",w,e+10,{fontSize:9}),r(((G=_.cantidad)==null?void 0:G.toString())||"0",O,e+10,{fontSize:9}),r(`${_.precio_neto||0}\u20AC`,L,e+10,{fontSize:9}),r(`${_.precio_pvp||0}\u20AC`,I,e+10,{fontSize:9,color:[39,194,108]}),e+=15});let N=x.reduce((_,U)=>_+U.cantidad*U.precio_pvp,0);y(c,e,s,18,4,[79,70,229]),r("TOTAL REPUESTOS",w,e+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r(`${N.toFixed(2)}\u20AC`,I,e+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),e+=25}let A=((a=n.lineas)==null?void 0:a.filter(z=>z.tipo!=="repuesto"))||[];if(A.length>0){r("MANO DE OBRA Y DESPLAZAMIENTOS",c,e,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),e+=10;let z=e;y(c,z,s,18,4,[79,70,229]);let w=c+8,O=c+100,L=c+170;r("DESCRIPCI\xD3N",w,z+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("CANT.",O,z+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("PVP",L,z+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),e+=22,A.forEach((N,_)=>{var W;let U=_%2===0?[255,255,255]:[249,250,251];y(c,e,s,15,2,U),r(N.nombre||"Sin descripci\xF3n",w,e+10,{fontSize:9}),r(((W=N.cantidad)==null?void 0:W.toString())||"0",O,e+10,{fontSize:9}),r(`${N.precio_pvp||0}\u20AC`,L,e+10,{fontSize:9,color:[39,194,108]}),e+=15});let I=A.reduce((N,_)=>N+_.cantidad*_.precio_pvp,0);y(c,e,s,18,4,[79,70,229]),r("TOTAL SERVICIOS",w,e+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r(`${I.toFixed(2)}\u20AC`,L,e+12,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),e+=25}let S=(((b=n.lineas)==null?void 0:b.filter(z=>z.tipo!=="repuesto"))||[]).reduce((z,w)=>z+w.cantidad*w.precio_pvp,0),p=(((i=n.lineas)==null?void 0:i.filter(z=>z.tipo==="repuesto"))||[]).reduce((z,w)=>z+w.cantidad*w.precio_pvp,0),m=140,h=t-c-m;y(h,e,m,90,8,[238,242,255]),r("RESUMEN DE LA FACTURA",h+10,e+15,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),C(h+10,e+20,h+m-10,e+20,[79,70,229]),r("Subtotal:",h+10,e+35,{fontSize:11}),r(`${n.subtotal||0}\u20AC`,h+m-10,e+35,{fontSize:11,align:"right"}),r("IVA (${ivaPorcentaje}%):",h+10,e+50,{fontSize:11}),r(`${n.iva||0}\u20AC`,h+m-10,e+50,{fontSize:11,align:"right"}),C(h+10,e+60,h+m-10,e+60,[79,70,229]),r("TOTAL",h+10,e+75,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),r(`${n.total||0}\u20AC`,h+m-10,e+75,{fontSize:14,fontStyle:"bold",color:[79,70,229],align:"right"}),n.notas&&(e+=110,r("NOTAS ADICIONALES",c,e,{fontSize:13,fontStyle:"bold",color:[79,70,229]}),e+=10,y(c,e,s-150,30,6,[249,250,251]),r(n.notas,c+10,e+10,{fontSize:10})),e=o-40,C(c,e,t-c,e,[229,231,235]),e+=10,r("TECNICOS CLIMATIZACI\xD3N S.L.",c,e,{fontSize:10,fontStyle:"bold",color:[79,70,229]}),r("+34 91 123 45 67",t/2,e,{fontSize:10,color:[107,114,128],align:"center"}),r("info@tecnicosclimatizacion.es",t-c,e,{fontSize:10,color:[107,114,128],align:"right"}),e+=8,r("CIF: B12345678",c,e,{fontSize:9,color:[107,114,128]}),r("www.tecnicosclimatizacion.es",t-c,e,{fontSize:9,color:[107,114,128],align:"right"});let T=d.output("blob"),D=URL.createObjectURL(T),M=window.open(D,"_blank");M&&(M.onload=()=>{setTimeout(()=>{M.print(),URL.revokeObjectURL(D)},1e3)}),console.log("\u2705 Impresi\xF3n nativa iniciada")}catch(d){throw console.error("\u274C Error al imprimir factura nativa:",d),d}})}imprimirFactura(n){return j(this,null,function*(){try{console.log("\u{1F527} Imprimiendo factura...");let f=window.open("","_blank");if(!f)throw new Error("No se pudo abrir la ventana de impresi\xF3n");let l=n.cloneNode(!0);f.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Factura</title>
            <meta charset="utf-8">
            
        <style>
          @media print {
            body { margin: 0; padding: 0; }
            * { box-sizing: border-box; }
            .factura-preview { 
              width: 100% !important; 
              height: auto !important; 
              padding: 20px !important;
              border-radius: 0 !important;
            }
            .toggle-preview-btn { display: none !important; }
            .header-container .actions-preview { display: none !important; }
          }
        </style>
      
          </head>
          <body>
            ${l.outerHTML}
          </body>
        </html>
      `),f.document.close(),f.onload=()=>{f.print(),f.close()},console.log("\u2705 Impresi\xF3n iniciada")}catch(f){throw console.error("\u274C Error al imprimir factura:",f),f}})}generarPdfHtml(n,f="factura.pdf"){try{console.log("\u{1F527} Generando PDF con HTML/CSS..."),this.generarHtmlFactura(n).subscribe({next:l=>{let a=document.createElement("div");a.innerHTML=l,a.style.position="absolute",a.style.left="-9999px",a.style.top="0",a.style.width="794px",a.style.backgroundColor="white",a.style.padding="20px",a.style.boxSizing="border-box";let b=document.createElement("style");b.textContent=this.obtenerEstilosCss(),a.appendChild(b),document.body.appendChild(a),this.generarPdfDesdeElemento(a,f).finally(()=>{document.body.removeChild(a)})},error:l=>{throw console.error("\u274C Error al generar HTML de factura:",l),l}})}catch(l){throw console.error("\u274C Error al generar PDF con HTML:",l),l}}generarHtmlFactura(n){return k([this.configuracionService.getDatosEmpresa(),this.configuracionService.getIvaPorDefecto()]).pipe(V(([f,l])=>{let a=this.calcularSubtotal(n),b=a*(l/100),i=a+b;return`
      <div class="pdf-preview">
        <!-- Header Principal -->
        <div class="header-principal">
          <h1 class="titulo-factura">FACTURA</h1>
        </div>

        <!-- Informaci\xF3n B\xE1sica -->
        <div class="info-basica">
          <div class="numero-factura">N\xBA ${n.numero_factura||"N/A"}</div>
          <div class="fecha-factura">Fecha: ${this.formatearFecha(n.fecha_emision)||"N/A"}</div>
        </div>

        <!-- Datos de la Empresa -->
        <div class="seccion-empresa">
          <h2 class="titulo-seccion">DATOS DE LA EMPRESA</h2>
          <div class="datos-empresa">
            <div class="nombre-empresa">${(f==null?void 0:f.nombre_empresa)||"Mi Empresa"}</div>
            <div class="direccion-empresa">${(f==null?void 0:f.direccion)||"Direcci\xF3n no configurada"}</div>
            <div class="cif-empresa">CIF: ${(f==null?void 0:f.cif)||"Sin CIF"}</div>
            <div class="telefono-empresa">Tel: ${(f==null?void 0:f.telefono)||"Sin tel\xE9fono"}</div>
            <div class="email-empresa">${(f==null?void 0:f.email)||"sin-email@empresa.com"}</div>
            ${f!=null&&f.web?`<div class="web-empresa">${f.web}</div>`:""}
          </div>
        </div>

        <!-- Datos del Cliente -->
        <div class="seccion-cliente">
          <h2 class="titulo-seccion">DATOS DEL CLIENTE</h2>
          <div class="datos-cliente">
            <div>Nombre: ${n.nombre_cliente||"N/A"}</div>
            <div>Direcci\xF3n: ${n.direccion_cliente||"N/A"}</div>
            <div>CIF: ${n.cif_cliente||"N/A"}</div>
            <div>Email: ${n.email_cliente||"N/A"}</div>
          </div>
        </div>

        <!-- Tabla de Servicios -->
        <div class="seccion-servicios" ${n.lineas&&n.lineas.length>0?"":'style="display: none;"'}>
          <div class="tabla-header">
            <div class="col-descripcion">DESCRIPCI\xD3N</div>
            <div class="col-cantidad">CANT.</div>
            <div class="col-precio">PRECIO</div>
            <div class="col-total">TOTAL</div>
          </div>
          
          <div class="linea-separadora"></div>
          
          <div class="tabla-body">
            ${n.lineas?n.lineas.map(d=>`
              <div class="fila-servicio">
                <div class="col-descripcion">${d.nombre||"Sin descripci\xF3n"}</div>
                <div class="col-cantidad">${d.cantidad||"0"}</div>
                <div class="col-precio">${this.formatearMoneda(d.precio_pvp||0)}</div>
                <div class="col-total">${this.formatearMoneda((d.cantidad||0)*(d.precio_pvp||0))}</div>
              </div>
            `).join(""):""}
          </div>
          
          <div class="linea-separadora"></div>
        </div>

        <!-- Caja de Totales -->
        <div class="caja-totales" ${n.lineas&&n.lineas.length>0?"":'style="display: none;"'}>
          <div class="caja-totales-inner">
            <div class="titulo-caja">RESUMEN</div>
            <div class="linea-separadora-caja"></div>
            
            <div class="fila-total">
              <span class="etiqueta-total">Subtotal:</span>
              <span class="valor-total">${this.formatearMoneda(a)}</span>
            </div>
            
            <div class="fila-total">
              <span class="etiqueta-total">IVA (${l}%):</span>
              <span class="valor-total">${this.formatearMoneda(b)}</span>
            </div>
            
            <div class="linea-separadora-total"></div>
            
            <div class="fila-total-final">
              <span class="etiqueta-total-final">TOTAL:</span>
              <span class="valor-total-final">${this.formatearMoneda(i)}</span>
            </div>
          </div>
        </div>


        <!-- Notas -->
        <div class="seccion-notas" ${n.notas?"":'style="display: none;"'}>
          <h2 class="titulo-seccion">NOTAS:</h2>
          <div class="contenido-notas">${n.notas}</div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="linea-footer"></div>
          <div class="info-footer">
            <span class="nombre-empresa-footer">T\xC9CNICOS CLIMATIZACI\xD3N S.L.</span>
            <span class="mensaje-footer">Gracias por su confianza</span>
            <span class="web-footer">www.tecnicosclimatizacion.es</span>
          </div>
        </div>
      </div>
    `}))}obtenerDatosEmpresa(){let n=this.configuracionService.getConfiguracionActual();return(n==null?void 0:n.empresa)||{nombre_empresa:"Mi Empresa",direccion:"Direcci\xF3n no configurada",cif:"Sin CIF",telefono:"Sin tel\xE9fono",email:"sin-email@empresa.com",web:""}}obtenerEstilosCss(){return`
      .pdf-preview {
        width: 794px;
        background: white;
        padding: 20px;
        box-sizing: border-box;
        position: relative;
        font-family: 'Helvetica', Arial, sans-serif;
        overflow: visible;
      }

      .header-principal {
        text-align: center;
        margin-bottom: 20px;
      }

      .titulo-factura {
        font-size: 28px;
        font-weight: bold;
        color: #4F46E5;
        margin: 0;
        padding: 0;
      }

      .info-basica {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        padding-right: 20px;
      }

      .numero-factura {
        font-size: 14px;
        font-weight: bold;
        color: #111827;
      }

      .fecha-factura {
        font-size: 14px;
        color: #111827;
      }

      .seccion-empresa {
        margin-bottom: 20px;
      }

      .titulo-seccion {
        font-size: 14px;
        font-weight: bold;
        color: #4F46E5;
        margin: 0 0 8px 0;
      }

      .datos-empresa .nombre-empresa {
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 6px;
      }

      .datos-empresa .direccion-empresa,
      .datos-empresa .ciudad-empresa,
      .datos-empresa .cif-empresa,
      .datos-empresa .telefono-empresa,
      .datos-empresa .email-empresa {
        font-size: 11px;
        margin-bottom: 5px;
        color: #111827;
      }

      .seccion-cliente {
        margin-bottom: 25px;
      }

      .datos-cliente div {
        font-size: 11px;
        margin-bottom: 5px;
        color: #111827;
      }

      .seccion-servicios {
        margin-bottom: 15px;
        width: calc(100% - 20px);
        padding-right: 20px;
      }

      .tabla-header {
        display: flex;
        font-size: 12px;
        font-weight: bold;
        color: #4F46E5;
        margin-bottom: 8px;
        width: 100%;
        max-width: calc(100% - 20px);
      }

      .col-descripcion {
        width: 200px;
        flex: 0 0 200px;
      }

      .col-cantidad {
        width: 80px;
        flex: 0 0 80px;
        text-align: center;
      }

      .col-precio {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
      }

      .col-total {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
      }

      .linea-separadora {
        height: 1px;
        background-color: #4F46E5;
        margin: 8px 0;
        width: calc(100% - 20px);
      }

      .tabla-body {
        width: 100%;
        max-width: calc(100% - 20px);
      }

      .tabla-body .fila-servicio {
        display: flex;
        font-size: 10px;
        margin-bottom: 6px;
        width: 100%;
        max-width: calc(100% - 20px);
        align-items: center;
      }

      .fila-servicio .col-descripcion {
        width: 200px;
        flex: 0 0 200px;
        color: #111827;
      }

      .fila-servicio .col-cantidad {
        width: 80px;
        flex: 0 0 80px;
        text-align: center;
        color: #111827;
      }

      .fila-servicio .col-precio {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
        color: #111827;
      }

      .fila-servicio .col-total {
        width: 100px;
        flex: 0 0 100px;
        text-align: right;
        color: #111827;
        font-weight: bold;
      }

      .caja-totales {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        margin-bottom: 20px;
        width: calc(100% - 20px);
        padding-right: 20px;
      }

      .caja-totales-inner {
        width: 180px;
        height: 120px;
        background-color: #F8FAFC;
        border: 1px solid #4F46E5;
        border-radius: 4px;
        padding: 10px;
        box-sizing: border-box;
      }

      .titulo-caja {
        font-size: 11px;
        font-weight: bold;
        color: #4F46E5;
        margin-bottom: 4px;
        display: block;
      }

      .linea-separadora-caja {
        height: 1px;
        background-color: #4F46E5;
        margin-bottom: 8px;
        display: block;
      }

      .fila-total {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        margin-bottom: 6px;
        color: #111827;
      }

      .etiqueta-total {
        color: #111827;
        font-weight: normal;
      }

      .valor-total {
        color: #111827;
        font-weight: normal;
      }

      .linea-separadora-total {
        height: 1px;
        background-color: #4F46E5;
        margin-bottom: 6px;
        display: block;
      }

      .fila-total-final {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: bold;
        color: #4F46E5;
      }

      .etiqueta-total-final {
        color: #4F46E5;
        font-weight: bold;
      }

      .valor-total-final {
        color: #4F46E5;
        font-weight: bold;
      }

      .seccion-notas {
        margin-top: 25px;
        margin-bottom: 25px;
      }

      .contenido-notas {
        font-size: 11px;
        color: #111827;
      }

      .footer {
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 20px;
      }

      .linea-footer {
        height: 1px;
        background-color: #E5E7EB;
        margin-bottom: 10px;
      }

      .info-footer {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
      }

      .nombre-empresa-footer {
        font-weight: bold;
        color: #4F46E5;
      }

      .mensaje-footer,
      .web-footer {
        color: #6B7280;
      }

      /* Estilos adicionales para asegurar visibilidad */
      * {
        box-sizing: border-box;
      }
    `}generarPdfDesdeElemento(n,f){return j(this,null,function*(){try{let l=n.querySelector(".pdf-preview"),a=l?l.scrollHeight:n.scrollHeight,b=yield(0,B.default)(n,{scale:2,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",width:n.offsetWidth,height:Math.min(a,n.offsetHeight),scrollX:0,scrollY:0}),i=b.toDataURL("image/png"),d=new F("p","mm","a4"),t=210,o=295,c=b.height*t/b.width;if(console.log("\u{1F4CF} Dimensiones del canvas:",{canvasWidth:b.width,canvasHeight:b.height,imgHeight:c,pageHeight:o,fitsInOnePage:c<=o}),c<=o)d.addImage(i,"PNG",0,0,t,c),console.log("\u2705 Contenido cabe en una sola p\xE1gina");else{console.log("\u{1F4C4} Contenido requiere m\xFAltiples p\xE1ginas");let s=c,e=0;for(d.addImage(i,"PNG",0,e,t,c),s-=o;s>0;)e=s-c,d.addPage(),d.addImage(i,"PNG",0,e,t,c),s-=o}d.save(f),console.log("\u2705 PDF generado exitosamente con HTML/CSS:",f)}catch(l){throw console.error("\u274C Error al generar PDF desde elemento:",l),l}})}calcularSubtotal(n){return n!=null&&n.lineas?n.lineas.reduce((f,l)=>f+(l.cantidad||0)*(l.precio_pvp||0),0):0}formatearMoneda(n){return new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(n)}generarPdfNativo(n,f="factura.pdf"){try{console.log("\u{1F527} Generando PDF nativo mejorado con estilos...");let l=new F("p","mm","a4"),a=l.internal.pageSize.getWidth(),b=l.internal.pageSize.getHeight(),i=20,d=a-i*2,t=b-60,o=i,c=1,s=(g,x,A,S={})=>{let m=R(R({},{fontSize:12,fontStyle:"normal",color:[17,24,39],align:"left"}),S);l.setFontSize(m.fontSize),l.setFont("helvetica",m.fontStyle),l.setTextColor(m.color[0],m.color[1],m.color[2]),l.text(g,x,A,{align:m.align})},e=(g,x,A,S,p=[79,70,229])=>{l.setDrawColor(p[0],p[1],p[2]),l.line(g,x,A,S)},y=(g,x,A,S,p,m)=>{p&&(l.setFillColor(p[0],p[1],p[2]),l.rect(g,x,A,S,"F")),m&&(l.setDrawColor(m[0],m[1],m[2]),l.rect(g,x,A,S,"S"))},r=(g=10)=>o+g>t,C=()=>{l.addPage(),c++,o=i,s(`P\xE1gina ${c}`,a-i,b-20,{fontSize:10,color:[107,114,128],align:"right"})};s("FACTURA",a/2,o,{fontSize:28,fontStyle:"bold",color:[79,70,229],align:"center"}),o+=20,s(`N\xBA ${n.numero_factura||"N/A"}`,i,o,{fontSize:14,fontStyle:"bold"}),s(`Fecha: ${this.formatearFecha(n.fecha_emision)||"N/A"}`,a-i,o,{fontSize:14,align:"right"}),o+=25,s("DATOS DE LA EMPRESA",i,o,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),o+=8;let v=this.obtenerDatosEmpresa();if(s(v.nombre_empresa,i,o,{fontSize:12,fontStyle:"bold"}),o+=6,s(v.direccion,i,o,{fontSize:11}),o+=5,s(`CIF: ${v.cif}`,i,o,{fontSize:11}),o+=5,s(`Tel: ${v.telefono}`,i,o,{fontSize:11}),o+=5,s(v.email,i,o,{fontSize:11}),o+=20,s("DATOS DEL CLIENTE",i,o,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),o+=8,s(`Nombre: ${n.nombre_cliente||"N/A"}`,i,o,{fontSize:11}),o+=5,s(`Direcci\xF3n: ${n.direccion_cliente||"N/A"}`,i,o,{fontSize:11}),o+=5,s(`CIF: ${n.cif_cliente||"N/A"}`,i,o,{fontSize:11}),o+=5,s(`Email: ${n.email_cliente||"N/A"}`,i,o,{fontSize:11}),o+=25,n.lineas&&n.lineas.length>0){r(50)&&C(),s("DESCRIPCI\xD3N",i,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),s("CANT.",i+100,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),s("PRECIO",i+140,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),s("TOTAL",i+180,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),o+=8,e(i,o,a-i,o),o+=8;let g=0;n.lineas.forEach(h=>{var D;r(8)&&(C(),s("DESCRIPCI\xD3N",i,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),s("CANT.",i+100,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),s("PRECIO",i+140,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),s("TOTAL",i+180,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),o+=8,e(i,o,a-i,o),o+=8);let T=(h.cantidad||0)*(h.precio_pvp||0);g+=T,s(h.nombre||"Sin descripci\xF3n",i,o,{fontSize:10}),s(((D=h.cantidad)==null?void 0:D.toString())||"0",i+100,o,{fontSize:10}),s(`${(h.precio_pvp||0).toFixed(2)}\u20AC`,i+140,o,{fontSize:10}),s(`${T.toFixed(2)}\u20AC`,i+180,o,{fontSize:10}),o+=6}),o+=5,e(i,o,a-i,o),o+=10,r(40)&&C();let x=120,A=50,S=a-i-x;y(S,o,x,A,[248,250,252],[79,70,229]),s("RESUMEN",S+5,o+8,{fontSize:11,fontStyle:"bold",color:[79,70,229]}),e(S+5,o+12,S+x-5,o+12,[79,70,229]);let p=g*.21,m=g+p;s("Subtotal:",S+5,o+22,{fontSize:10}),s(`${g.toFixed(2)}\u20AC`,S+x-5,o+22,{fontSize:10,align:"right"}),s("IVA (${ivaPorcentaje}%):",S+5,o+32,{fontSize:10}),s(`${p.toFixed(2)}\u20AC`,S+x-5,o+32,{fontSize:10,align:"right"}),e(S+5,o+38,S+x-5,o+38,[79,70,229]),s("TOTAL:",S+5,o+45,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),s(`${m.toFixed(2)}\u20AC`,S+x-5,o+45,{fontSize:12,fontStyle:"bold",color:[79,70,229],align:"right"}),o+=A+15}n.notas&&(r(30)&&C(),s("NOTAS:",i,o,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),o+=8,s(n.notas,i,o,{fontSize:11}));let u=()=>{let g=b-30;e(i,g,a-i,g,[229,231,235]);let x=this.obtenerDatosEmpresa();s(x.nombre_empresa,i,g+8,{fontSize:10,fontStyle:"bold",color:[79,70,229]}),s("Gracias por su confianza",a/2,g+8,{fontSize:10,color:[107,114,128],align:"center"}),s(x.web,a-i,g+8,{fontSize:10,color:[107,114,128],align:"right"})};for(let g=1;g<=c;g++)l.setPage(g),u();l.save(f),console.log("\u2705 PDF nativo mejorado generado exitosamente:",f)}catch(l){throw console.error("\u274C Error al generar PDF nativo:",l),l}}formatearFecha(n){if(!n)return"N/A";try{return new Date(n).toLocaleDateString("es-ES")}catch{return n}}generarPlantillaFacturaSimple(n,f="factura.pdf"){try{console.log("\u{1F527} Generando plantilla de factura simple...");let l=new F("p","mm","a4"),a=l.internal.pageSize.getWidth(),b=l.internal.pageSize.getHeight(),i=25,d=a-i*2,t=i,o=(s,e,y,r={})=>{let v=R(R({},{fontSize:12,fontStyle:"normal",color:[17,24,39],align:"left"}),r);l.setFontSize(v.fontSize),l.setFont("helvetica",v.fontStyle),l.setTextColor(v.color[0],v.color[1],v.color[2]),l.text(s,e,y,{align:v.align})},c=(s,e,y,r,C=[79,70,229])=>{l.setDrawColor(C[0],C[1],C[2]),l.line(s,e,y,r)};if(o("FACTURA",a/2,t,{fontSize:36,fontStyle:"bold",color:[79,70,229],align:"center"}),t+=15,c(i+30,t,a-i-30,t),t+=20,o(`N\xBA ${n.numero_factura||"N/A"}`,i,t,{fontSize:16,fontStyle:"bold"}),o(`Fecha: ${this.formatearFecha(n.fecha_emision)||"N/A"}`,a-i,t,{fontSize:14,align:"right"}),t+=25,o("DATOS DE LA EMPRESA",i,t,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),t+=8,o(this.obtenerDatosEmpresa().nombre_empresa,i,t,{fontSize:12,fontStyle:"bold"}),t+=6,o(this.obtenerDatosEmpresa().direccion,i,t,{fontSize:11}),t+=5,t+=5,o(`CIF: ${this.obtenerDatosEmpresa().cif} | Tel: ${this.obtenerDatosEmpresa().telefono}`,i,t,{fontSize:11}),t+=5,o(this.obtenerDatosEmpresa().email,i,t,{fontSize:11}),t+=20,o("DATOS DEL CLIENTE",i,t,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),t+=8,o(`Nombre: ${n.nombre_cliente||"N/A"}`,i,t,{fontSize:11}),t+=5,o(`Direcci\xF3n: ${n.direccion_cliente||"N/A"}`,i,t,{fontSize:11}),t+=5,o(`CIF: ${n.cif_cliente||"N/A"} | Email: ${n.email_cliente||"N/A"}`,i,t,{fontSize:11}),t+=25,n.lineas&&n.lineas.length>0){o("DESCRIPCI\xD3N",i,t,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),o("CANT.",i+100,t,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),o("PRECIO",i+140,t,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),o("TOTAL",i+180,t,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),t+=8,c(i,t,a-i,t),t+=8;let s=0;n.lineas.forEach(r=>{var v;let C=(r.cantidad||0)*(r.precio_pvp||0);s+=C,o(r.nombre||"Sin descripci\xF3n",i,t,{fontSize:10}),o(((v=r.cantidad)==null?void 0:v.toString())||"0",i+100,t,{fontSize:10}),o(`${(r.precio_pvp||0).toFixed(2)}\u20AC`,i+140,t,{fontSize:10}),o(`${C.toFixed(2)}\u20AC`,i+180,t,{fontSize:10}),t+=6}),t+=5,c(i,t,a-i,t),t+=10;let e=s*.21,y=s+e;o("Subtotal:",a-i-80,t,{fontSize:12,align:"right"}),o(`${s.toFixed(2)}\u20AC`,a-i,t,{fontSize:12,align:"right"}),t+=8,o("IVA (${ivaPorcentaje}%):",a-i-80,t,{fontSize:12,align:"right"}),o(`${e.toFixed(2)}\u20AC`,a-i,t,{fontSize:12,align:"right"}),t+=8,c(a-i-80,t,a-i,t),t+=8,o("TOTAL:",a-i-80,t,{fontSize:16,fontStyle:"bold",color:[79,70,229],align:"right"}),o(`${y.toFixed(2)}\u20AC`,a-i,t,{fontSize:16,fontStyle:"bold",color:[79,70,229],align:"right"})}n.notas&&(t+=25,o("NOTAS:",i,t,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),t+=8,o(n.notas,i,t,{fontSize:11})),t=b-40,c(i,t,a-i,t),t+=10,o(this.obtenerDatosEmpresa().nombre_empresa,i,t,{fontSize:10,fontStyle:"bold",color:[79,70,229]}),o("Gracias por su confianza",a/2,t,{fontSize:10,color:[107,114,128],align:"center"}),o(this.obtenerDatosEmpresa().web,a-i,t,{fontSize:10,color:[107,114,128],align:"right"}),l.save(f),console.log("\u2705 Plantilla de factura simple generada exitosamente:",f)}catch(l){throw console.error("\u274C Error al generar plantilla de factura simple:",l),l}}generarPlantillaFacturaProfesional(n,f="factura.pdf"){try{console.log("\u{1F527} Generando plantilla de factura profesional...");let l=new F("p","mm","a4"),a=l.internal.pageSize.getWidth(),b=l.internal.pageSize.getHeight(),i=20,d=a-i*2,t=i,o=(g,x,A,S={})=>{let m=R(R({},{fontSize:12,fontStyle:"normal",color:[17,24,39],align:"left"}),S);l.setFontSize(m.fontSize),l.setFont("helvetica",m.fontStyle),l.setTextColor(m.color[0],m.color[1],m.color[2]),l.text(g,x,A,{align:m.align})},c=(g,x,A,S,p=[79,70,229])=>{l.setDrawColor(p[0],p[1],p[2]),l.line(g,x,A,S)},s=(g,x,A,S,p)=>{p&&(l.setFillColor(p[0],p[1],p[2]),l.rect(g,x,A,S,"F")),l.setDrawColor(79,70,229),l.rect(g,x,A,S,"S")};s(i,t,d,40,[79,70,229]),o("FACTURA",a/2,t+25,{fontSize:24,fontStyle:"bold",color:[255,255,255],align:"center"}),o(`N\xBA ${n.numero_factura||"N/A"}`,a-i-5,t+15,{fontSize:12,fontStyle:"bold",color:[255,255,255],align:"right"}),t+=50;let e=i,y=a/2+10;o("DATOS DE LA EMPRESA",e,t,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),t+=8;let r=60;s(e,t,d/2-10,r),o(this.obtenerDatosEmpresa().nombre_empresa,e+8,t+8,{fontSize:12,fontStyle:"bold"}),o(this.obtenerDatosEmpresa().direccion,e+8,t+18,{fontSize:10}),o(`CIF: ${this.obtenerDatosEmpresa().cif}`,e+8,t+38,{fontSize:10}),o(this.obtenerDatosEmpresa().email,e+8,t+48,{fontSize:10}),o(this.obtenerDatosEmpresa().telefono,e+8,t+58,{fontSize:10}),t=i+50,o("INFORMACI\xD3N DE LA FACTURA",y,t,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),t+=8,s(y,t,d/2-10,r),o("Fecha de emisi\xF3n:",y+8,t+8,{fontSize:10,fontStyle:"bold"}),o(this.formatearFecha(n.fecha_emision)||"N/A",y+8,t+18,{fontSize:10}),o("Estado:",y+8,t+28,{fontSize:10,fontStyle:"bold"}),o(n.estado||"Pendiente",y+8,t+38,{fontSize:10}),o("Cliente ID:",y+8,t+48,{fontSize:10,fontStyle:"bold"}),o(n.cliente_id||"N/A",y+8,t+58,{fontSize:10}),t+=r+25,o("DATOS DEL CLIENTE",i,t,{fontSize:16,fontStyle:"bold",color:[79,70,229]}),t+=12;let C=55;if(s(i,t,d,C),c(i+15,t+28,a-i-15,t+28,[229,231,235]),o("Nombre:",i+15,t+12,{fontSize:11,fontStyle:"bold"}),o(n.nombre_cliente||"N/A",i+35,t+12,{fontSize:11}),o("Direcci\xF3n:",i+15,t+22,{fontSize:11,fontStyle:"bold"}),o(n.direccion_cliente||"N/A",i+35,t+22,{fontSize:11}),o("CIF:",i+15,t+42,{fontSize:11,fontStyle:"bold"}),o(n.cif_cliente||"N/A",i+35,t+42,{fontSize:11}),o("Email:",i+15,t+52,{fontSize:11,fontStyle:"bold"}),o(n.email_cliente||"N/A",i+35,t+52,{fontSize:11}),t+=C+25,n.lineas&&n.lineas.length>0){o("DETALLE DE SERVICIOS",i,t,{fontSize:16,fontStyle:"bold",color:[79,70,229]}),t+=12;let g=t;s(i,g,d,20,[79,70,229]);let x=i+10,A=i+110,S=i+150,p=i+180;o("DESCRIPCI\xD3N",x,g+13,{fontSize:11,fontStyle:"bold",color:[255,255,255]}),o("CANT.",A,g+13,{fontSize:11,fontStyle:"bold",color:[255,255,255]}),o("PRECIO",S,g+13,{fontSize:11,fontStyle:"bold",color:[255,255,255]}),o("TOTAL",p,g+13,{fontSize:11,fontStyle:"bold",color:[255,255,255]}),t+=25;let m=0;n.lineas.forEach((h,T)=>{var z;let D=(h.cantidad||0)*(h.precio_pvp||0);m+=D;let M=T%2===0?[249,250,251]:[255,255,255];s(i,t,d,18,M),o(h.nombre||"Sin descripci\xF3n",x,t+12,{fontSize:10}),o(((z=h.cantidad)==null?void 0:z.toString())||"0",A,t+12,{fontSize:10}),o(`${(h.precio_pvp||0).toFixed(2)}\u20AC`,S,t+12,{fontSize:10}),o(`${D.toFixed(2)}\u20AC`,p,t+12,{fontSize:10}),t+=18}),s(i,t,d,20,[79,70,229]),o("TOTAL SERVICIOS",x,t+13,{fontSize:11,fontStyle:"bold",color:[255,255,255]}),o(`${m.toFixed(2)}\u20AC`,p,t+13,{fontSize:11,fontStyle:"bold",color:[255,255,255]}),t+=30}let v=160,u=a-i-v;s(u,t,v,100,[238,242,255]),o("RESUMEN DE LA FACTURA",u+10,t+15,{fontSize:13,fontStyle:"bold",color:[79,70,229]}),c(u+10,t+20,u+v-10,t+20,[79,70,229]),o("Subtotal:",u+10,t+35,{fontSize:11}),o(`${(n.subtotal||0).toFixed(2)}\u20AC`,u+v-10,t+35,{fontSize:11,align:"right"}),o("IVA (${ivaPorcentaje}%):",u+10,t+50,{fontSize:11}),o(`${(n.iva||0).toFixed(2)}\u20AC`,u+v-10,t+50,{fontSize:11,align:"right"}),c(u+10,t+60,u+v-10,t+60,[79,70,229]),o("TOTAL",u+10,t+75,{fontSize:16,fontStyle:"bold",color:[79,70,229]}),o(`${(n.total||0).toFixed(2)}\u20AC`,u+v-10,t+75,{fontSize:16,fontStyle:"bold",color:[79,70,229],align:"right"}),n.notas&&(t+=120,o("NOTAS ADICIONALES",i,t,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),t+=12,s(i,t,d-170,35),o(n.notas,i+10,t+12,{fontSize:10})),t=b-50,c(i,t,a-i,t,[79,70,229]),t+=10,o(this.obtenerDatosEmpresa().nombre_empresa,i,t,{fontSize:11,fontStyle:"bold",color:[79,70,229]}),o(this.obtenerDatosEmpresa().telefono,a/2,t,{fontSize:10,color:[107,114,128],align:"center"}),o(this.obtenerDatosEmpresa().email,a-i,t,{fontSize:10,color:[107,114,128],align:"right"}),t+=8,o(`CIF: ${this.obtenerDatosEmpresa().cif}`,i,t,{fontSize:9,color:[107,114,128]}),o(this.obtenerDatosEmpresa().web,a-i,t,{fontSize:9,color:[107,114,128],align:"right"}),l.save(f),console.log("\u2705 Plantilla de factura profesional generada exitosamente:",f)}catch(l){throw console.error("\u274C Error al generar plantilla de factura profesional:",l),l}}generarPdfDesdeDatos(n,f="factura.pdf"){try{console.log("\u{1F527} Generando PDF desde datos...");let l=J();H(l,"titulo"),l.text("FACTURA",105,30,{align:"center"}),H(l,"normal"),l.text("Nombre de empresa",E.m\u00E1rgenes.izquierda,50),l.text("Direcci\xF3n de empresa",E.m\u00E1rgenes.izquierda,55),l.text("Ciudad de empresa",E.m\u00E1rgenes.izquierda,60),l.text("CIF de empresa",E.m\u00E1rgenes.izquierda,65),l.text(`N\xBA Factura: ${n.numero_factura}`,120,50),l.text(`Fecha: ${n.fecha_emision}`,120,55),H(l,"subtitulo"),l.text("DATOS DEL CLIENTE:",E.m\u00E1rgenes.izquierda,80),H(l,"normal"),l.text(`Nombre: ${n.nombre_cliente}`,E.m\u00E1rgenes.izquierda,90),l.text(`Direcci\xF3n: ${n.direccion_cliente}`,E.m\u00E1rgenes.izquierda,95),l.text(`CIF: ${n.cif_cliente}`,E.m\u00E1rgenes.izquierda,100),l.text(`Email: ${n.email_cliente}`,E.m\u00E1rgenes.izquierda,105);let a=130;H(l,"subtitulo"),l.text("DESCRIPCI\xD3N",E.m\u00E1rgenes.izquierda,a),l.text("CANTIDAD",80,a),l.text("PRECIO",120,a),l.text("TOTAL",160,a),a+=10,q(l,E.m\u00E1rgenes.izquierda,a,190,a),a+=5,H(l,"normal"),n.lineas&&n.lineas.forEach(b=>{var i;l.text(b.nombre||"Sin descripci\xF3n",E.m\u00E1rgenes.izquierda,a),l.text(((i=b.cantidad)==null?void 0:i.toString())||"0",80,a),l.text(`${b.precio_pvp||0}\u20AC`,120,a),l.text(`${b.cantidad*b.precio_pvp||0}\u20AC`,160,a),a+=8}),a+=10,q(l,E.m\u00E1rgenes.izquierda,a,190,a),a+=10,l.text("Subtotal:",140,a),l.text(`${n.subtotal||0}\u20AC`,160,a),a+=8,l.text("IVA (${ivaPorcentaje}%):",140,a),l.text(`${n.iva||0}\u20AC`,160,a),a+=8,H(l,"subtitulo"),l.setFont("helvetica","bold"),l.text("TOTAL:",140,a),l.text(`${n.total||0}\u20AC`,160,a),n.notas&&(a+=20,H(l,"normal"),l.text("NOTAS:",E.m\u00E1rgenes.izquierda,a),a+=8,l.text(n.notas,E.m\u00E1rgenes.izquierda,a)),l.save(f),console.log("\u2705 PDF desde datos generado exitosamente:",f)}catch(l){throw console.error("\u274C Error al generar PDF desde datos:",l),l}}generarPdfBlob(n,f="factura.pdf"){return j(this,null,function*(){var l,a,b;try{console.log("\u{1F527} Generando PDF como Blob...");let i=new F("p","mm","a4"),d=i.internal.pageSize.getWidth(),t=i.internal.pageSize.getHeight(),o=20,c=d-o*2,s=t-60,e=o,y=1,r=(S,p,m,h={})=>{let D=R(R({},{fontSize:12,fontStyle:"normal",color:[17,24,39],align:"left"}),h);i.setFontSize(D.fontSize),i.setFont("helvetica",D.fontStyle),i.setTextColor(D.color[0],D.color[1],D.color[2]),i.text(S,p,m,{align:D.align})},C=(S,p,m,h,T=[79,70,229])=>{i.setDrawColor(T[0],T[1],T[2]),i.line(S,p,m,h)},v=(S,p,m,h,T,D)=>{T&&(i.setFillColor(T[0],T[1],T[2]),i.rect(S,p,m,h,"F")),D&&(i.setDrawColor(D[0],D[1],D[2]),i.rect(S,p,m,h,"S"))},u=S=>e+S>s?(i.addPage(),y++,e=o,!0):!1;r("FACTURA",o,e,{fontSize:24,fontStyle:"bold",color:[79,70,229]}),e+=15,r("T\xC9CNICOS CLIMATIZACI\xD3N S.L.",o,e,{fontSize:16,fontStyle:"bold"}),e+=8,r("Calle de la Tecnolog\xEDa, 123",o,e,{fontSize:10}),e+=5,r("28001 Madrid, Espa\xF1a",o,e,{fontSize:10}),e+=5,r("CIF: B12345678",o,e,{fontSize:10}),e+=5,r("Tel: +34 91 123 45 67",o,e,{fontSize:10}),e+=5,r("Email: info@tecnicosclimatizacion.es",o,e,{fontSize:10}),e+=15;let g=d-o-80;if(r(`N\xBA FACTURA: ${n.numero_factura}`,g,e-35,{fontSize:12,fontStyle:"bold"}),r(`FECHA: ${new Date(n.fecha_emision).toLocaleDateString("es-ES")}`,g,e-25,{fontSize:10}),r(`ESTADO: ${n.estado}`,g,e-15,{fontSize:10}),C(o,e,d-o,e,[79,70,229]),e+=10,r("DATOS DEL CLIENTE",o,e,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),e+=8,r(`Nombre: ${n.nombre_cliente}`,o,e,{fontSize:11}),e+=6,r(`Direcci\xF3n: ${n.direccion_cliente}`,o,e,{fontSize:11}),e+=6,r(`CIF: ${n.cif_cliente}`,o,e,{fontSize:11}),e+=6,r(`Email: ${n.email_cliente}`,o,e,{fontSize:11}),e+=15,n.lineas&&n.lineas.length>0){r("DETALLE DE SERVICIOS",o,e,{fontSize:14,fontStyle:"bold",color:[79,70,229]}),e+=10;let S=[80,20,25,25,30],p=[o,o+S[0],o+S[0]+S[1],o+S[0]+S[1]+S[2],o+S[0]+S[1]+S[2]+S[3]];v(o,e-5,c,15,[79,70,229]),r("DESCRIPCI\xD3N",p[0],e,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("CANT.",p[1],e,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("NETO",p[2],e,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("PVP",p[3],e,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),r("TOTAL",p[4],e,{fontSize:10,fontStyle:"bold",color:[255,255,255]}),e+=15;let m=0;for(let T of n.lineas){u(20);let D=Number(T.cantidad)||0,M=Number(T.precio_neto)||0,z=Number(T.precio_pvp)||0,w=D*z;m+=w,r(T.nombre||"Sin nombre",p[0],e,{fontSize:9}),r(D.toString(),p[1],e,{fontSize:9}),r(`\u20AC${M.toFixed(2)}`,p[2],e,{fontSize:9}),r(`\u20AC${z.toFixed(2)}`,p[3],e,{fontSize:9}),r(`\u20AC${w.toFixed(2)}`,p[4],e,{fontSize:9}),e+=12}e+=10;let h=d-o-60;r(`Subtotal: \u20AC${((l=n.subtotal)==null?void 0:l.toFixed(2))||"0.00"}`,h,e,{fontSize:11,fontStyle:"bold"}),e+=8,r(`IVA (21%): \u20AC${((a=n.iva)==null?void 0:a.toFixed(2))||"0.00"}`,h,e,{fontSize:11,fontStyle:"bold"}),e+=8,C(h-20,e,h+40,e),e+=5,r(`TOTAL: \u20AC${((b=n.total)==null?void 0:b.toFixed(2))||"0.00"}`,h,e,{fontSize:14,fontStyle:"bold",color:[79,70,229]})}n.notas&&(e+=20,u(30),r("NOTAS",o,e,{fontSize:12,fontStyle:"bold",color:[79,70,229]}),e+=8,r(n.notas,o,e,{fontSize:10}));let x=t-20;r("T\xC9CNICOS CLIMATIZACI\xD3N S.L. - +34 91 123 45 67 - info@tecnicosclimatizacion.es",o,x,{fontSize:8,align:"center"});let A=i.output("blob");return console.log("\u2705 PDF generado como Blob exitosamente"),A}catch(i){throw console.error("\u274C Error al generar PDF Blob:",i),i}})}};$.\u0275fac=function(f){return new(f||$)(X(Z))},$.\u0275prov=Y({token:$,factory:$.\u0275fac,providedIn:"root"});let P=$;return P})();export{so as a};

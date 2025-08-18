import {
  createColorClasses
} from "./chunk-KBR2FUJ2.js";
import {
  getIonMode
} from "./chunk-SZOJCATG.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-IQNHFR3E.js";
import "./chunk-KNQSF6OU.js";

// node_modules/@ionic/core/dist/esm/ion-text.entry.js
var textCss = ":host(.ion-color){color:var(--ion-color-base)}";
var Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const mode = getIonMode(this);
    return h(Host, {
      key: "361035eae7b92dc109794348d39bad2f596eb6be",
      class: createColorClasses(this.color, {
        [mode]: true
      })
    }, h("slot", {
      key: "c7b8835cf485ba9ecd73298f0529276ce1ea0852"
    }));
  }
};
Text.style = textCss;
export {
  Text as ion_text
};
/*! Bundled license information:

@ionic/core/dist/esm/ion-text.entry.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=ion-text.entry-SYTWMBHB.js.map

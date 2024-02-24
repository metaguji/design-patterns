/*
Adapter Pattern
- Structural design pattern that allows incompatible interfaces to be compatible with each other
*/

interface Lightning {
  chargeViaLightning(): void;
}

interface USBC {
  chargeViaUSBC(): void;
}

class LightningCharger implements Lightning {
  chargeViaLightning() {
    console.log("Charge via Lightning");
  }
}

class USBCCharger implements USBC {
  chargeViaUSBC() {
    console.log("Charge via USBC");
  }
}

class LightningToUSBCAdapter implements Lightning {
  private adaptee: USBCCharger;

  constructor(adaptee: USBCCharger) {
    this.adaptee = adaptee;
  }

  chargeViaLightning() {
    this.adaptee.chargeViaUSBC();
  }
}

const lightningCharger = new LightningCharger();
lightningCharger.chargeViaLightning();

const usbcCharger = new USBCCharger();
usbcCharger.chargeViaUSBC();

const adapter = new LightningToUSBCAdapter(usbcCharger);
adapter.chargeViaLightning();

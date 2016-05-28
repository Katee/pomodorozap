/*
   Super-simple Arduino sketch for connected zap controller.
   Controller has a single activation button that, when pressed, connects a 3.3V-high
   pin to ground. This pin is wired to pin 5 of the Arduino.
   When the serial port receives a newline, it briefly pulls this pin low,
   "pressing" the button.
*/

#include <Arduino.h>

/* Below headers are for Bluefruit Feather M0 (may not be 100% necessary) */

#include <SPI.h>
#if not defined (_VARIANT_ARDUINO_DUE_X_) && not defined (_VARIANT_ARDUINO_ZERO_)
  #include <SoftwareSerial.h>
#endif

#if defined(ARDUINO_SAMD_ZERO) && defined(SERIAL_PORT_USBVIRTUAL)
  // Required for Serial on Zero based boards
  #define Serial SERIAL_PORT_USBVIRTUAL
#endif

#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"

void setup() {
  pinMode(5, OUTPUT);
  digitalWrite(5, HIGH);

  Serial.begin(115200);

  while (!Serial) { yield(); }

  Serial.println("Press enter to zap");
}

void loop() {
  while (Serial.available()) {
    char incoming = Serial.read();
    if (incoming == '\n') {
      digitalWrite(5, LOW);
      delay(200);
      digitalWrite(5, HIGH);
    }
  }
}

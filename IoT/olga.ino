// WIFI
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

// ULTRASONIC
#include <HCSR04.h>

// MATH
#define PI 3.1415926535897932384626433832795

// GAS TANK
#define RADIUS 4.25 // cm

// WIFI
const char* ssid     = "Jens Iphone 8";
const char* password = "adappter";

// REST API endpoint for creating emission records
const char* address = "http://172.20.10.4:3000/api/CreateEmission";

// ULTRASONIC pins
int triggerPin = D4;
int echoPin = D3;

// BUTTON pins
int btnResetPin = D2;
int btnSetPin = D1;

// Button states
int btnStateReset = 0; 
int btnStateSet = 0; 

// The distance sensor measures the distance from the tank cap to the liquid surface
// The volume is calculated from the tank radius and height difference between two points in time
UltraSonicDistanceSensor distanceSensor(triggerPin, echoPin);

ESP8266WiFiMulti WiFiMulti;

// Distance of last measurement
double old_distance = -2;


void setup() {
  Serial.begin(9600);

  // The buttons should go back to their initial voltage, 
  // so we use INPUT_PULLUP instead of INPUT
  pinMode(btnResetPin, INPUT_PULLUP);
  pinMode(btnSetPin, INPUT_PULLUP);

  // We start by connecting to a WiFi network
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.println();
  Serial.print("Wait for WiFi... ");

  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // We get the initial distance to the liquid
  double old_distance = distanceSensor.measureDistanceCm();
  
  delay(500);
}


// Computes the volume in liters given radius and height difference
// Radius and height should be provided in cm
double get_liters(double radius, double height){
  // Convert values from cm to dm
  double radius_dm = radius / 10.0;
  double height_dm = height / 10.0;

  // Compute volume in dm^3. Remember that dm^3 correspond to l.
  double liters = PI * (radius_dm * radius_dm) * height_dm;

  return liters;
}

void loop() {
  // Read the button states
  btnStateReset = digitalRead(btnResetPin);
  btnStateSet = digitalRead(btnSetPin);

  if (btnStateReset == LOW) {
    // We pressed the reset button
    old_distance = distanceSensor.measureDistanceCm();
    Serial.println("New reset: " + String(old_distance, 6));
  }

   if (btnStateSet == LOW) {
    // We pressed the set button
    if ((WiFiMulti.run() == WL_CONNECTED)) {
      // We want to get the liters that have been used and 
      // send the information to the Hyperledger REST API
      WiFiClient client;
      HTTPClient http;

      http.setTimeout(20000);

      // The distance of the liquid from the sensor in cm
      double distance = distanceSensor.measureDistanceCm();
      double diff_distance = distance - old_distance;
      // These are the liters used since the last reset
      double liters = get_liters(RADIUS, diff_distance);

      Serial.println("Difference: " + String(diff_distance, 6));
      Serial.println("Liters: " + String(liters, 6));
  
      Serial.print("[HTTP] begin...\n");
      if (http.begin(client, address)) {  // HTTP
        Serial.println("[HTTP] POST with " + String(liters, 6));
        
        // We send a POST request containing JSON data for the measurement
        http.addHeader("Content-Type", "application/json");
        // The owner is hard-coded for now. In production this should be the identifier for the household.
        String msg = "{\"$class\": \"org.energy.network.CreateEmission\",\"litersOil\": "+ String(liters, 6) +",\"owner\": \"resource:org.energy.network.Consumer#101\"}";

        int httpCode = http.POST(msg);
  
        // httpCode will be negative on error
        if (httpCode > 0) {
          // HTTP header has been send and Server response header has been handled
          Serial.printf("[HTTP] POST... code: %d\n", httpCode);
  
          // file found at server
          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
            String payload = http.getString();
            Serial.println(payload);
          }
        } else {
          Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }
  
        http.end();
      } else {
        Serial.printf("[HTTP} Unable to connect\n");
      }
    }
  }
  delay(500);
}
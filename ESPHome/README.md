# Developer Setup for ESPHome

ESPHome Dashboard only runs on unix machines. (NOT WINDOWS)

perennial_1.yaml is the yaml for the device.

### Start ESPHome with Dashboard
1. Inside ESPHome directory
2. `python3 -m venv .env`
3. `source .env/bin/activate`
4. `pip install --upgrade pip`
5. `pip install -r requirements.txt`
6. `esphome config/ dashboard`
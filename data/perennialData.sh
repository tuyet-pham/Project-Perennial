#!/bin/sh

until curl -f http://db_data:5984; do
    sleep 1
done

curl -X PUT $HOST/users
curl -X PUT $HOST/users/Johnny67 -d '{"username":"Johnny67","email":"johnny76@gmail.com","hashpass":"mypass"}'
curl -X PUT $HOST/users/Sarah23 -d '{"username":"Sarah23","email":"sarah23@gmail.com","hashpass":"6%sk384ldigd"}'
curl -X PUT $HOST/plant_device
curl -X PUT $HOST/plant_device/01 -d '{"name":"pedro","username":"Sarah23","type":"plant","location":{"country":"United States","state":"Texas","city":"Denton","IP":"129.120.67.52"},"species":"Cactus","water_conditions":{"min_moisture_level":"0.60"}}'
curl -X PUT $HOST/plant_device/02 -d '{"name":"pedro","username":"Sarah23","type":"plant","location":{"country":"United States","state":"Texas","city":"Denton","IP":"129.120.67.52"},"species":"Potato","water_conditions":{"min_moisture_level":"0.30"}}'
curl -X PUT $HOST/plant_device/03 -d '{"name":"pedro","username":"Sarah23","type":"plant","location":{"country":"United States","state":"Oklahoma","city":"Tulsa","IP":"129.120.56.37"},"species":"Flower","water_conditions":{"min_moisture_level":"0.80"}}'
curl -X PUT $HOST/plant_device/0d2186ea38e106dd06b16f95ee011150 -d '{"name": "Living Room", "username": "thesealion95", "species": "Begonia", "location": { "geolocationCity": "Irving", "geolocationState": "CO", "indoorsOutdoors": "indoors"}, "wateringConditionTrigger": "moisture", "wateringConditionValue": "50", "additionalNotes": ""}'
curl -X PUT $HOST/plant_device_reading
curl -X PUT $HOST/plant_device_reading/01 -d '{"type":"plant","device_id":"1943","time_reading":"datetime","values":{"moisture_level":"0.90","water_level":"0.30","pump_status":"true"}}'
curl -X PUT $HOST/plant_device_reading/02 -d '{"type":"plant","device_id":"5243","time_reading":"datetime","values":{"moisture_level":"0.60","water_level":"1.00","pump_status":"false"}}'
curl -X PUT $HOST/plant_device_reading/03 -d '{"type":"plant","device_id":"9182","time_reading":"datetime","values":{"moisture_level":"1.00","water_level":"0.50","pump_status":"true"}}'
curl -X PUT $HOST/plant_types
curl -X PUT $HOST/plant_types/01 -d '{"plant":"African violet","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/02 -d '{"plant":"Baby’s tears","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/03 -d '{"plant":"Begonia","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/04 -d '{"plant":"Coleus","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/05 -d '{"plant":"Impatiens","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/06 -d '{"plant":"Lucky Bamboo","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/07 -d '{"plant":"Philodendron","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/08 -d '{"plant":"Spiderwort","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/09 -d '{"plant":"Tropicanna Canna","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/10 -d '{"plant":"Blue Camassia","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/11 -d '{"plant":"Bee Balm","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/12 -d '{"plant":"Phlox carolina","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/13 -d '{"plant":"Butterfly weed","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/14 -d '{"plant":"Siberian iris","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/15 -d '{"plant":"Hibiscus","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/16 -d '{"plant":"Meadow rue","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/17 -d '{"plant":"Ostrich fern","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/18 -d '{"plant":"Cardinal flower","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/19 -d '{"plant":"Ligularia","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/20 -d '{"plant":"Carex","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/21 -d '{"plant":"Blue flag","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/22 -d '{"plant":"Bog arum","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/23 -d '{"plant":"Cattail","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/24 -d '{"plant":"Cordgrass","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/25 -d '{"plant":"Flowering rush","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/26 -d '{"plant":"Golden club","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/27 -d '{"plant":"Hardy arum","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/28 -d '{"plant":"Horsetail","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/29 -d '{"plant":"Japanese water iris","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/30 -d '{"plant":"Marsh marigold","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/31 -d '{"plant":"Southern blue flag","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/32 -d '{"plant":"Spike rush","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/33 -d '{"plant":"Sweet flag","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/34 -d '{"plant":"Water canna","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/35 -d '{"plant":"Water iris","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/36 -d '{"plant":"Yellow flag","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/37 -d '{"plant":"Button bush","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/38 -d '{"plant":"Red osier dogwood","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/39 -d '{"plant":"Tartarian dogwood","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/40 -d '{"plant":"Winterberry","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/41 -d '{"plant":"Yaupon holly","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/42 -d '{"plant":"Calla lily","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/43 -d '{"plant":"Louisiana iris","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/44 -d '{"plant":"Chinese globeflower","min_moisture":"0.80"}'
curl -X PUT $HOST/plant_types/45 -d '{"plant":"Egyptian papyrus","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/46 -d '{"plant":"Iris","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/47 -d '{"plant":"Aloe vera","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/48 -d '{"plant":"Succulent","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/49 -d '{"plant":"Aloe spirillis","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/50 -d '{"plant":"Cactus","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/51 -d '{"plant":"Candelabra","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/52 -d '{"plant":"Spider plant","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/53 -d '{"plant":"Green onion","min_moisture":"0.60"}'
curl -X PUT $HOST/plant_types/54 -d '{"plant":"Basil","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/55 -d '{"plant":"Rosemary","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/56 -d '{"plant":"Rubber plant","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/57 -d '{"plant":"Orchid","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/58 -d '{"plant":"Snake plant","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/59 -d '{"plant":"Pothos","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/60 -d '{"plant":"Dracaena","min_moisture":"0.00"}'
curl -X PUT $HOST/plant_types/61 -d '{"plant":"Rubber tree","min_moisture":"0.00"}'
exec "$@"
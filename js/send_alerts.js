const CRUX_EVENT_GROUP_ID = '082e7745-47f7-4e28-9cba-aa7480e0d526'
const GLOBAL_ORCH_KEY = "R028NKU41PQGYB4TQTEUZ8GRN15ME9HF"

function checkout() {


//    sendViaCrux(CRUX_EVENT_GROUP_ID)
//    console.log('**************************************')
    trigger()
//    setTimeout(loadPage, 5500);
}

function sendViaCrux(eventGroupId){
    console.log('Calling CRUX event group id: ' + eventGroupId)
    var settings = {
          "url": "https://event-sender.herokuapp.com/ondemand/" + eventGroupId,
          "method": "GET",
          "timeout": 0,
        };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function sendAlert(eventObject, dedup_key, integration_key = GLOBAL_ORCH_KEY) {
//    var eventObject = {
//        "routing_key":"R028NKU41PQGYB4TQTEUZ8GRN15ME9HF",
//        "event_action": "trigger",
//        "payload": payload,
//        "dedup_key": dedup_key,
//        "images": images
//    }

    eventObject["routing_key"] = integration_key
    eventObject["event_action"] = "trigger"
    eventObject["dedup_key"] = dedup_key
    console.log(eventObject)
    $.ajax({
          method: "POST",
          url: "https://events.pagerduty.com/v2/enqueue",
          data: JSON.stringify(eventObject)
        }).done(function (response) {
          console.log(response);
    });
}

//function sendPaymentAlert(payload, client){
//    var eventObject = {
//        "routing_key":"R03DK3LM80ZDWVY0UWU0Z5DCCVWLK9E5",
//        "dedup_key": new Date() + new Date().getTime(),
//        "event_action": "trigger",
//        "payload": payload,
//        "client": client
//    }
//    console.log(eventObject)
//    $.ajax({
//          method: "POST",
//          url: "https://events.pagerduty.com/v2/enqueue",
//          data: JSON.stringify(eventObject)
//        }).done(function (response) {
//          console.log(response);
//    });
//}

function sendChangeEvent(){
    // Send code change event
//    sendViaCrux("474a7ca4-1439-4308-8441-9f1c8c82915a")
}

function trigger(){
    // Now send alert storm...

    // Zabbix alert
    var zabbixPayload = {
        "payload": {
            "summary": "[Zabbix] java.lang.OutOfMemoryError: Java heap space",
            "source": "Zabbix",
            "severity": "warning",
            "location" : "prod",
            "component": "Checkout",
            "group": "Checkout,Zabbix,Production,eCommerce,Checkout-Tier",
            "class": "Zabbix"
        },
        "event_action": "trigger",
        "client": "View in Zabbix",
        "client_url": "www.zabbix.com",
        "images": [{
             "src": "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
             "href": "https://acme.pagerduty.com",
             "alt": "This is a sample link"
        }]
    }

//    sendAlert(zabbixPayload, "Zabbix")

    // New Relic alert
    var newRelicPayload = {
        "payload": {
            "summary": "[Critical] Increased response time detected on Checkout page, High Error rates",
            "source": "New Relic",
            "severity": "critical",
            "component": "Checkout",
            "custom_details": {
                "Priority": "Highest",
                "event_id": "0f5bfc9928a260678",
                "body": "[Critical] Increased response time detected on Checkout page, High Error rates. Object Reference Not Set and ADO.NET Connection pool exceeded errors detected",
                "tags": ["aws-prod", "base", "env:prod", "host:farnsworth", "monitor", "pd_az:us-west-2c", "production", "xdb", "xtradb"],
                "AWSAccountId": "84862478935",
                "NewStateValue": "ALARM",
                "OldStateValue": "INSUFFICIENT_DATA",
                "Region": "US West (N. California)"
            }
        },
        "images": [{
            "src": "https://pdt-gurinder.s3.amazonaws.com/images/metrics/NRErrors2.png",
            "href": "https://acme.pagerduty.com",
            "alt": "This is a sample link"
        }]
    }

    sendAlert(newRelicPayload, "NewRelic1")
    setTimeout(function() { sendAlert(newRelicPayload, "NewRelic2"); }, 5000); // send again in 5 seconds
    setTimeout(function() { sendAlert(newRelicPayload, "NewRelic3"); }, 10000); // and again in 10 seconds


    // Mongo alert
    var mongoAlertPayload = {
        "payload": {
            "summary": "Host 'acme-mongorepl1-sv1-c40 :: 179.21.24.50' is DOWN",
            "source": "acme-mongorepl1-sv1-c40",
            "severity": "critical",
            "component": "Inventory",
            "group": "MongoDB"
        }
    }
    setTimeout(function() { sendAlert(mongoAlertPayload, "Mongo"); }, 1000);


    // Solarwinds alert
    var solarAlertPayload = {
        "payload": {
            "summary": "Host 'acme-mongorepl1-sv1-c40 :: 179.21.24.50' Error NETWORK [conn11] Failed to connect to 127.0.0.1:27019, in(checking socket for error after poll), reason: No connection could be made because the target machine actively refused it.",
            "source": "Solarwinds",
            "severity": "critical",
            "component": "Inventory",
            "group": "Inventory-API"
        }
    }
    setTimeout(function() { sendAlert(solarAlertPayload, "Solarwinds"); }, 1000);


    // Prometheus alert
    var promAlertPayload = {
        "payload": {
            "summary": "[PROMETHEUS] **WARNING** Low revenue detected compared to normal",
            "source": "Prometheus",
            "severity": "warning",
            "component": "Payments"
        }
    }
    setTimeout(function() { sendAlert(promAlertPayload, "Prometheus1"); }, 1000);
    setTimeout(function() { sendAlert(promAlertPayload, "Prometheus2"); }, 6000);
    setTimeout(function() { sendAlert(promAlertPayload, "Prometheus3"); }, 11000);
    setTimeout(function() { sendAlert(promAlertPayload, "Prometheus4"); }, 16000);


    // AWS alert
    var awsAlertPayload = {
        "payload": {
            "summary": "Maximum CPUUtilization GreaterThanOrEqualToThreshold 70.0 for InstanceId i-0a87173b16ee8b90c",
            "source": "arn:aws:ec2:us-west-1:864672256020:instance/i-0f5bfc9928a260678",
            "severity": "critical",
            "component": "i-0f5bfc9928a260678",
            "group": "Checkout",
            "class": "CPUUtilization",
            "custom_details": {
              "AWSAccountId": "84862478935",
              "AlarmDescription": "Created from EC2 Console",
              "AlarmName": "awsec2-i-0a87d47626thb90c-High-CPU-Utilization",
              "NewStateReason": "Threshold Crossed: 1 datapoint [80 (2022-09-29T08:53:03Z)] was greater than or equal to the threshold (70.0).",
              "NewStateValue": "ALARM",
              "OldStateValue": "INSUFFICIENT_DATA",
              "Region": "US West (N. California)"
            }
        }
    }
    setTimeout(function() { sendAlert(awsAlertPayload, "AWS"); }, 1000);


    // Solarwinds 2 alert
    var solar2AlertPayload = {
        "payload": {
            "summary": "Host 'acme-mongorepl1-sv1-c40 :: 179.21.24.50' Error NETWORK [conn11] Failed to connect to 127.0.0.1:27019, in(checking socket for error after poll), reason: No connection could be made because the target machine actively refused it.",
            "source": "Solarwinds",
            "severity": "critical",
            "component": "Checkout"
        }
    }
    setTimeout(function() { sendAlert(solar2AlertPayload, "Solarwinds2"); }, 2000);


    // Datadog alert
    var datadogAlertPayload = {
        "payload": {
            "summary": "[Datadog] **WARNING** Memory Usage THRESHOLDEXCEEDED - WARNINGLEVEL- on 68.100.108.74",
            "source": "Datadog",
            "severity": "critical",
            "component": "Checkout",
            "class": "RAM Utilization",
            "custom_details": {
              "AWSAccountI": "864622626020",
              "AlarmDescription": "Created from EC2 Console",
              "AlarmName": "awsec2-i-0af6fde92b6b4b189669-High-CPU-Utilization",
              "AlertReason": "Threshold Exceeded: Memory Usage on 34.38.123.232 exceeded WARNING threshold (90%).",
              "AlertValue": "WARNING",
              "Region": "US East (NY)"
            }
        }
    }
    setTimeout(function() { sendAlert(datadogAlertPayload, "Datadog1"); }, 2000);
    setTimeout(function() { sendAlert(datadogAlertPayload, "Datadog2"); }, 4000);
    setTimeout(function() { sendAlert(datadogAlertPayload, "Datadog3"); }, 6000);

}

//trigger()

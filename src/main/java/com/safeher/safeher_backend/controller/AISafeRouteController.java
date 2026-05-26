package com.safeher.safeher_backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/ai-route")

@CrossOrigin("*")
public class AISafeRouteController {

    @PostMapping("/check")

    public Map<String, Object> checkRoute(
            @RequestBody Map<String, Double> body
    ) {

        double lat = body.get("lat");
        double lng = body.get("lng");

        Map<String, Object> response =
                new HashMap<>();

        /*
         SIMPLE AI LOGIC

         You can later connect:
         - crime API
         - weather API
         - AI prediction
         - night detection
         */

        double riskScore =
                Math.random() * 100;

        String status;

        if (riskScore > 70) {

            status = "UNSAFE";

        } else if (riskScore > 40) {

            status = "MEDIUM";

        } else {

            status = "SAFE";

        }

        response.put("latitude", lat);

        response.put("longitude", lng);

        response.put("riskScore", riskScore);

        response.put("status", status);

        response.put(
                "message",

                status.equals("SAFE")

                        ?

                        "✅ Route looks safe"

                        :

                        "⚠️ Be careful in this area"
        );

        return response;

    }

}
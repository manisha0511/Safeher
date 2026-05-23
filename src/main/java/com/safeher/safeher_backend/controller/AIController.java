package com.safeher.safeher_backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")

public class AIController {

    @Value("${gemini.api.key}")
    private String API_KEY;

    @PostMapping("/chat")

    public ResponseEntity<?> chat(
            @RequestBody Map<String, String> body
    ) {

        try {

            String userMessage =
                    body.get("message");

            RestTemplate restTemplate =
                    new RestTemplate();

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
                            + API_KEY;

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            // GEMINI BODY
            Map<String, Object> requestBody =
                    Map.of(

                            "contents",

                            List.of(

                                    Map.of(

                                            "parts",

                                            List.of(

                                                    Map.of(

                                                            "text",

                                                            """
                                                            You are SafeHer AI.

                                                            You help women stay safe.

                                                            Give:
                                                            - short replies
                                                            - safety advice
                                                            - emergency guidance
                                                            - emotionally supportive answers

                                                            User:
                                                            """
                                                                    + userMessage
                                                    )

                                            )

                                    )

                            )

                    );

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(
                            requestBody,
                            headers
                    );

            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            entity,
                            Map.class
                    );

            Map responseBody =
                    response.getBody();

            List candidates =
                    (List) responseBody.get(
                            "candidates"
                    );

            Map firstCandidate =
                    (Map) candidates.get(0);

            Map content =
                    (Map) firstCandidate.get(
                            "content"
                    );

            List parts =
                    (List) content.get(
                            "parts"
                    );

            Map firstPart =
                    (Map) parts.get(0);

            String aiReply =
                    firstPart.get("text")
                            .toString();

            return ResponseEntity.ok(
                    aiReply
            );

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body("⚠️ Gemini AI Error");

        }

    }

}
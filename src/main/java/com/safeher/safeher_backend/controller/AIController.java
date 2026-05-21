package com.safeher.safeher_backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = "*")

public class AIController {

    @Value("${gemini.api.key}")
    private String API_KEY;

    @PostMapping("/chat")

    public String chat(
            @RequestBody Map<String, String> body
    ) {

        String userMessage =
                body.get("message");

        String prompt = """

You are SafeHer AI.

You are a smart women safety assistant.

Give:
- short
- practical
- safety focused
- emotionally supportive answers

User Question:
""" + userMessage;

        RestTemplate restTemplate =
                new RestTemplate();

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                        + API_KEY;

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        Map<String, Object> requestBody =
                Map.of(

                        "contents",
                        List.of(

                                Map.of(
                                        "parts",
                                        List.of(

                                                Map.of(
                                                        "text",
                                                        prompt
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

        try {

            Map response =
                    restTemplate.postForObject(
                            url,
                            entity,
                            Map.class
                    );

            List candidates =
                    (List) response.get(
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

            return firstPart
                    .get("text")
                    .toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "⚠️ AI response error";

        }
    }
}
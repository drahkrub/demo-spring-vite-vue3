package de.idon.vite;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {
    
    @GetMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String someJson() {
        return "{\"message\": \"some JSON\"}";
    }

    @GetMapping("/vp/**")
	public String vueProject() {
        return "forward:/target/vue-project/index.html";
    }
}

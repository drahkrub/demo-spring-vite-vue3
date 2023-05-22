package de.idon.vue;

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

    @GetMapping("/v/**")
	public String viteProject() {
        return "forward:/vite-project/index.html";
    }
    
    @GetMapping("/w/**")
	public String vueCliProject() {
        return "forward:/vue-cli-project/index.html";
    }
}

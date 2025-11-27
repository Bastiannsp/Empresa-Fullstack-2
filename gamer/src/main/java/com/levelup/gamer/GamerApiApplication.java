package com.levelup.gamer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.levelup")
public class GamerApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamerApiApplication.class, args);
	}

}


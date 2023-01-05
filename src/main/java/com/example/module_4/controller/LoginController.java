package com.example.module_4.controller;

import com.example.module_4.model.User;
import com.example.module_4.service.LoginService;
import com.example.module_4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private LoginService loginService;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<User> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        if (loginService.login(username, password)) {
            return new ResponseEntity<>(userService.findUserByUsername(username), HttpStatus.OK);
        }
        return null;
    }

    @PostMapping
    public ResponseEntity<String> signUp(@RequestBody User user){
        if (loginService.signUp(user)){
        return new ResponseEntity<>("Sign up successfully!", HttpStatus.CREATED);
        }
        return null;
    }
}

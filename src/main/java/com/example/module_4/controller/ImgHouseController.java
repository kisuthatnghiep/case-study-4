package com.example.module_4.controller;

import com.example.module_4.service.IImgHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping
@PropertySource("classpath:application.properties")
public class ImgHouseController {

}

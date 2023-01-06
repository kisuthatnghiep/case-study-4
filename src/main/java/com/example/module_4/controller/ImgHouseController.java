package com.example.module_4.controller;

import com.example.module_4.model.House;
import com.example.module_4.model.ImgHouse;
import com.example.module_4.repository.IHouseRepository;
import com.example.module_4.service.IHouseService;
import com.example.module_4.service.IImgHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping()
@PropertySource("classpath:application.properties")
public class ImgHouseController {
    @Autowired
    private IImgHouseService imgHouseService;
    @Autowired
    private IHouseService houseService;
    @Value("${display.path}")
    private String displayLink;
    @Value("${upload.path}")
    private String link;

    @PostMapping
    public ResponseEntity<ImgHouse> addImg(@RequestPart("imgHouse") ImgHouse imgHouse, @RequestPart(value = "file", required = false) MultipartFile file) {
        uploadFile(imgHouse, file);
        imgHouseService.save(imgHouse);
        return new ResponseEntity<>(imgHouse, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ImgHouse> findOne(@PathVariable("id") Long id) {
        Optional<ImgHouse> imgHouse = imgHouseService.findById(id);
        if (!imgHouse.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(imgHouse.get(), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ImgHouse> delete(@PathVariable Long id) {
        Optional<ImgHouse> imgHouse = imgHouseService.findById(id);
        if (!imgHouse.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        imgHouseService.remove(id);
        return new ResponseEntity<>(imgHouse.get(), HttpStatus.OK);
    }
    private void uploadFile(ImgHouse imgHouse, MultipartFile file) {
        if (file != null) {
            String fileName = file.getOriginalFilename();
            try {
                FileCopyUtils.copy(file.getBytes(), new File(link + fileName));
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            imgHouse.setImg(displayLink + fileName);
        } else {
            imgHouse.setImg(displayLink + "");
        }
    }
}

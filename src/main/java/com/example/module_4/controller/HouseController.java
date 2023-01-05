package com.example.module_4.controller;

import com.example.module_4.model.House;
import com.example.module_4.service.IHouseService;
import org.hibernate.loader.plan.spi.Return;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/houses")
public class HouseController {
    @Autowired
    private IHouseService houseService;

    @GetMapping
    public ResponseEntity<Iterable<House>> showAll() {
        Iterable<House> house = houseService.findAll();
        if (!house.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(house, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<House> addHouse(@RequestBody House house) {
        House houseAdd = houseService.save(house);
        return new ResponseEntity<>(houseAdd, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<House> findOne(@PathVariable("id") Long id) {
        Optional<House> house = houseService.findById(id);
        if (!house.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(house.get(), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<House> editHouse(@RequestBody House houseEdit, @PathVariable("id") Long id) {
        Optional<House> house = houseService.findById(id);
        if (!house.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        houseEdit.setId(house.get().getId());
        houseEdit = houseService.save(houseEdit);
        return new ResponseEntity<>(houseEdit, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<House> delete(@PathVariable("id") Long id) {
        Optional<House> house = houseService.findById(id);
        if (!house.isPresent()) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        houseService.remove(id);
        return new ResponseEntity<>(house.get(), HttpStatus.OK);
    }
}

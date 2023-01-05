package com.example.module_4.service;

import com.example.module_4.model.House;
import com.example.module_4.model.RentHouse;
import com.example.module_4.repository.IRentHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RentHouseService implements IRentHouseService {
    @Autowired
    private IRentHouseRepository rentHouseRepository;

    @Override
    public Iterable<RentHouse> findAll() {
        return rentHouseRepository.findAll();
    }

    @Override
    public Optional<RentHouse> findById(Long id) {
        return rentHouseRepository.findById(id);
    }

    @Override
    public House save(RentHouse rentHouse) {
        rentHouseRepository.save(rentHouse);
        return null;
    }

    @Override
    public void remove(Long id) {
        rentHouseRepository.deleteById(id);
    }
}

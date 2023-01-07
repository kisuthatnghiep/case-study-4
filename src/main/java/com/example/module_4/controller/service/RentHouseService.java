package com.example.module_4.controller.service;

import com.example.module_4.model.House;
import com.example.module_4.model.RentHouse;
import com.example.module_4.model.User;
import com.example.module_4.repository.IRentHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
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

    @Override
    public List<RentHouse> findAllByHouse(House house) {
        return rentHouseRepository.findAllByHouse(house);
    }

    @Override
    public boolean checkRentHouse(RentHouse rentHouse) {
        List<RentHouse> rentHouseList= rentHouseRepository.findAllHouseCheck(rentHouse.getHouse().getId());
        for (int i = 0; i < rentHouseList.size(); i++){
            if (rentHouse.getStartDay().isBefore(rentHouseList.get(i).getEndDay())){
                if (rentHouse.getEndDay().isBefore(rentHouseList.get(i).getStartDay())){
                    return true;
                }
                return false;
            }
        }
            return true;
    }

    @Override
    public List<RentHouse> findAllByGuest(User guest) {
        return rentHouseRepository.findAllByGuest(guest);
    }

    @Override
    public boolean checkCancel(RentHouse rentHouse) {
        if (LocalDate.now().plusDays(1).isBefore(rentHouse.getStartDay())){
            return true;
        }
        return false;
    }
}

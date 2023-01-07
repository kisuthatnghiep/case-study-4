package com.example.module_4.controller.service;

import com.example.module_4.model.House;
import com.example.module_4.model.RentHouse;

import java.util.List;

public interface IRentHouseService extends IGeneralService<RentHouse> {
    List<RentHouse> findAllByHouse(House house);

    boolean checkRentHouse(RentHouse rentHouse);
}

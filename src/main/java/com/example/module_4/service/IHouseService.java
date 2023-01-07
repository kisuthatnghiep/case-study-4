package com.example.module_4.service;

import com.example.module_4.model.House;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IHouseService extends IGeneralService<House> {
    @Query(value = "select house.*, count(house_id) as c from house join rent_house rh on house.id = rh.house_id\n" +
            "group by house_id\n" +
            "order by c DESC limit 5", nativeQuery = true)
    List<House> top5RentHouse();
}

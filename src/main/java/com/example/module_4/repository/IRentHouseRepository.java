package com.example.module_4.repository;

import com.example.module_4.model.RentHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRentHouseRepository extends JpaRepository<RentHouse, Long> {
}

package com.example.module_4.service;

import com.example.module_4.model.ImgHouse;
import com.example.module_4.repository.ICommentRepository;
import com.example.module_4.repository.IImgHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImgHouseService implements IImgHouseService {
    @Autowired
    private IImgHouseRepository imgHouseRepository;

    @Override
    public Iterable<ImgHouse> findAll() {
        return imgHouseRepository.findAll();
    }

    @Override
    public Optional<ImgHouse> findById(Long id) {
        return imgHouseRepository.findById(id);
    }

    @Override
    public void save(ImgHouse imgHouse) {
        imgHouseRepository.save(imgHouse);
    }

    @Override
    public void remove(Long id) {
        imgHouseRepository.deleteById(id);
    }
}

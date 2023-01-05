package com.example.module_4.service;

import com.example.module_4.model.User;
import com.example.module_4.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginService {
    @Autowired
    private IUserRepository userRepository;

    public boolean login(String username, String password) {
        List<User> userList = userRepository.findAll();
        for (User us : userList) {
            if (us.getUsername().equals(username) && us.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }

    public boolean signUp(User user) {
        if (!checkUserExist(user)){
            userRepository.save(user);
            return true;
        }return false;
    }

    public boolean checkUserExist(User user) {
        List<User> users = userRepository.findAll();
        for (User u : users) {
            if (user.getUsername().equals(u.getUsername())) {
                return false;
            }
        }
        return true;
    }

    public boolean changePassword(User user, String oldPassword, String newPassword, String autPassword){
        User user_update = userRepository.findById(user.getId()).get();
        if (user_update.getPassword().equals(oldPassword)){
            if (newPassword.equals(autPassword)){
                user_update.setPassword(newPassword);
                userRepository.save(user_update);
                return true;
            }
            return false;
        }
        return false;
    }

}

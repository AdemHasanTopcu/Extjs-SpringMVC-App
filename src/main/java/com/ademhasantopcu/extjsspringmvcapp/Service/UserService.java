package com.ademhasantopcu.extjsspringmvcapp.Service;

import com.ademhasantopcu.extjsspringmvcapp.Model.User;
import com.ademhasantopcu.extjsspringmvcapp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service(value = "userService")
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    public User createUser(User user){
        return userRepository.save(user);
    }
    public ResponseEntity<User> updateUser(User user){
        user.setEmail(user.getEmail());
        user.setFirstName(user.getFirstName());
        user.setLastName(user.getFirstName());
        user.setCreateDate(new Date());
        return ResponseEntity.ok(this.userRepository.save(user));
    }

    public Map<String, Boolean>  deleteUser(User user){
        userRepository.delete(user);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}

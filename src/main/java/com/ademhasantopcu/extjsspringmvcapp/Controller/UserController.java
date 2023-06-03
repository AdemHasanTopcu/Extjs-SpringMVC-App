package com.ademhasantopcu.extjsspringmvcapp.Controller;

import com.ademhasantopcu.extjsspringmvcapp.Model.User;
import com.ademhasantopcu.extjsspringmvcapp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    //tüm kullanıcıları getirme metotu
    @RequestMapping(value = "getAllUser.ajax", method = RequestMethod.GET)
    @ResponseBody
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    //kullanıcıları kaydetme metotu
    @PostMapping("createUser.ajax")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    //kullanıcıları güncelleme metotu
    @PostMapping("updateUser.ajax")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    //kullanıcıları silme metotu
    @PostMapping("deleteUser.ajax")
    public Map<String, Boolean> deleteUser(@RequestBody User user) {
        return userService.deleteUser(user);
    }

}

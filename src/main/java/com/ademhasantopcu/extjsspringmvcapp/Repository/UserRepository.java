package com.ademhasantopcu.extjsspringmvcapp.Repository;


import com.ademhasantopcu.extjsspringmvcapp.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByFirstName(String firstName);


    List<User> findUserByFirstNameAndLastName(String firstName, String lastName);

}
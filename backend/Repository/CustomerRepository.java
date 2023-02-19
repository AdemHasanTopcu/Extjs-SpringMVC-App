package com.ademhasantopcu.backend.Repository;

import com.ademhasantopcu.backend.Model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>, PagingAndSortingRepository<Customer, Long> {
    List<Customer> findByFirstName(String firstName);

//    @Query("SELECT u FROM Customer u WHERE u.firstName = ?1 and u.lastName = ?2")
//    Customer findCustomerByFirstNameAndLastName(String firstName, String lastName);
//
    List<Customer> findCustomerByFirstNameAndLastName(String firstName, String lastName);

    Page<Customer> findByIdIn(List<Integer> id, Pageable pageable);

}

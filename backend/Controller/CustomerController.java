package com.ademhasantopcu.backend.Controller;

import com.ademhasantopcu.backend.Exception.ResourceNotFoundException;
import com.ademhasantopcu.backend.Model.Customer;
import com.ademhasantopcu.backend.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("customer")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    //tüm kullanıcıları getirme metotu
//    @RequestMapping(value = "getAllCustomer.json", method = RequestMethod.GET)
//    @ResponseBody
//    public List<Customer> getAllCustomer() {
//        return customerRepository.findAll();
//    }

    @RequestMapping(value = "getAllCustomer.json", method = RequestMethod.GET)
    @ResponseBody
    public List<Customer> getAllCustomer(
            @RequestParam("page") Integer page,
            @RequestParam("limit") Integer limit
    ) {
        return customerRepository.findAll(PageRequest.of(page - 1 , limit)).getContent();
    }


    //id'ye göre kullanıcıları getirme metotu
    @GetMapping("/customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable(value = "id") Long customerId) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id de kullanıcı bulunamadı: " + customerId));
        return ResponseEntity.ok().body(customer);
    }

    @GetMapping("getCustomersFirstNameAndLastName.json")
    public ResponseEntity<List<Customer>> getCustomersFirstNameAndLastName(@RequestParam String firstName,
                                                                           @RequestParam String lastName) {
        return new ResponseEntity<List<Customer>>(customerRepository.findCustomerByFirstNameAndLastName(firstName, lastName), HttpStatus.OK);
    }

    //firstName göre kullanıcıları getirme metotu
    @GetMapping("/Customer/FirstName")
    public ResponseEntity<List<Customer>> getCustomersByName(@RequestParam String firstName) {
        return new ResponseEntity<List<Customer>>(customerRepository.findByFirstName(firstName), HttpStatus.OK);
    }

    //kullanıcıları kaydetme metotu
    @PostMapping("createCustomer.json")
    public Customer createCustomer(@RequestBody Customer customer) {
        return this.customerRepository.save(customer);
    }

    //kullanıcıları güncelleme metotu
    @PutMapping("update/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable(value = "id") Long customerId, @RequestBody Customer customerDetails) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id de kullanıcı bulunamadı: " + customerId));
        customer.setEmail(customerDetails.getEmail());
        customer.setFirstName(customerDetails.getFirstName());
        customer.setLastName(customerDetails.getFirstName());
        customer.setCreateDate(new Date());

        return ResponseEntity.ok(this.customerRepository.save(customer));
    }

    //kullanıcıları silme metotu
    @DeleteMapping("delete/{id}")
    public Map<String, Boolean> deleteCustomer(@PathVariable(value = "id") Long customerId) throws ResourceNotFoundException {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Bu id de kullanıcı bulunamadı: " + customerId));
        this.customerRepository.delete(customer);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }


}

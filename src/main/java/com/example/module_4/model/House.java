package com.example.module_4.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String description;
    private Double price;
    @ManyToOne
    @JoinColumn(name = "host_id")
    private User host;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "rent_house", joinColumns = {@JoinColumn(name = "house_id")},
            inverseJoinColumns = {@JoinColumn(name = "guest_id")})
    private List<User> guests;
}

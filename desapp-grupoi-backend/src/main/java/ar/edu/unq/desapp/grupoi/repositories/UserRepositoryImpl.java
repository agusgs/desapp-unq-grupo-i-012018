package ar.edu.unq.desapp.grupoi.repositories;

import ar.edu.unq.desapp.grupoi.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl extends CarbnbRepository<User, Long> implements UserRepository {
    @Override
    public void create(User user) {
        this.save(user);
    }
}

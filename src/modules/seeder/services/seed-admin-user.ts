import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { hashSync } from 'bcrypt';
import { User } from '../../user/models/user.model';
import { Role } from '../../../common/enum/auth';

@Seeder({
    model: User,
})
export class SeedUser implements OnSeederInit {
    run() {
        return [
            {
                firstName: 'Admin',
                lastName: 'SuperUser',
                email: 'admin@test.com',
                password: 'qwerty1234',
                country: 'Ukraine',
                city: 'Zaporizhya',
                role: Role.Admin,
                avatar: 'string',
            },
        ];
    }

    everyone(data) {
        if (data.password) {
            const salt = Math.floor(Math.random() * 10) + 1;
            data.password = hashSync(data.password, salt);
            data.salt = salt;
        }

        data.created_at = new Date().toISOString();
        data.updated_at = new Date().toISOString();

        return data;
    }
}

import {
  InferSubjects,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Movie } from 'src/modules/movie/entities/movie.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Action } from 'src/shared/enums/action.enum';

type Subjects = InferSubjects<typeof Movie | typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<MongoAbility<[Action, Subjects]>>(
      createMongoAbility as unknown as AbilityClass<AppAbility>,
    );

    can(Action.Read, 'all'); // read-only access to everything
    can(Action.Create, 'all'); // create access to everything

    can(Action.Update, Movie, { author: user._id });
    can(Action.Delete, Movie, { author: user._id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

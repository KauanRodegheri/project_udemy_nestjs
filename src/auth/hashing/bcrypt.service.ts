import { HashingServices } from './hashing.service';
import * as bcrypt from 'bcryptjs'

export class BcryptService extends HashingServices {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    const compare = await bcrypt.compare(password, passwordHash)
    return compare;
  }
}

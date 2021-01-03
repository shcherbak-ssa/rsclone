export class UsernameService {
  createUsername(email: string) {
    return email.split('@')[0].replace('.', '-');
  }
}

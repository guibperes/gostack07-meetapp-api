import { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } from './env'

export const MailConfig = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  },
  default: {
    from: 'Equipe Meetapp <noreply@meetapp.com>'
  }
}

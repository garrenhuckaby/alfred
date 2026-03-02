import { Email } from '@/types/email'

export const mockEmails: Email[] = [
  {
    id: '1',
    from: 'boss@company.com',
    subject: 'Q3 Report Due Friday',
    body: 'Hey, just a reminder that the Q3 report is due by end of day Friday. Please include the revenue breakdown.',
    date: '2025-01-15',
    read: false,
  },
  {
    id: '2',
    from: 'newsletter@techdigest.com',
    subject: 'This Week in AI',
    body: 'Top stories this week: new model releases, breakthroughs in robotics, and the latest on AI regulation.',
    date: '2025-01-14',
    read: false,
  },
  {
    id: '3',
    from: 'friend@gmail.com',
    subject: 'Lunch Tuesday?',
    body: 'Hey! Are you free for lunch on Tuesday around noon? Let me know!',
    date: '2025-01-13',
    read: false,
  },

  {
    id: '4',
    from: 'test@gmail.com',
    subject: 'Lunch Everyday?',
    body: 'This is a test to see if you would be willing to go to lunch with me every day.',
    date: '2025-01-28',
    read: false,
  },
]
/* PDPA Challenge Hub — Game Content */

const BINGO_ITEMS = [
  { action: 'Lock your screen', scenario: 'You are heading to a 10-minute stand-up and your laptop is open with customer records on screen.' },
  { action: 'Verify the recipient', scenario: 'You are about to email a salary spreadsheet and autocomplete has filled in a name you do not recognise.' },
  { action: 'Report the breach', scenario: 'You spot an unlabelled USB stick marked "HR 2025" lying on the pantry counter.' },
  { action: 'Use a strong, unique password', scenario: 'The system asks you to set a new login, and "Password123" would be so much faster.' },
  { action: 'Shred confidential printouts', scenario: 'You have finished with a stack of printed customer IC numbers sitting on the printer tray.' },
  { action: 'Get approval before sharing', scenario: 'A vendor emails asking for the full employee contact list "just for reference".' },
  { action: 'Collect only what you need', scenario: 'Your new lucky-draw form asks for IC number, home address and blood type.' },
  { action: 'Delete data past retention', scenario: 'A 2016 folder of unsuccessful candidates\u2019 CVs is still sitting on the shared drive.' },
  { action: 'Keep records accurate', scenario: 'A customer tells you the phone number in your system is three years out of date.' },
  { action: 'Honour access requests', scenario: 'An employee formally asks for a copy of the personal data your team holds about them.' },
  { action: 'Encrypt before you send', scenario: 'You need to send a file of payroll details to another office over email.' },
  { action: 'Check who is nearby', scenario: 'You are discussing a colleague\u2019s medical leave on a call in a crowded LRT carriage.' },
  { action: 'Use approved systems only', scenario: 'It would be quicker to drop that client list into your personal cloud drive to finish tonight.' },
  { action: 'Challenge unknown visitors', scenario: 'Someone with no visitor pass is walking into the records room right behind you.' },
  { action: 'Honour opt-out requests', scenario: 'A customer replies "stop sending me promotions" to your marketing blast.' },
  { action: 'Escalate suspicious emails', scenario: 'An email claiming to be from the CEO wants the staff list urgently, and says tell no one.' }
];

const JEOPARDY = [
  { category: 'PDPA Basics', tiles: [
    { value: 50, q: 'What does PDPA stand for in Malaysia?', options: ['Personal Data Protection Act', 'Public Data Privacy Agreement', 'Private Digital Protection Authority', 'Personal Details Processing Act'], why: 'The Personal Data Protection Act 2010 governs how personal data is processed in commercial transactions in Malaysia.' },
    { value: 100, q: 'Which of these is NOT personal data on its own?', options: ['A generic info@ company inbox', 'An IC number', 'A personal mobile number', 'A clear photo of someone\u2019s face'], why: 'A generic company inbox does not identify a specific living individual.' },
    { value: 150, q: 'Under the PDPA, who is the "data subject"?', options: ['The individual the data is about', 'The IT administrator', 'The organisation collecting the data', 'The regulator'], why: 'The data subject is the individual the data relates to.' }
  ]},
  { category: 'The 7 Principles', tiles: [
    { value: 50, q: 'Which principle limits you to collecting only the data you actually need?', options: ['General Principle', 'Access Principle', 'Disclosure Principle', 'Security Principle'], why: 'The General Principle keeps processing lawful, necessary and directly related to the stated purpose.' },
    { value: 100, q: 'Which principle says you must stop keeping data once its purpose is done?', options: ['Retention Principle', 'Notice and Choice Principle', 'Access Principle', 'Data Integrity Principle'], why: 'Do not keep personal data longer than necessary for the purpose it was collected.' },
    { value: 150, q: 'How many principles does Malaysia\u2019s PDPA set out?', options: ['7', '5', '10', '3'], why: 'Seven: General, Notice and Choice, Disclosure, Security, Retention, Data Integrity and Access.' }
  ]},
  { category: 'Data Breach', tiles: [
    { value: 50, q: 'You emailed a customer list to the wrong recipient. What comes first?', options: ['Report to your compliance contact immediately', 'Delete it from your sent folder and move on', 'Wait and see if anyone complains', 'Ask the recipient to promise they deleted it'], why: 'Speed limits the damage. Escalate first so the response can be coordinated.' },
    { value: 100, q: 'Which of these already counts as a data breach?', options: ['A lost unencrypted USB drive holding staff records', 'Typing your password wrongly three times', 'Booking the wrong meeting room', 'An expired printer toner'], why: 'Loss of control over personal data is a breach, even if nobody has misused it yet.' },
    { value: 150, q: 'After the PDPA (Amendment) Act 2024, breach notification to the Commissioner is...', options: ['Mandatory, with guidance pointing to within 72 hours', 'Entirely optional', 'Only needed if a customer sues', 'Handled automatically by your email provider'], why: 'The 2024 amendment introduced mandatory breach notification with guidance to notify within 72 hours.' }
  ]},
  { category: 'At Your Desk', tiles: [
    { value: 50, q: 'You are stepping away from your desk for five minutes. What do you do?', options: ['Lock your screen', 'Leave it, you will be quick', 'Switch off the monitor only', 'Ask a colleague to watch it'], why: 'Win + L or Ctrl + Cmd + Q. Two keys, one less incident.' },
    { value: 100, q: 'Where does a printout of customer IC numbers go when you are done?', options: ['Confidential shredding bin', 'General waste bin', 'The recycling tray by the printer', 'Your drawer, indefinitely'], why: 'Confidential disposal only. General and recycling bins are not secure.' },
    { value: 150, q: 'A colleague asks to borrow your login because theirs is locked out. Best response?', options: ['Decline and point them to the service desk', 'Share it, they are on your team', 'Share it then change your password later', 'Type it in for them yourself'], why: 'Shared credentials destroy accountability.' }
  ]},
  { category: 'Sharing & Consent', tiles: [
    { value: 50, q: 'Before sending personal data to an external party you should...', options: ['Confirm a lawful basis, get approval, and verify the recipient', 'Just send it, they asked politely', 'Send it and seek approval afterwards', 'Post it in a group chat so everyone has a copy'], why: 'Lawful basis, approval, minimum necessary, verified recipient. In that order.' },
    { value: 100, q: 'A vendor asks for the full staff list "for reference". What do you do?', options: ['Ask what it is for, then share only the minimum with approval', 'Send the full list to be helpful', 'Send it labelled confidential without approval', 'Send it and copy the whole department'], why: '"For reference" is not a purpose. Purpose first, then data minimisation.' },
    { value: 150, q: 'An individual withdraws consent for marketing. What must happen?', options: ['Stop marketing to them and record the withdrawal', 'Keep going until the campaign ends', 'Charge a fee to process the request', 'Nothing, consent cannot be withdrawn'], why: 'Consent can be withdrawn at any time. Stop and keep a record that you did.' }
  ]}
];

const CROSSWORD = {
  rows: 9, cols: 12,
  entries: [
    { num: 1, dir: 'across', row: 0, col: 0, answer: 'CONFIDENTIAL', clue: 'Classification for information that unauthorised people must never see.' },
    { num: 7, dir: 'across', row: 4, col: 4, answer: 'GROUNDS', clue: 'Lawful ___ : the legal basis you need before processing personal data.' },
    { num: 1, dir: 'down', row: 0, col: 0, answer: 'CONSENT', clue: 'Permission an individual gives before their data is used.' },
    { num: 2, dir: 'down', row: 0, col: 2, answer: 'NOTICE', clue: 'Privacy ___ : tells people how their data will be used.' },
    { num: 3, dir: 'down', row: 0, col: 4, answer: 'INTEGRITY', clue: 'Data ___ : must be accurate, complete and not misleading.' },
    { num: 4, dir: 'down', row: 0, col: 6, answer: 'EMPLOYEE', clue: 'Every ___ is responsible for protecting personal data at work.' },
    { num: 5, dir: 'down', row: 0, col: 8, answer: 'TRAINING', clue: 'Awareness ___ : exactly what this booth is doing right now.' },
    { num: 6, dir: 'down', row: 0, col: 10, answer: 'ACCESS', clue: 'The right to request a copy of your personal data.' }
  ]
};

const RISK_CARDS = [
  { text: 'Sharing your system password with a teammate who is waiting on access.', risk: true, why: 'Credentials are personal. Send access requests to the service desk.' },
  { text: 'Locking your laptop before walking to the printer.', risk: false, why: 'Small habit, big protection. An unlocked screen is an open filing cabinet.' },
  { text: 'Leaving a printed customer list face-up on your desk overnight.', risk: true, why: 'Clear desk policy. Lock personal data away or dispose of it securely.' },
  { text: 'Asking a vendor what they need the data for before sharing anything.', risk: false, why: 'Purpose first. No clear purpose = no lawful basis to share.' },
  { text: 'Forwarding a complaint containing a full IC number to your personal email.', risk: true, why: 'Personal accounts sit outside company controls. Use approved systems only.' },
  { text: 'Shredding draft documents that contain staff names and addresses.', risk: false, why: 'Secure disposal is part of the Security Principle.' },
  { text: 'Keeping applicant IC numbers on an unencrypted personal USB drive.', risk: true, why: 'Unencrypted removable media is one of the most common breach causes.' },
  { text: 'Reporting a suspected breach the same hour you notice it.', risk: false, why: 'A false alarm costs a conversation. A late report costs a lot more.' },
  { text: 'Keeping CVs of candidates rejected in 2017 "just in case".', risk: true, why: 'That fails the Retention Principle. Once the purpose is done, the data goes.' },
  { text: 'Emailing 200 customers with everyone in the CC field.', risk: true, why: 'CC discloses every address to the whole list. Use BCC.' },
  { text: 'Using BCC when emailing an external group so addresses stay private.', risk: false, why: 'One field, one avoided disclosure incident.' },
  { text: 'Discussing a colleague\u2019s disciplinary case in the open-plan pantry.', risk: true, why: 'Verbal disclosure counts. Take sensitive conversations somewhere private.' },
  { text: 'Double-checking the recipient address before sending personal data.', risk: false, why: 'Autocomplete is the quiet villain of data breaches. Checking beats correcting.' },
  { text: 'Pasting a client contact list into a free online tool to tidy it up.', risk: true, why: 'Unapproved disclosure to a third party. You cannot get the data back.' },
  { text: 'Updating a customer record the moment they tell you their details changed.', risk: false, why: 'Data Integrity Principle: accurate, complete, up to date.' },
  { text: 'Holding the door so an unbadged stranger follows you into the records room.', risk: true, why: 'Physical access is data access. Ask them to sign in at reception.' }
];

const MAX_SCORE = { bingo: 600, jeopardy: 1500, crossword: 700, risk: 500 };
const MAX_TOTAL = MAX_SCORE.bingo + MAX_SCORE.jeopardy + MAX_SCORE.crossword + MAX_SCORE.risk;
const TIERS = [
  { min: 0.8, medal: '\u{1F947}', name: 'PDPA Champion' },
  { min: 0.6, medal: '\u{1F948}', name: 'PDPA Advocate' },
  { min: 0, medal: '\u{1F949}', name: 'PDPA Learner' }
];
const STORAGE_KEY = 'pdpa-hub-leaderboard-v1';

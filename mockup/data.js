/* PDPA Challenge Hub — Game Content */

const BINGO_ITEMS = [
  { action: 'Find someone who locks their computer screen every time they leave their desk, even if it is just for a quick coffee run.' },
  { action: 'Find someone who always double-checks the email recipient before hitting send, especially when the attachment contains personal data.' },
  { action: 'Find someone who has reported a suspicious email or potential data breach to the compliance team before.' },
  { action: 'Find someone who uses a different strong password for each work system and never writes them on sticky notes.' },
  { action: 'Find someone who shreds confidential documents instead of tossing them in the general waste bin.' },
  { action: 'Find someone who asks "why do we need this data?" before adding extra fields to a form or survey.' },
  { action: 'Find someone who has reminded a colleague to lock their unattended laptop in the office.' },
  { action: 'Find someone who uses BCC instead of CC when emailing a large group of external contacts.' },
  { action: 'Find someone who checks that shared folders only give access to people who actually need the files.' },
  { action: 'Find someone who has declined to share personal data with a vendor until they confirmed the purpose and got approval.' },
  { action: 'Find someone who encrypts files before sending them externally, even when the recipient says "just email it over".' },
  { action: 'Find someone who avoids discussing confidential matters in open spaces like the pantry, lift, or LRT.' },
  { action: 'Find someone who has cleaned up old files or folders that were past their retention period.' },
  { action: 'Find someone who politely challenges unknown visitors who try to tailgate into restricted areas.' },
  { action: 'Find someone who updates customer or staff records as soon as they are told the details have changed.' },
  { action: 'Find someone who only uses company-approved tools and systems to store or process personal data, never personal cloud drives.' }
];

const JEOPARDY = [
  { category: 'PDPA Basics', tiles: [
    { value: 100, q: 'What does PDPA stand for in Malaysia?', options: ['Personal Data Protection Act', 'Public Data Privacy Agreement', 'Private Digital Protection Authority', 'Personal Details Processing Act'], why: 'The Personal Data Protection Act 2010 governs how personal data is processed in commercial transactions in Malaysia.' },
    { value: 100, q: 'Under the PDPA, who is the "data subject"?', options: ['The individual the data is about', 'The IT administrator', 'The organisation collecting the data', 'The regulator'], why: 'The data subject is the individual the data relates to. The organisation deciding how it is processed is the data user.' }
  ]},
  { category: 'The 7 Principles', tiles: [
    { value: 100, q: 'Which principle limits you to collecting only the data you actually need?', options: ['General Principle', 'Access Principle', 'Disclosure Principle', 'Security Principle'], why: 'The General Principle keeps processing lawful, necessary and directly related to the stated purpose.' },
    { value: 100, q: 'Which principle says you must stop keeping data once its purpose is done?', options: ['Retention Principle', 'Notice and Choice Principle', 'Access Principle', 'Data Integrity Principle'], why: 'Do not keep personal data longer than necessary for the purpose it was collected.' }
  ]},
  { category: 'Data Breach', tiles: [
    { value: 100, q: 'You emailed a customer list to the wrong recipient. What comes first?', options: ['Report to your compliance contact immediately', 'Delete it from your sent folder and move on', 'Wait and see if anyone complains', 'Ask the recipient to promise they deleted it'], why: 'Speed limits the damage. Escalate first so the response can be coordinated.' },
    { value: 100, q: 'After the PDPA (Amendment) Act 2024, breach notification to the Commissioner is...', options: ['Mandatory, with guidance pointing to within 72 hours', 'Entirely optional', 'Only needed if a customer sues', 'Handled automatically by your email provider'], why: 'The 2024 amendment introduced mandatory breach notification with guidance to notify within 72 hours.' }
  ]},
  { category: 'At Your Desk', tiles: [
    { value: 100, q: 'You are stepping away from your desk for five minutes. What do you do?', options: ['Lock your screen', 'Leave it, you will be quick', 'Switch off the monitor only', 'Ask a colleague to watch it'], why: 'Win + L or Ctrl + Cmd + Q. Two keys, one less incident.' },
    { value: 100, q: 'A colleague asks to borrow your login because theirs is locked out. Best response?', options: ['Decline and point them to the service desk', 'Share it, they are on your team', 'Share it then change your password later', 'Type it in for them yourself'], why: 'Shared credentials destroy accountability.' }
  ]},
  { category: 'Sharing & Consent', tiles: [
    { value: 100, q: 'Before sending personal data to an external party you should...', options: ['Confirm a lawful basis, get approval, and verify the recipient', 'Just send it, they asked politely', 'Send it and seek approval afterwards', 'Post it in a group chat so everyone has a copy'], why: 'Lawful basis, approval, minimum necessary, verified recipient. In that order.' },
    { value: 100, q: 'An individual withdraws consent for marketing. What must happen?', options: ['Stop marketing to them and record the withdrawal', 'Keep going until the campaign ends', 'Charge a fee to process the request', 'Nothing, consent cannot be withdrawn'], why: 'Consent can be withdrawn at any time. Stop and keep a record that you did.' }
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
  { text: 'Your colleague is on leave so you log in with their credentials to finish an urgent task they started.', risk: true, why: 'Shared credentials destroy accountability. Any action is logged under their name, not yours. Request your own access.' },
  { text: 'Before leaving for lunch, you press Win+L to lock your screen even though you will only be 10 minutes.', risk: false, why: 'Small habit, big protection. An unlocked screen is an open invitation for anyone passing by.' },
  { text: 'You print out a customer complaint that includes their IC number and leave it on your desk while you attend a meeting.', risk: true, why: 'Printed personal data left unattended can be seen or taken by anyone. Secure it in a drawer or shred when done.' },
  { text: 'A vendor emails asking for your full staff directory. You ask them to clarify the purpose and get your manager to approve before sharing only the relevant names.', risk: false, why: 'Purpose first, then minimisation. "For reference" is not a valid purpose.' },
  { text: 'You forward a customer complaint email containing their full IC number and address to your personal Gmail so you can work on it from home tonight.', risk: true, why: 'Personal email is outside company security controls. Use only approved systems for personal data.' },
  { text: 'After finishing with a stack of printed interview scorecards that contain candidate details, you put them in the confidential shredding bin.', risk: false, why: 'Secure disposal prevents personal data from ending up in the wrong hands.' },
  { text: 'You save applicant resumes and IC copies onto an unencrypted USB drive to bring to another office for a hiring discussion.', risk: true, why: 'Unencrypted USB drives are easily lost. Use encrypted transfers or approved cloud storage instead.' },
  { text: 'You notice an unfamiliar person browsing through files in the records room with no visitor badge. You approach them politely and ask if they have signed in.', risk: false, why: 'Physical access to records is data access. Challenging is the right call.' },
  { text: 'A folder of 2017 unsuccessful job applicants with full personal details is still on the shared drive. Nobody has reviewed or deleted it.', risk: true, why: 'Retention Principle: once the purpose (recruitment) is complete, personal data must be disposed of.' },
  { text: 'You are about to send an announcement to 150 external stakeholders, so you put all their emails in BCC to keep addresses private.', risk: false, why: 'BCC prevents mass disclosure of personal email addresses. CC would expose everyone to each other.' }
];

const MAX_SCORE = { bingo: 600, jeopardy: 1000, crossword: 700, risk: 300 };
const MAX_TOTAL = MAX_SCORE.bingo + MAX_SCORE.jeopardy + MAX_SCORE.crossword + MAX_SCORE.risk;
const TIERS = [
  { min: 0.8, medal: '\u{1F947}', name: 'PDPA Champion' },
  { min: 0.6, medal: '\u{1F948}', name: 'PDPA Advocate' },
  { min: 0, medal: '\u{1F949}', name: 'PDPA Learner' }
];
const STORAGE_KEY = 'pdpa-hub-leaderboard-v1';

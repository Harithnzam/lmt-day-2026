/* PDPA + Responsible AI Challenge Hub — Game Content
   Sourced from booth posters: "Responsible AI, Responsible Decisions"
   and "Think Before You Click, Share or Store" */

/* BINGO — Networking style. Find someone who... */
const BINGO_ITEMS = [
  { action: 'Uses the PAUSE framework before prompting an AI tool — checks for Personal data, Approved tool, Understand purpose, Share minimally, Evaluate output.' },
  { action: 'Can name at least 3 AI Ethics Principles from the poster (e.g. Transparency, Accountability, Fairness, Inclusiveness, Privacy & Security).' },
  { action: 'Always uses enterprise AI tools instead of public ones like personal ChatGPT or personal Gemini for work tasks.' },
  { action: 'Locks their computer screen every single time they leave their desk, even for a quick coffee run.' },
  { action: 'Knows what SORRY stands for — Small actions, Stronger Protections (Store, Organise, Restrict, Retain, Your responsibility).' },
  { action: 'Has reported a suspicious email or potential data breach using the See It, Note It, Report It process.' },
  { action: 'Double-checks the email recipient and attachment before hitting send, especially when it contains personal data.' },
  { action: 'Knows that AI must be tested, safe, and controllable — the Reliability, Safety & Control principle.' },
  { action: 'Uses classification tags like Confidential or Secret when labelling sensitive documents.' },
  { action: 'Understands that humans remain responsible and accountable for AI outcomes, not the AI system itself.' },
  { action: 'Reviews shared folder access regularly to ensure only the right people can see sensitive files.' },
  { action: 'Knows that sensitive personal data includes biometrics, health conditions, religious beliefs and criminal records.' },
  { action: 'Uses BCC instead of CC when emailing a large group of external contacts to protect their privacy.' },
  { action: 'Can explain the Stop, Think, Protect steps — Verify, Inform, Validate, Protect, Dispose.' },
  { action: 'Knows that data breaches in Malaysia surged from 50 cases in 2022 to 644 cases in 2023.' },
  { action: 'Checks AI-generated content for hallucinations, bias, and accuracy before using it in any decision.' }
];

/* JEOPARDY — 10 MCQ questions mixing PDPA + AI */
const JEOPARDY = [
  { category: 'Responsible AI', tiles: [
    { value: 100, q: 'What does Responsible AI anchor on?', options: ['Trustworthiness', 'Innovation', 'Efficiency', 'Automation'], why: 'Responsible AI is about AI that is dependable, reliable, explainable, and safe — anchored on trustworthiness.' },
    { value: 100, q: 'Which is NOT an AI Ethics Principle from the poster?', options: ['Profitability', 'Transparency', 'Fairness', 'Inclusiveness'], why: 'The principles are Transparency, Accountability, Fairness, Inclusiveness, Privacy & Security, Reliability, and Pursuit of Human Benefit. Profitability is not one.' }
  ]},
  { category: 'AI Best Practices', tiles: [
    { value: 100, q: 'What does the "P" in PAUSE stand for?', options: ['Personal or sensitive data?', 'Public access only', 'Prompt carefully', 'Protect the model'], why: 'Before you prompt, PAUSE: P = Is this Personal or sensitive data? (Health, biometric, HR, medical or IDs)' },
    { value: 100, q: 'Who remains accountable for AI decisions and outcomes?', options: ['Humans', 'The AI system', 'The AI vendor', 'The data team'], why: 'The Accountability principle: humans remain responsible for AI outcomes. AI does not bear accountability.' }
  ]},
  { category: 'Data Protection', tiles: [
    { value: 100, q: 'Which of these is sensitive personal data under PDPA?', options: ['Biometrics', 'Email address', 'Company name', 'Job title'], why: 'Sensitive personal data includes political opinions, religious beliefs, criminal records, health conditions, and biometric data.' },
    { value: 100, q: 'What are the 3 steps in "See It. Note It. Report It."?', options: ['Spot, Record, Report', 'Find, Fix, Forget', 'Check, Copy, Close', 'Look, Log, Leave'], why: 'Spot unusual activity or data loss, Record what happened and who may be affected, Report to Data Protection Officer or Cyber Security immediately.' }
  ]},
  { category: 'PDPA Principles', tiles: [
    { value: 100, q: 'The Retention Principle says you should...', options: ['Delete data when its purpose is complete', 'Keep data forever for reference', 'Store data on USB drives', 'Share data with all departments'], why: 'Keep data only as long as needed. e.g. remove rejected CVs after hiring is completed.' },
    { value: 100, q: 'Non-compliance with PDPA can result in fines of up to...', options: ['RM1 million and/or 3 years imprisonment', 'RM10,000 warning', 'RM500 fine only', 'No penalty exists'], why: 'Non-compliance with PDPA can result in fines of up to RM1 million and/or imprisonment of up to 3 years.' }
  ]},
  { category: 'AI Risks & Data', tiles: [
    { value: 100, q: 'What is the biggest data privacy risk when using public GenAI tools?', options: ['Putting confidential data into prompts', 'Slow response time', 'Poor grammar in output', 'High internet usage'], why: 'Personal data, financial data, strategy documents, and source code can leak without notice through public AI services.' },
    { value: 100, q: 'Which are known risks of AI becoming visible after Nov 2022?', options: ['Hallucinations, fake citations, bias, deepfakes', 'Faster internet speeds', 'Lower electricity costs', 'Better phone cameras'], why: 'When AI became general-purpose, risks like hallucinations, misinformation, plagiarism, bias, deepfakes and privacy concerns became visible to everyone.' }
  ]}
];

/* CROSSWORD — 8 terms from both posters */
const CROSSWORD = {
  rows: 9, cols: 12,
  entries: [
    { num: 1, dir: 'across', row: 0, col: 0, answer: 'CONFIDENTIAL', clue: 'Classification tag for documents that unauthorised people must never see.' },
    { num: 7, dir: 'across', row: 4, col: 4, answer: 'GROUNDS', clue: 'Lawful ___ : the legal basis you need before processing personal data.' },
    { num: 1, dir: 'down', row: 0, col: 0, answer: 'CONSENT', clue: 'The PDPA principle: process only with ___ or where the law allows it.' },
    { num: 2, dir: 'down', row: 0, col: 2, answer: 'NOTICE', clue: 'Tell people what you collect and why — put this on your first page.' },
    { num: 3, dir: 'down', row: 0, col: 4, answer: 'INTEGRITY', clue: 'Data ___ Principle: keep data accurate, complete and up to date.' },
    { num: 4, dir: 'down', row: 0, col: 6, answer: 'EMPLOYEE', clue: 'Every ___ is responsible for protecting personal data at work.' },
    { num: 5, dir: 'down', row: 0, col: 8, answer: 'TRAINING', clue: 'AI processes your input but never ___ on it (Training Off best practice).' },
    { num: 6, dir: 'down', row: 0, col: 10, answer: 'ACCESS', clue: 'PDPA principle: let people view and correct their own data, e.g. a copy of their HR record.' }
  ]
};

/* SPOT THE RISK — 10 situations mixing PDPA + AI */
const RISK_CARDS = [
  { text: 'You paste a confidential strategy document into personal ChatGPT to summarise it quickly for a presentation.', risk: true, why: 'Public AI services can leak your data. Use only approved enterprise AI tools. The poster warns: Personal Data, Financial Data, Strategy Documents and Source Code can leak without notice.' },
  { text: 'Before prompting the company AI tool, you check: Is there personal data? Am I using an approved tool? Do I understand the purpose? Am I sharing only what is needed?', risk: false, why: 'This is the PAUSE framework in action — the responsible way to use AI at work.' },
  { text: 'You print out a customer complaint that includes their IC number and leave it on your desk while you attend a 2-hour meeting.', risk: true, why: 'Printed personal data left unattended can be seen or taken by anyone. Secure it or shred it.' },
  { text: 'An AI tool generates a market analysis report. Before sharing it with leadership, you verify the data sources, check for hallucinations, and confirm accuracy.', risk: false, why: 'The "E" in PAUSE: Evaluate the output. Check AI-generated content for accuracy, bias, and completeness.' },
  { text: 'You forward a colleague HR performance review email to your personal Gmail so you can read it on the train home.', risk: true, why: 'Personal email is outside company security controls. Personal data must stay in approved systems only.' },
  { text: 'You use the enterprise AI platform with incognito chat mode enabled, ensuring no history and no data retention.', risk: false, why: 'Best practice: AI Sees Nothing — incognito chat, no history, no retention. This protects company data.' },
  { text: 'A vendor sends you an AI-powered analytics tool and asks you to upload your full employee database for a "quick demo".', risk: true, why: 'Never share personal data with unapproved third parties. Validate the recipient, confirm purpose, get approval first.' },
  { text: 'You notice your team shared drive still has CVs from a 2019 recruitment round. You flag it for deletion following the retention schedule.', risk: false, why: 'Retention Principle: keep data only as long as needed. Once recruitment is complete, dispose of it securely.' },
  { text: 'You let an AI tool make the final hiring decision without any human review because it is faster and "unbiased".', risk: true, why: 'Humans remain accountable for AI decisions. AI should assist, not replace human judgment — especially for decisions affecting people.' },
  { text: 'After spotting unusual data access logs, you document what happened, when it occurred, and who may be affected, then report it immediately.', risk: false, why: 'See It. Note It. Report It. Spot the issue, record the details, notify Data Protection Officer or Cyber Security immediately.' }
];

/* Scoring: 4 games */
const MAX_SCORE = { bingo: 600, jeopardy: 1000, crossword: 700, risk: 300 };
const MAX_TOTAL = MAX_SCORE.bingo + MAX_SCORE.jeopardy + MAX_SCORE.crossword + MAX_SCORE.risk;
const TIERS = [
  { min: 0.8, medal: '\u{1F947}', name: 'Digital Trust Guardian', title: 'Digital Trust Guardian', subtitle: 'You lead with integrity. Data and AI are safe with you.' },
  { min: 0.6, medal: '\u{1F948}', name: 'AI-Ready Data Warrior', title: 'AI-Ready Data Warrior', subtitle: 'Sharp instincts. You handle data and AI like a pro.' },
  { min: 0.4, medal: '\u{1F949}', name: 'Smart Data Protector', title: 'Smart Data Protector', subtitle: 'You know the basics. Keep levelling up!' },
  { min: 0, medal: '\u{1F4AA}', name: 'AI Data Apprentice', title: 'AI Data Apprentice', subtitle: 'Every expert starts here. Come back stronger!' }
];
const STORAGE_KEY = 'pdpa-hub-v3';
